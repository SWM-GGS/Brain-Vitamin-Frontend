import { useState } from 'react';

const useSpeechToText = () => {
  const [transcript, setTranscript] = useState('');
  const [listening, setListening] = useState(false);
  let recognition: SpeechRecognition | null = null;

  const startListening = () => {
    recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'ko';
    recognition.continuous = true;

    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;
      setTranscript(transcript);
    };

    recognition.start();
    setListening(true);
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setListening(false);
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
    resetTranscript,
  };
};

export default useSpeechToText;
