import { useEffect, useRef, useState } from 'react';
import GameQuestion from '../../components/common/GameQuestion';
import { GameProps } from '../../routes/gameRouter';
import { useGameLogic } from '../../hooks/useGameLogic';
import Letter from '../../components/games/Synonym';
import { Container } from '../../components/games/SameColor';
import { NumberContainer } from '../../components/games/PatternNumber';
import { Button } from '../../components/common/GameButton';
import { getRandomFloat } from '../../utils/random';
import Board from '../../components/games/WordMemory';

function WordMemory({
  gameData,
  onGameEnd,
  saveGameResult,
  isNextButtonClicked,
  setAnswerState,
  answerState,
}: GameProps) {
  type Props = {
    contents: string;
    answer: boolean;
  };
  const problemPool: Props[] = gameData.problemPool;
  const difficulty = gameData.difficulty;
  const [candidates, setCandidates] = useState<string[]>([]);
  const showNext = gameData.showNext;
  const isShowNext = showNext !== undefined;
  const [words, setWords] = useState<string[]>([]);
  const answerWords = problemPool
    .filter((v) => v.answer)
    .map((v) => v.contents);
  const clickedTargets = useRef<string[]>([]);
  const buttonRefs = useRef<HTMLButtonElement[] | null[]>([]);
  const isCorrect = () => {
    if (clickedTargets.current.length !== answerWords.length) {
      return false;
    }
    const sortedClickedTargets = [...clickedTargets.current].sort((a, b) =>
      a > b ? 1 : -1,
    );
    const sortedAnswerWords = [...answerWords].sort((a, b) => (a > b ? 1 : -1));

    return (
      JSON.stringify(sortedClickedTargets) === JSON.stringify(sortedAnswerWords)
    );
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
    undefined,
    undefined,
    undefined,
    isShowNext,
  );

  useEffect(() => {
    if (isShowNext) {
      setWords(answerWords);
    } else {
      setCandidates(
        problemPool.map((v) => v.contents).sort(() => getRandomFloat() - 0.5),
      );
    }
  }, []);

  const onClickButton = (target: string, el: HTMLElement) => {
    if (clickedTargets.current.includes(target)) {
      el.style.backgroundColor = 'var(--button-bg-color)';
      el.style.border = '0.2rem solid var(--gray-bg-color)';
      el.style.color = 'white';
      clickedTargets.current = clickedTargets.current.filter(
        (v) => v !== target,
      );
      return;
    }
    if (clickedTargets.current.length === answerWords.length) {
      buttonRefs.current.forEach((el) => {
        if (el) {
          el.style.backgroundColor = 'var(--button-bg-color)';
          el.style.border = '0.2rem solid var(--gray-bg-color)';
          el.style.color = 'white';
        }
      });
      clickedTargets.current = [];
    }
    el.style.backgroundColor = 'var(--main-bg-color)';
    el.style.border = '0.2rem solid var(--main-color)';
    el.style.color = 'var(--main-color)';
    clickedTargets.current.push(target);
  };

  return (
    <Container>
      <GameQuestion
        text={
          isShowNext
            ? `제시하는 단어를 최대한 기억하세요`
            : `앞에서 제시된 단어 ${answerWords.length}개를 찾으세요`
        }
      />
      {isShowNext ? (
        <NumberContainer>
          {words.map((v) => (
            <Letter key={v}>{v}</Letter>
          ))}
        </NumberContainer>
      ) : (
        <Board $difficulty={difficulty}>
          {candidates.map((v) => (
            <Button
              key={v}
              ref={(el) => (buttonRefs.current[buttonRefs.current.length] = el)}
              onClick={(e) => onClickButton(v, e.target as HTMLButtonElement)}
              $isLongMobileSmall={true}
              $isLong={false}>
              {v}
            </Button>
          ))}
        </Board>
      )}
    </Container>
  );
}

export default WordMemory;
