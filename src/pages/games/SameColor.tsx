import { useMemo, useRef } from 'react';
import { GameProps } from '../../routes/gameRouter';
import { useGameLogic } from '../../hooks/useGameLogic';
import GameQuestion from '../../components/common/GameQuestion';
import { getRandomFloat } from '../../utils/random';
import { Container, Board, Button } from '../../components/games/SameColor';

function SameColor({
  gameData,
  onGameEnd,
  saveGameResult,
  isNextButtonClicked,
  setAnswerState,
  answerState,
}: Readonly<GameProps>) {
  const difficulty = gameData.difficulty;
  const colorNames = ['빨강', '파랑', '노랑', '검정'];
  const colors = ['red', 'blue', 'yellow', 'black'];
  const colorNameMatch: { [key: string]: string } = {
    red: '빨강',
    blue: '파랑',
    yellow: '노랑',
    black: '검정',
  };
  let maxNum = 0;
  switch (difficulty) {
    case 1:
      maxNum = 6;
      break;
    case 2:
      maxNum = 8;
      break;
    case 3:
      maxNum = 12;
  }
  const targets = useMemo(
    () =>
      Array.from({ length: maxNum }, (_, i) => {
        const letter = colorNames[Math.floor(getRandomFloat() * 3)];
        const color = colors[Math.floor(getRandomFloat() * 3)];

        return {
          letter,
          color,
          idx: i,
          answer: letter === colorNameMatch[color],
        };
      }),
    [],
  );
  const answerCnt = targets.filter((v) => v.answer).length;
  const clickedTargets = useRef<number[]>([]);
  const buttonRefs = useRef<HTMLButtonElement[] | null[]>([]);
  const isCorrect = () => {
    const selectedAnswerCnt = clickedTargets.current.filter(
      (v) => targets[v].answer,
    ).length;

    return selectedAnswerCnt === answerCnt;
  };
  useGameLogic<string>(
    {
      gameData,
      onGameEnd,
      saveGameResult,
      isNextButtonClicked,
      setAnswerState,
      answerState,
    },
    isCorrect(),
  );

  const onClickButton = (idx: number, el: HTMLElement) => {
    if (clickedTargets.current.includes(idx)) {
      el.style.background = '#e7e8ea';
      el.style.border = '0.2rem solid #e7e8ea';
      clickedTargets.current = clickedTargets.current.filter((v) => v !== idx);
    } else {
      el.style.background = 'var(--main-bg-color)';
      el.style.border = '0.2rem solid var(--main-color)';
      clickedTargets.current.push(idx);
    }
  };

  return (
    <Container>
      <GameQuestion text="글자와 같은 색깔을 모두 고르세요" />
      <Board $difficulty={difficulty}>
        {targets.map((v) => (
          <Button
            key={v.idx}
            ref={(el) => (buttonRefs.current[buttonRefs.current.length] = el)}
            $letter={v.letter}
            $color={v.color}
            onClick={(e) => onClickButton(v.idx, e.target as HTMLButtonElement)}
          />
        ))}
      </Board>
    </Container>
  );
}

export default SameColor;
