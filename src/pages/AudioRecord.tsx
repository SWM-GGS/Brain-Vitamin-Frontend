import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { useState, useCallback } from 'react';
import { generateUniqueNumber } from '../modules/generateUniqueNumber';

const AudioRecord = () => {
  const [stream, setStream] = useState<MediaStream>();
  const [media, setMedia] = useState<MediaRecorder>();
  const [source, setSource] = useState<MediaStreamAudioSourceNode>();
  const [analyser, setAnalyser] = useState<ScriptProcessorNode>();
  const [audioUrl, setAudioUrl] = useState<Blob>();

  const onRecAudio = () => {
    // 음원정보를 담은 노드를 생성하거나 음원을 실행또는 디코딩 시키는 일을 한다
    const audioCtx = new window.AudioContext();
    // 자바스크립트를 통해 음원의 진행상태에 직접접근에 사용된다.
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);

    function makeSound(stream: MediaStream) {
      // 내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보를 보여준다.
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }
    // 마이크 사용 권한 획득
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);
    });
  };

  // 사용자가 음성 녹음을 중지했을 때
  const offRecAudio = () => {
    if (!media || !stream || !analyser || !source) return;

    // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
    media.ondataavailable = function (e) {
      setAudioUrl(e.data);
    };

    // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
    stream.getAudioTracks().forEach(function (track) {
      track.stop();
    });

    // 미디어 캡처 중지
    media.stop();
    // 메서드가 호출 된 노드 연결 해제
    analyser.disconnect();
    source.disconnect();
  };

  const onSubmitAudioFile = useCallback(async () => {
    if (!audioUrl) return;
    console.log(URL.createObjectURL(audioUrl)); // 출력된 링크에서 녹음된 오디오 확인 가능

    // File 생성자를 사용해 파일로 변환
    const sound = new File([audioUrl], 'soundBlob', {
      lastModified: new Date().getTime(),
      type: 'audio',
    });
    console.log(sound); // File 정보 출력

    // 음성 파일을 s3에 업로드
    let uploadUrl = '';
    const region = 'ap-northeast-2';
    const bucket = 'brain-vitamin-user-files';
    const s3Client = new S3Client({
      region, // AWS 리전을 설정하세요
      credentials: {
        accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
      },
    });
    const path = `screeningTestAudios/${generateUniqueNumber()}-${
      sound.lastModified
    }`;
    const uploadParams = {
      Bucket: bucket,
      Key: path,
      Body: sound,
      ContentType: 'audio/mpeg',
    };
    try {
      const command = new PutObjectCommand(uploadParams);
      await s3Client.send(command);
      uploadUrl = `https://${bucket}.s3.${region}.amazonaws.com/${path}`;
    } catch (error) {
      console.error(error);
    }
    console.log('uploadUrl', uploadUrl);
  }, [audioUrl]);

  return (
    <>
      <button onClick={onRecAudio}>녹음</button>
      <button onClick={offRecAudio}>중지</button>
      <button onClick={onSubmitAudioFile}>저장</button>
    </>
  );
};

export default AudioRecord;
