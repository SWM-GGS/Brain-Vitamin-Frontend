import { useEffect, useRef, useState } from 'react';
import GameQuestion from '../../components/common/GameQuestion';
import { GameProps } from '../../routes/gameRouter';
import { useGameLogic } from '../../hooks/useGameLogic';
import { Container } from '../../components/games/SameColor';
import { NumberContainer } from '../../components/games/PatternNumber';
import { PictureButton } from '../../components/common/GameButton';
import { getRandomFloat } from '../../utils/random';
import { Board, FlagImage } from '../../components/games/FlagMemory';

function FlagMemory({
  gameData,
  onGameEnd,
  saveGameResult,
  isNextButtonClicked,
  setAnswerState,
  answerState,
}: GameProps) {
  type Props = {
    imgUrl: string;
    answer: boolean;
  };
  const problemPool: Props[] = gameData.problemPool;
  const difficulty = gameData.difficulty;
  const [candidates, setCandidates] = useState<string[]>([]);
  const showNext = gameData.showNext;
  const isShowNext = showNext !== undefined;
  const [words, setWords] = useState<string[]>([]);
  const answerImgUrls = problemPool
    .filter((v) => v.answer)
    .map((v) => v.imgUrl);
  const clickedTargets = useRef<string[]>([]);
  const buttonRefs = useRef<HTMLButtonElement[] | null[]>([]);
  const isCorrect = () => {
    if (clickedTargets.current.length !== answerImgUrls.length) {
      return false;
    }
    const sortedClickedTargets = [...clickedTargets.current].sort((a, b) =>
      a > b ? 1 : -1,
    );
    const sortedAnswerWords = [...answerImgUrls].sort((a, b) =>
      a > b ? 1 : -1,
    );

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
      setWords(answerImgUrls);
    } else {
      setCandidates(
        problemPool.map((v) => v.imgUrl).sort(() => getRandomFloat() - 0.5),
      );
    }
  }, []);

  const onClickButton = (target: string, el: HTMLElement) => {
    if (clickedTargets.current.includes(target)) {
      el.style.backgroundColor = 'var(--button-bg-color)';
      el.style.border = '0.2rem solid var(--black-color)';
      el.style.color = 'white';
      clickedTargets.current = clickedTargets.current.filter(
        (v) => v !== target,
      );
      return;
    }
    if (clickedTargets.current.length === answerImgUrls.length) {
      buttonRefs.current.forEach((el) => {
        if (el) {
          el.style.backgroundColor = 'var(--button-bg-color)';
          el.style.border = '0.2rem solid var(--black-color)';
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
            ? `제시하는 국기를 최대한 기억하세요`
            : `앞에서 제시된 국기 ${answerImgUrls.length}개를 찾으세요`
        }
      />
      {isShowNext ? (
        <NumberContainer>
          {words.map((v) => (
            <FlagImage key={v} alt="" src={v} />
          ))}
        </NumberContainer>
      ) : (
        <Board $difficulty={difficulty}>
          {candidates.map((v) => (
            <PictureButton
              key={v}
              ref={(el) => (buttonRefs.current[buttonRefs.current.length] = el)}
              onClick={(e) => onClickButton(v, e.target as HTMLButtonElement)}
              $imgUrl={v}
              $isMedium={true}
            />
          ))}
        </Board>
      )}
    </Container>
  );
}

export default FlagMemory;
