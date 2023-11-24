import { useEffect, useState } from 'react';
import { Button, ButtonContainer } from '../../components/common/GameButton';
import GameQuestion from '../../components/common/GameQuestion';
import {
  Container,
  NumberContainer,
} from '../../components/games/PatternNumber';
import { getRandomFloat } from '../../utils/random';
import { GameProps } from '../../routes/gameRouter';
import { Num } from '../../components/games/BasicCalculate';
import { useGameLogic } from '../../hooks/useGameLogic';

function PatternNumber({
  gameData,
  onGameEnd,
  saveGameResult,
  isNextButtonClicked,
  setAnswerState,
  answerState,
}: Readonly<GameProps>) {
  const difficulty = gameData.difficulty;
  const [quizPosition, setQuizPosition] = useState(0);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [candidates, setCandidates] = useState<number[]>([]);
  const { onClickButton, setAnswer, buttonRefs } = useGameLogic<number>({
    gameData,
    onGameEnd,
    saveGameResult,
    isNextButtonClicked,
    setAnswerState,
    answerState,
  });

  useEffect(() => {
    const n = Math.floor(getRandomFloat() * 4 + 1);
    let x: number;
    let y: number;
    let answer: number;

    if (difficulty === 1) {
      // x + (n-1)*y -> 등차수열, 1 ≤ x ≤ 5, 1 ≤ y ≤ 5
      x = Math.floor(getRandomFloat() * 4 + 1);
      y = Math.floor(getRandomFloat() * 4 + 1);
      answer = x + (n - 1) * y;
    } else if (difficulty === 2) {
      // x + (n-1)*y -> 등차수열, 1 ≤ x ≤ 10, 1 ≤ y ≤ 10
      x = Math.floor(getRandomFloat() * 9 + 1);
      y = Math.floor(getRandomFloat() * 9 + 1);
      answer = x + (n - 1) * y;
    } else {
      // x * y^(n-1) -> 등비수열, 1 ≤ x ≤ 5, 2 ≤ y ≤ 5
      // x = Math.floor(getRandomFloat() * 4 + 1);
      // y = Math.floor(getRandomFloat() * 3 + 2);
      // answer = x * y ** (n - 1);

      // x + (n-1)*y -> 등차수열, 1 ≤ x ≤ 15, 1 ≤ y ≤ 15
      x = Math.floor(getRandomFloat() * 14 + 1);
      y = Math.floor(getRandomFloat() * 14 + 1);
      answer = x + (n - 1) * y;
    }
    setAnswer(answer);
    setX(x);
    setY(y);
    setQuizPosition(n);
    setCandidates(
      [answer, getRandomFloat() < 0.5 ? answer + 2 : answer - 2].sort(
        () => getRandomFloat() - 0.5,
      ),
    );
  }, []);

  return (
    <Container>
      <GameQuestion text="규칙에 맞는 숫자를 고르세요" />
      <NumberContainer>
        {Array.from({ length: 5 }, (_, i) => i + 1).map((v) => (
          <div key={v}>
            {difficulty === 3 ? (
              <Num $num={quizPosition !== v ? x * y ** (v - 1) : null} />
            ) : (
              <Num $num={quizPosition !== v ? x + (v - 1) * y : null} />
            )}
          </div>
        ))}
      </NumberContainer>
      <ButtonContainer>
        {candidates.map((v) => (
          <Button
            key={v}
            ref={(el) => (buttonRefs.current[buttonRefs.current.length] = el)}
            onClick={(e) => onClickButton(v, e.target as HTMLButtonElement)}>
            {v}
          </Button>
        ))}
      </ButtonContainer>
    </Container>
  );
}

export default PatternNumber;
