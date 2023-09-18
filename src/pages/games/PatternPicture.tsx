import { useEffect, useState } from 'react';
import {
  ButtonContainer,
  PictureButton,
} from '../../components/common/GameButton';
import GameQuestion from '../../components/common/GameQuestion';
import { NumberContainer } from '../../components/games/PatternNumber';
import { GameProps } from '../../routes/gameRouter';
import { useGameLogic } from '../../hooks/useGameLogic';
import { getRandomFloat } from '../../utils/random';
import { PresentedImg } from '../../components/games/PatternPicture';
import { Container } from '../../components/games/SameColor';

function PatternPicture({
  gameData,
  onGameEnd,
  saveGameResult,
  isNextButtonClicked,
  setAnswerState,
  answerState,
}: GameProps) {
  type Props = {
    imgUrl: string;
  };
  const problemPool: Props[] = gameData.problemPool;
  const difficulty = gameData.difficulty;
  const [quizPosition, setQuizPosition] = useState(0);
  type PresentedProps = { idx: number; imgUrl: string };
  const [presented, setPresented] = useState<PresentedProps[]>([]);
  const [candidates, setCandidates] = useState<string[]>([]);
  const { onClickButton, setAnswer, buttonRefs } = useGameLogic<string>(
    {
      gameData,
      onGameEnd,
      saveGameResult,
      isNextButtonClicked,
      setAnswerState,
      answerState,
    },
    undefined,
    undefined,
    undefined,
    true,
  );

  useEffect(() => {
    const imgUrls = problemPool.map((v) => v.imgUrl);
    let presented: string[] = [];

    if (difficulty === 2) {
      presented = [...imgUrls, ...imgUrls, ...imgUrls];
    } else {
      presented = [...imgUrls, ...imgUrls];
    }
    const newPresented = presented.map((v, i) => {
      return { idx: i, imgUrl: v };
    });
    const randomIndex = Math.floor(getRandomFloat() * (presented.length - 1));

    setPresented(newPresented);
    setQuizPosition(randomIndex);
    setAnswer(presented[randomIndex]);
    setCandidates(imgUrls);
  }, []);

  return (
    <Container>
      <GameQuestion text="규칙에 맞는 그림을 고르세요" />
      <NumberContainer>
        {presented.map((v, i) => (
          <PresentedImg
            key={v.idx}
            $presented={v.imgUrl}
            $isQuizPosition={i === quizPosition}
          />
        ))}
      </NumberContainer>
      <ButtonContainer>
        {candidates.map((v) => (
          <PictureButton
            key={v}
            ref={(el) => (buttonRefs.current[buttonRefs.current.length] = el)}
            $imgUrl={v}
            $isMedium={true}
            onClick={(e) => onClickButton(v, e.target as HTMLButtonElement)}
          />
        ))}
      </ButtonContainer>
    </Container>
  );
}

export default PatternPicture;
