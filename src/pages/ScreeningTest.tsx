import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import Button from '../components/common/Button';
import { styled } from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import { useNavigate } from 'react-router';
import { Container } from '../components/common/Container';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { generateUniqueNumber } from '../modules/generateUniqueNumber';

function ScreeningTest() {
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  type Props = {
    step: number;
    audioUrl: string;
    description: string;
    screeningTestId: number;
    trial?: number;
    imgUrl?: string;
    timeLimit?: number;
    mikeOn?: boolean;
    hide?: boolean;
  };
  const [questions, setQuestions] = useState<Props[]>([]);
  const [totalScore, setTotalScore] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioFileUrlRef = useRef('');
  const trialCountRef = useRef(10);
  const stepCnt = 13;
  const navigate = useNavigate();

  useEffect(() => {
    // const getData = async () => {
    //   try {
    //     const { data } = await axios.get(
    //       `${import.meta.env.VITE_API_URL}/patient/vitamins/screening-test`,
    //       {
    //         headers: {
    //           authorization: `Bearer ${accessToken}`,
    //         },
    //       },
    //     );
    //     setQuestions(data.result);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    // getData();
    const questionArr = [
      {
        step: 0,
        audioUrl:
          'https://brain-vitamin-bucket.s3.ap-northeast-2.amazonaws.com/screening-test/audio/step0.mp3',
        description:
          '안녕하세요. 지금부터 귀하의 기억력과 사고능력을 살펴보기 위한 질문들을 드리겠습니다.\n생각나는 대로 최선을 다해 답변해 주시면 됩니다.',
        screeningTestId: 29,
      },
      {
        step: 1,
        mikeOn: true,
        audioUrl:
          'https://brain-vitamin-bucket.s3.ap-northeast-2.amazonaws.com/screening-test/audio/step1-1.mp3',
        description: '올해는 몇 년도입니까?',
        screeningTestId: 31,
      },
      {
        step: 1,
        mikeOn: true,
        audioUrl:
          'https://brain-vitamin-bucket.s3.ap-northeast-2.amazonaws.com/screening-test/audio/step1-2.mp3',
        description: '지금은 몇 월입니까?',
        screeningTestId: 32,
      },
      {
        step: 1,
        mikeOn: true,
        audioUrl:
          'https://brain-vitamin-bucket.s3.ap-northeast-2.amazonaws.com/screening-test/audio/step1-3.mp3',
        description: '오늘은 며칠입니까?',
        screeningTestId: 33,
      },
      {
        step: 1,
        mikeOn: true,
        audioUrl:
          'https://brain-vitamin-bucket.s3.ap-northeast-2.amazonaws.com/screening-test/audio/step1-4.mp3',
        description: '오늘은 무슨 요일입니까?',
        screeningTestId: 34,
      },
      {
        step: 2,
        mikeOn: true,
        audioUrl:
          'https://brain-vitamin-bucket.s3.ap-northeast-2.amazonaws.com/screening-test/audio/step2.mp3',
        description: '현재 귀하께서 살고 계시는 나라는 어디인가요?',
        screeningTestId: 35,
      },
      {
        step: 3,
        audioUrl:
          'https://brain-vitamin-bucket.s3.ap-northeast-2.amazonaws.com/screening-test/audio/step3.mp3',
        description:
          '지금부터 외우셔야 하는 문장 하나를 불러드리겠습니다.\n끝까지 잘 듣고 따라 해 보세요.',
        screeningTestId: 36,
      },
      {
        step: 3,
        trial: 1,
        mikeOn: true,
        hide: true,
        audioUrl:
          'https://brain-vitamin-bucket.s3.ap-northeast-2.amazonaws.com/screening-test/audio/step3.mp3',
        description: '민수는 자전거를 타고 공원에 가서 11시부터 야구를 했다.',
        screeningTestId: 36,
      },
      {
        step: 3,
        audioUrl:
          'https://brain-vitamin-bucket.s3.ap-northeast-2.amazonaws.com/screening-test/audio/step3.mp3',
        description:
          '잘 하셨습니다. 제가 다시 한번 불러드리겠습니다.\n이번에도 다시 여쭈어 볼테니 잘 듣고 따라 해 보세요.',
        screeningTestId: 36,
      },
      {
        step: 3,
        trial: 1,
        mikeOn: true,
        hide: true,
        audioUrl:
          'https://brain-vitamin-bucket.s3.ap-northeast-2.amazonaws.com/screening-test/audio/step3.mp3',
        description: '민수는 자전거를 타고 공원에 가서 11시부터 야구를 했다.',
        screeningTestId: 36,
      },
      {
        step: 3,
        audioUrl:
          'https://brain-vitamin-bucket.s3.ap-northeast-2.amazonaws.com/screening-test/audio/step3.mp3',
        description: '제가 이 문장을 나중에 여쭤보겠습니다. 잘 기억하세요.',
        screeningTestId: 36,
      },
      {
        step: 4,
        audioUrl:
          'https://brain-vitamin-bucket.s3.ap-northeast-2.amazonaws.com/screening-test/audio/step4.mp3',
        description:
          '제가 불러드리는 숫자를 그대로 따라 해 주세요.\n예를 들어 제가 1 2 3 하고 부르면, 똑같이 1 2 3 이렇게 말씀해 주세요.\n한 번만 불러드릴 수 있으니 잘 들어 주세요.',
        screeningTestId: 37,
      },
      {
        step: 4,
        trial: 1,
        mikeOn: true,
        hide: true,
        audioUrl:
          'https://brain-vitamin-bucket.s3.ap-northeast-2.amazonaws.com/screening-test/audio/step4-1.mp3',
        description: '6 9 7 3',
        screeningTestId: 38,
      },
      {
        step: 4,
        trial: 1,
        mikeOn: true,
        hide: true,
        audioUrl:
          'https://brain-vitamin-bucket.s3.ap-northeast-2.amazonaws.com/screening-test/audio/step4-2.mp3',
        description: '5 7 2 8 4',
        screeningTestId: 39,
      },
      {
        step: 5,
        audioUrl:
          'https://brain-vitamin-bucket.s3.ap-northeast-2.amazonaws.com/screening-test/audio/step5.mp3',
        description: '제가 불러드리는 말을 끝에서부터 거꾸로 따라 해 주세요.',
        screeningTestId: 40,
      },
      {
        step: 5,
        trial: 2,
        mikeOn: true,
        hide: true,
        audioUrl:
          'https://brain-vitamin-bucket.s3.ap-northeast-2.amazonaws.com/screening-test/audio/step5-1.mp3',
        description: '금수강산',
        screeningTestId: 41,
      },
      {
        step: 6,
        imgUrl:
          'https://brain-vitamin-bucket.s3.ap-northeast-2.amazonaws.com/screening-test/image/image6.png',
        audioUrl:
          'https://brain-vitamin-bucket.s3.ap-northeast-2.amazonaws.com/screening-test/audio/step6.mp3',
        description:
          '여기 점을 연결하여 그린 그림이 있습니다. 이 그림과 똑같이 되도록 같은 위치에 그려보세요. 점을 연결해서 그리시면 됩니다.',
        screeningTestId: 42,
      },
      {
        step: 7,
        imgUrl:
          'https://brain-vitamin-bucket.s3.ap-northeast-2.amazonaws.com/screening-test/image/image7.png',
        audioUrl:
          'https://brain-vitamin-bucket.s3.ap-northeast-2.amazonaws.com/screening-test/audio/step7.mp3',
        description:
          '그림을 보시면 세 가지의 모양들이 정해진 순서로 나옵니다. 모양들을 보면서 어떤 순서로 나오는지 생각해 보세요. 왼쪽부터 차례대로 네모, 동그라미, 세모, 네모, 빈칸 세모입니다. 그렇다면 빈칸에는 무엇이 들어가야 할까요?',
        screeningTestId: 43,
      },
      {
        step: 8,
        imgUrl:
          'https://brain-vitamin-bucket.s3.ap-northeast-2.amazonaws.com/screening-test/image/image8.png',
        audioUrl:
          'https://brain-vitamin-bucket.s3.ap-northeast-2.amazonaws.com/screening-test/audio/step8.mp3',
        description:
          '여기 네 칸 중의 한 칸에 별이 하나 있습니다. 첫 번째 그림과 두 번째 그림을 비교하였을 때, 별이 위쪽으로 이동합니다. 별이 어떤 식으로 이동하는지 잘 생각해 보십시오. 마지막 그림에서 네 칸 중에 별이 어디에 위치하게 될까요?',
        screeningTestId: 49,
      },
      {
        step: 9,
        imgUrl:
          'https://brain-vitamin-bucket.s3.ap-northeast-2.amazonaws.com/screening-test/image/image9.png',
        audioUrl:
          'https://brain-vitamin-bucket.s3.ap-northeast-2.amazonaws.com/screening-test/audio/step9.mp3',
        description:
          "카드에 숫자와 계절이 하나씩 적혀 있습니다. '1-봄-2-여름~' 이렇게 연결 되어 나갑니다. 화살표가 가리키는 빈칸에 무엇이 들어갈까요?",
        screeningTestId: 50,
      },
      {
        step: 10,
        mikeOn: true,
        audioUrl:
          'https://brain-vitamin-bucket.s3.ap-northeast-2.amazonaws.com/screening-test/audio/step10.mp3',
        description:
          '제가 조금 전에 외우라고 불러드렸던 문장을 다시 한번 말씀해 주세요.',
        screeningTestId: 51,
      },
      {
        step: 11,
        audioUrl:
          'https://brain-vitamin-bucket.s3.ap-northeast-2.amazonaws.com/screening-test/audio/step11.mp3',
        description: '제시되는 그림의 이름을 말씀해 주세요.',
        screeningTestId: 52,
      },
      {
        step: 11,
        mikeOn: true,
        imgUrl:
          'https://brain-vitamin-bucket.s3.ap-northeast-2.amazonaws.com/screening-test/image/image11-1.png',
        audioUrl:
          'https://brain-vitamin-bucket.s3.ap-northeast-2.amazonaws.com/screening-test/audio/step11-1.mp3',
        description: '이것은 무엇입니까?',
        screeningTestId: 53,
      },
      {
        step: 11,
        mikeOn: true,
        imgUrl:
          'https://brain-vitamin-bucket.s3.ap-northeast-2.amazonaws.com/screening-test/image/image11-2.png',
        audioUrl:
          'https://brain-vitamin-bucket.s3.ap-northeast-2.amazonaws.com/screening-test/audio/step11-1.mp3',
        description: '이것은 무엇입니까?',
        screeningTestId: 54,
      },
      {
        step: 11,
        mikeOn: true,
        imgUrl:
          'https://brain-vitamin-bucket.s3.ap-northeast-2.amazonaws.com/screening-test/image/image11-3.png',
        audioUrl:
          'https://brain-vitamin-bucket.s3.ap-northeast-2.amazonaws.com/screening-test/audio/step11-1.mp3',
        description: '이것은 무엇입니까?',
        screeningTestId: 55,
      },
      {
        step: 12,
        audioUrl:
          'https://brain-vitamin-bucket.s3.ap-northeast-2.amazonaws.com/screening-test/audio/step12.mp3',
        description: '제가 말씀드리는 대로 행동으로 따라해주세요.',
        screeningTestId: 56,
      },
      {
        step: 12,
        trial: 2,
        mikeOn: true,
        audioUrl:
          'https://brain-vitamin-bucket.s3.ap-northeast-2.amazonaws.com/screening-test/audio/step12.mp3',
        description:
          '박수를 두 번 치고, 잠시 쉬었다가 다시 박수 한 번 쳐주세요.',
        screeningTestId: 56,
      },
      {
        step: 13,
        mikeOn: true,
        timeLimit: 60,
        audioUrl:
          'https://brain-vitamin-bucket.s3.ap-northeast-2.amazonaws.com/screening-test/audio/step13.mp3',
        description:
          '지금부터 1분 동안 과일이나 채소를 최대한 많이 이야기 해 주세요. 준비되셨지요? 자, 과일이나 채소 이름을 말씀해 주세요. 시작!',
        screeningTestId: 57,
      },
      {
        step: 14,
        audioUrl:
          'https://brain-vitamin-bucket.s3.ap-northeast-2.amazonaws.com/screening-test/audio/step13.mp3',
        description: '모든 검사가 종료되었습니다. 수고 많으셨습니다.',
        screeningTestId: 57,
      },
    ];
    setQuestions(questionArr);

    const audio = new Audio(questionArr[currentIndex].audioUrl);
    audio.play();
  }, []);

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
    // 3. 현재 파일 갱신
    audioFileUrlRef.current = uploadUrl;
  }, [audioUrl]);

  const saveAudioFile = () => {
    // 1. 녹음 중지
    offRecAudio();
    // 2. 파일 저장
    onSubmitAudioFile();
  };

  const handleNextStep = () => {
    // 1. 녹음 중이었을 경우
    if (questions[currentIndex].mikeOn) {
      // 1-1. 오디오 파일 저장
      saveAudioFile();
      // 1-2. 현재 문제에 대한 오디오 파일 제출 -> 총 점수 갱신 or 추가 질문
      handleEachProblemAnswerSubmit(audioFileUrlRef.current);
    }

    // 2. 현재 스텝 갱신
    if (currentStep !== questions[currentIndex + 1].step) {
      setCurrentStep((prev) => prev + 1);
    }

    // 3. 현재 문제 인덱스 갱신
    setCurrentIndex((prev) => prev + 1);

    // 4. 다음 질문 음성 파일 재생
    const nextAudioUrl = questions[currentIndex + 1].audioUrl;
    const audio = new Audio(nextAudioUrl);
    if (nextAudioUrl) {
      audio.play();
    }

    // 5. 다음 문제가 mike on일 경우 녹음 시작
    if (questions[currentIndex + 1].mikeOn) {
      // 질문이 끝난 후 녹음 시작
      audio.addEventListener('loadedmetadata', (e) => {
        if (e.target) {
          const duration = (e.target as HTMLAudioElement).duration;
          setTimeout(() => onRecAudio(), duration * 1000);
        }
      });
    }

    // 6. 다시 듣기 횟수 갱신
    trialCountRef.current = questions[currentIndex + 1].trial ?? 10;
  };

  const handleEachProblemAnswerSubmit = async (audioFileUrl: string) => {
    try {
      const { data } = await axios.post(
        `${
          import.meta.env.VITE_API_URL
        }/patient/vitamins/screening-test/detail`,
        {
          audioFileUrl,
          screeningTestId: questions[currentIndex].screeningTestId,
          count: 1,
          firstVertex: [],
          secondVertex: [],
        },
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (data.result.stop) {
        setTotalScore((prev) => prev + data.result);
      } else {
        // 추가 질문 추가
        const newQuestions = questions;
        const additionalQuestion = {
          ...newQuestions[currentIndex],
          audioUrl: '',
          description: data.result.description,
        };

        newQuestions.splice(currentIndex + 1, 0, additionalQuestion);
        setQuestions(newQuestions);
        console.log(newQuestions, currentIndex);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/patient/vitamins/screening-test`,
        { score: totalScore },
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
      );
      navigate('/screeningTestResult', {
        state: { cogLevel: data.result.cogLevel, totalScore },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const convertNewlineToJSX = (inputString: string) => {
    const lines = inputString.split('\n');
    const jsxLines = lines.map((line, index) => (
      <Fragment key={line}>
        {line}
        {index !== lines.length - 1 && <br />}
      </Fragment>
    ));

    return jsxLines;
  };

  const handleListenAgain = () => {
    const nextAudioUrl = questions[currentIndex].audioUrl;
    const audio = new Audio(nextAudioUrl);
    if (nextAudioUrl) {
      audio.play();
    }

    trialCountRef.current--;
  };

  return (
    <Container>
      <Wrapper>
        <ProgressBarWrapper>
          {Array.from({ length: stepCnt }, (_, i) => i).map((v, idx) => (
            <Circle
              style={{
                background:
                  idx + 1 <= currentStep ? 'var(--main-color)' : '#E1E1E1',
              }}
              key={v}
              $step={idx + 1}
              $currentStep={currentStep}>
              <span>{idx + 1}</span>
            </Circle>
          ))}
        </ProgressBarWrapper>
        <Box>
          {questions.length ? (
            <QuestionWrapper>
              <Question>
                {questions[currentIndex].hide
                  ? null
                  : convertNewlineToJSX(questions[currentIndex].description)}
              </Question>
              <ListenAgainButton
                disabled={!trialCountRef.current}
                onClick={handleListenAgain}>
                다시 듣기
              </ListenAgainButton>
            </QuestionWrapper>
          ) : null}
        </Box>
        <ButtonWrapper>
          {currentStep > stepCnt ? (
            <Button onClick={onSubmit}>검사 종료</Button>
          ) : (
            <Button onClick={handleNextStep}>다음</Button>
          )}
        </ButtonWrapper>
      </Wrapper>
    </Container>
  );
}

const Wrapper = styled.div``;

const Box = styled.div`
  width: 146.3rem;
  height: 65rem;
  border-radius: 1.6rem;
  background: #fff;
  box-shadow: 1.5rem 1.3rem 2.8rem 0 rgba(0, 0, 0, 0.06);
  padding: 3rem;
  margin: 2.55rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 80rem;
    height: 33rem;
    margin: 2rem 0;
  }
  @media screen and (max-width: 767px) {
    width: 30rem;
    height: 30rem;
    padding: 1.6rem;
    margin: 1.3rem 0;
  }
`;

const ProgressBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    gap: 2rem;
  }
  @media screen and (max-width: 767px) {
    gap: 1rem;
  }
`;

const Circle = styled.div<{ $step: number; $currentStep: number }>`
  width: 12.5rem;
  height: 12.5rem;
  color: white;
  border: 0.5rem solid white;
  border-radius: 50%;
  font-size: 7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 4rem;
    height: 4rem;
    font-size: 2rem;
    border: 0.2rem solid white;
  }
  @media screen and (max-width: 767px) {
    width: 4rem;
    height: 4rem;
    font-size: 2rem;
    border: 0.2rem solid white;
  }
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: -50%;
    width: 6rem;
    height: 1rem;
    background: ${(props) =>
      props.$step <= props.$currentStep
        ? 'linear-gradient(90deg, #FF9432 0%, #FFD4AD 100%)'
        : '#e1e1e1'};
    transform: translateY(-50%);
    z-index: -1;
    @media screen and (min-width: 768px) and (max-height: 1079px) {
      height: 0.7rem;
    }
    @media screen and (max-width: 767px) {
      width: 3rem;
      height: 0.5rem;
    }
  }
  &:first-child::before {
    content: none;
  }
`;

const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 130rem;
  margin: 0 auto;
  align-items: center;
  border-bottom: 0.2rem solid #c6c6c6;
  padding: 4rem 0;
  gap: 3rem;
  &:last-child {
    border: none;
  }
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 60rem;
    padding: 2rem 0;
  }
  @media screen and (max-width: 767px) {
    width: 26rem;
    flex-wrap: wrap;
    justify-content: center;
    padding: 1rem 0;
  }
`;

const Question = styled.p`
  font-size: 4rem;
  word-break: keep-all;
  font-family: 'Pretendard-Medium';
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 2.2rem;
  }
  @media screen and (max-width: 767px) {
    font-size: 1.6rem;
    margin: 0 0 1rem 0;
    text-align: center;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
`;
const ListenAgainButton = styled.button`
  background: var(--main-color);
  color: white;
  border-radius: 1.1rem;
  font-family: 'Pretendard-Bold';
  font-size: 1.6rem;
  padding: 1.4rem;
`;

export default ScreeningTest;
