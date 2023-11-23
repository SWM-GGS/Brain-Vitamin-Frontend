import { useEffect, useState } from 'react';

const useSpeechToText = () => {
  const [transcript, setTranscript] = useState('');
  const [listening, setListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null,
  );

  useEffect(() => {
    if (recognition) {
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
    }

    return () => {
      stopListening();
      abortListening();
    };
  }, [recognition]);

  const startListening = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'ko';
    recognition.continuous = true;
    recognition.start();
    setRecognition(recognition);
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setRecognition(null);
    }
  };

  const abortListening = () => {
    if (recognition) {
      recognition.abort();
      setRecognition(null);
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
