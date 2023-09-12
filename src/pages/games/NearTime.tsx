import { useEffect, useRef, useState } from 'react';
import { GameProps } from '../../routes/gameRouter';
import { getRandomFloat } from '../../utils/random';
import {
  Container,
  Clock,
  Hour,
  Min,
  Sec,
  Hr,
  Mm,
  Sc,
  ButtonContainer,
  Button,
} from '../../components/games/NearTime';
import GameQuestion from '../../components/common/GameQuestion';

function NearTime({
  gameData,
  onGameEnd,
  saveGameResult,
  isNextButtonClicked,
  setAnswerState,
  answerState,
}: GameProps) {
  const startTimeRef = useRef<Date | null>(new Date());
  const endTimeRef = useRef<Date | null>(null);
  const duration = useRef(0);
  const deg = 6;
  const [hh, setHh] = useState(0);
  const [mm, setMm] = useState(0);
  const [ss, setSs] = useState(0);
  const [hour, setHour] = useState(0);
  const [answer, setAnswer] = useState(0);
  const clickedHour = useRef(-1);
  const buttonRefs = useRef<HTMLButtonElement[] | null[]>([]);

  useEffect(() => {
    const hour = Math.floor(getRandomFloat() * 23);
    const min = Math.floor(getRandomFloat() * 58 + 1);
    let sec = Math.floor(getRandomFloat() * 58 + 1);

    if (min === 30 && sec === 30) {
      sec--;
    }
    if (min < 30) {
      setAnswer(hour);
    } else if (min > 30) {
      setAnswer(hour + 1);
    } else if (sec < 30) {
      setAnswer(hour);
    } else {
      setAnswer(hour + 1);
    }
    setHour(hour);
    setHh(hour * 30);
    setMm(min * deg);
    setSs(sec * deg);
  }, []);

  const checkAnswer = async () => {
    if (clickedHour.current === answer) {
      // 정답
      saveGameResult(gameData.problemId, duration.current, 'SUCCESS', 10);
      setAnswerState('correct');
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          setAnswerState('');
          resolve();
        }, 2000);
      });
      onGameEnd();
    } else {
      // 오답
      setAnswerState('incorrect');
    }
  };

  useEffect(() => {
    if (answerState === 'incorrect') {
      const handleIncorrect = async () => {
        saveGameResult(gameData.problemId, duration.current, 'FAIL', 0);
        await new Promise<void>((resolve) => {
          setTimeout(() => {
            setAnswerState('');
            resolve();
          }, 2000);
        });
        onGameEnd();
      };
      handleIncorrect();
    }
  }, [answerState]);

  useEffect(() => {
    if (isNextButtonClicked) {
      endTimeRef.current = new Date();
      if (startTimeRef.current && endTimeRef.current) {
        duration.current =
          (endTimeRef.current.getTime() - startTimeRef.current.getTime()) /
          1000;
      }
      checkAnswer();
    }
  }, [isNextButtonClicked]);

  const onClickButton = (hour: number, el: HTMLElement) => {
    if (clickedHour.current === hour) {
      el.style.background = 'var(--button-bg-color)';
      el.style.border = '0.2rem solid var(--gray-bg-color)';
      el.style.color = 'white';
      clickedHour.current = -1;
    } else {
      for (const buttonRef of buttonRefs.current) {
        if (buttonRef?.style.background === 'var(--main-bg-color)') {
          buttonRef.style.background = 'var(--button-bg-color)';
          buttonRef.style.border = '0.2rem solid var(--gray-bg-color)';
          buttonRef.style.color = 'white';
          break;
        }
      }
      el.style.background = 'var(--main-bg-color)';
      el.style.border = '0.2rem solid var(--main-color)';
      el.style.color = 'var(--main-color)';
      clickedHour.current = hour;
    }
  };

  return (
    <Container>
      <GameQuestion text="아래 시계와 가장 가까운 시간을 고르세요" />
      <Clock>
        <Hour>
          <Hr style={{ transform: `rotateZ(${hh + mm / 12}deg)` }} />
        </Hour>
        <Min>
          <Mm style={{ transform: `rotateZ(${mm}deg)` }} />
        </Min>
        <Sec>
          <Sc style={{ transform: `rotateZ(${ss}deg)` }} />
        </Sec>
      </Clock>
      <ButtonContainer>
        <Button
          ref={(el) => (buttonRefs.current[0] = el)}
          onClick={(e) => onClickButton(hour, e.target as HTMLButtonElement)}>
          {hour}시
        </Button>
        <Button
          ref={(el) => (buttonRefs.current[1] = el)}
          onClick={(e) =>
            onClickButton(hour + 1, e.target as HTMLButtonElement)
          }>
          {hour + 1}시
        </Button>
      </ButtonContainer>
    </Container>
  );
}

export default NearTime;
