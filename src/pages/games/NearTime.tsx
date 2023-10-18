import { useEffect, useState } from 'react';
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
import { useGameLogic } from '../../hooks/useGameLogic';

function NearTime({
  gameData,
  onGameEnd,
  saveGameResult,
  isNextButtonClicked,
  setAnswerState,
  answerState,
}: Readonly<GameProps>) {
  const deg = 6;
  const [hh, setHh] = useState(0);
  const [mm, setMm] = useState(0);
  const [ss, setSs] = useState(0);
  const [hour, setHour] = useState(0);
  const { onClickButton, setAnswer, buttonRefs } = useGameLogic<number>({
    gameData,
    onGameEnd,
    saveGameResult,
    isNextButtonClicked,
    setAnswerState,
    answerState,
  });

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
