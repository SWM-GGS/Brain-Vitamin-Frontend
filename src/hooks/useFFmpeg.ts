import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { useEffect, useRef, useState } from 'react';

export const useFFmpeg = () => {
  const [loaded, setLoaded] = useState(false);
  const [message, setMessage] = useState('');
  const ffmpegRef = useRef(new FFmpeg());

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const baseURL = 'https://unpkg.com/@ffmpeg/core-mt@0.12.4/dist/esm';
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on('log', ({ message }) => {
      setMessage(message);
    });
    // toBlobURL is used to bypass CORS issue, urls with the same
    // domain can be used directly.
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        'application/wasm',
      ),
      workerURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.worker.js`,
        'text/javascript',
      ),
    });
    setLoaded(true);
  };

  const transcode = async (input: Blob, type: string) => {
    const extension = type.split('/')[1];
    const outputFileName = `output.${extension}`;
    const ffmpeg = ffmpegRef.current;
    await ffmpeg.writeFile('input.webm', await fetchFile(input));
    await ffmpeg.exec(['-i', 'input.webm', outputFileName]);
    const fileData = await ffmpeg.readFile(outputFileName);
    const data = new Uint8Array(fileData as ArrayBuffer);
    const convertedBlob = new Blob([data.buffer], { type });

    return convertedBlob;
  };

  return { loaded, message, transcode };
};
