import { useEffect, useState } from 'react';
import {
  ButtonContainer,
  PictureButton,
} from '../../components/common/GameButton';
import GameQuestion from '../../components/common/GameQuestion';
import { getRandomFloat } from '../../utils/random';
import { GameProps } from '../../routes/gameRouter';
import { useGameLogic } from '../../hooks/useGameLogic';
import { Container } from '../../components/games/SameColor';
import { PresentedImg } from '../../components/games/PictureMatch';

function PictureMatch({
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
  const [candidates, setCandidates] = useState<string[]>([]);
  const [presented, setPresented] = useState('');
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
    const answerPair = problemPool.filter((v) => v.answer);
    const candidates = problemPool
      .filter((v) => !v.answer)
      .map((v) => v.imgUrl);
    const presented = answerPair[0].imgUrl;
    const answer = answerPair[1].imgUrl;

    setAnswer(answer);
    setPresented(presented);
    setCandidates([answer, ...candidates].sort(() => getRandomFloat() - 0.5));
  }, []);

  return (
    <Container>
      <GameQuestion text="아래 그림과 이어지는 그림을 고르세요" />
      <PresentedImg $presented={presented} />
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

export default PictureMatch;
