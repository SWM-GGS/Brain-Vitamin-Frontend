import { useState } from 'react';

const useSpeechToText = () => {
  const [transcript, setTranscript] = useState('');
  const [listening, setListening] = useState(false);
  let recognition: SpeechRecognition | null = null;

  const startListening = () => {
    recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'ko';
    recognition.continuous = true;

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;
      setTranscript(transcript);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.start();
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  const abortListening = () => {
    if (recognition) {
      recognition.abort();
    }
  };

  const resetTranscript = () => {
    setTranscript('');
  };

  return {
    listening,
    transcript,
    startListening,
    stopListening,
    abortListening,
    resetTranscript,
  };
};

export default useSpeechToText;
