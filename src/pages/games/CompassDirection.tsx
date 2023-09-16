import { GameProps } from '../../routes/gameRouter';
import { useEffect, useState } from 'react';
import { useGameLogic } from '../../hooks/useGameLogic';
import { Container } from '../../components/games/PatternNumber';
import { Button } from '../../components/common/GameButton';
import { getRandomFloat } from '../../utils/random';
import GameQuestion from '../../components/common/GameQuestion';
import { Body, Compass } from '../../components/games/CompassDirection';

function CompassDirection({
  gameData,
  onGameEnd,
  saveGameResult,
  isNextButtonClicked,
  setAnswerState,
  answerState,
}: GameProps) {
  const difficulty = gameData.difficulty;
  const [selectedDegree, setSelectedDegree] = useState(0);
  const [selectedDirection, setSelectedDirection] = useState('');
  const { onClickButton, setAnswer, buttonRefs } = useGameLogic<number>({
    gameData,
    onGameEnd,
    saveGameResult,
    isNextButtonClicked,
    setAnswerState,
    answerState,
  });
  const directions = ['북', '북동', '동', '남동', '남', '남서', '서', '북서'];
  const candidateDegree =
    difficulty === 3 ? [0, 45, 90, 135, 180, 225, 270, 315] : [0, 90, 180, 270];
  const candidateDirection =
    difficulty === 1 ? ['동', '서', '남', '북'] : directions;

  const getRandomIndex = (num: number) => {
    return Math.floor(getRandomFloat() * num);
  };

  useEffect(() => {
    const randomIndex1 = getRandomIndex(candidateDegree.length - 1);
    const selectedDegree = candidateDegree[randomIndex1];
    const randomIndex2 = getRandomIndex(candidateDirection.length - 1);
    const selectedDirection = candidateDirection[randomIndex2];
    const answer =
      (selectedDegree / 45 + directions.indexOf(selectedDirection)) %
      directions.length;

    setAnswer(answer);
    setSelectedDegree(selectedDegree);
    setSelectedDirection(selectedDirection);
  }, []);

  const targets = [7, 0, 1, 6, -1, 2, 5, 4, 3];

  return (
    <Container>
      <GameQuestion text={`${selectedDirection}쪽은 어디일까요?`} />
      <Body>
        {targets.map((v) => (
          <div key={v}>
            {v === -1 ? (
              <Compass $degree={selectedDegree} />
            ) : (
              <Button
                style={{
                  backgroundImage: `url('/assets/images/location.svg')`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                }}
                $isLong={false}
                ref={(el) =>
                  (buttonRefs.current[buttonRefs.current.length] = el)
                }
                onClick={(e) => onClickButton(v, e.target as HTMLButtonElement)}
              />
            )}
          </div>
        ))}
      </Body>
    </Container>
  );
}

export default CompassDirection;
