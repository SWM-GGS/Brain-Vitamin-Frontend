import axios, { AxiosError } from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import Splash from './Splash';
import { useModal } from '../hooks/useModal';
import LayerPopup from '../components/common/LayerPopup';
import styled from 'styled-components';
import { getErrorMessage } from '../utils/getErrorMessage';
import { Text } from '../components/games/Overlapping';
import {
  Button as GameButton,
  ButtonContainer,
} from '../components/common/GameButton';
import Button from '../components/common/Button';
import { AnswerFeedback } from '../components/common/AnswerFeedback';
import { renderAnswerState } from './CogTraining';

function VitaminPlay() {
  const { accessToken } = useSelector((state: RootState) => state.user);
  type Props = {
    problemType: string;
    imgUrl: string;
    script: string;
    choices: string[] | number[];
    answerIndex: number;
  };
  const [data, setData] = useState<Props[]>([]);
  const [loading, setLoading] = useState(true);
  const { isModalOpen, modalText, openModal, closeModal } = useModal();
  const [gameIndex, setGameIndex] = useState(0);
  const buttonRefs = useRef<HTMLButtonElement[] | null[]>([]);
  const clickedTarget = useRef<string | number | null>(null);
  const [isNextButtonClicked, setIsNextButtonClicked] = useState(false);
  const [answerState, setAnswerState] = useState('');
  const [isSelectedAnswerCorrect, setIsSelectedAnswerCorrect] = useState<
    boolean[]
  >([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/patient/family-stories/problems`,
          {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          },
        );
        if (!data.isSuccess) {
          openModal(data.message);
          return;
        }
        if (data.result.length === 0) {
          openModal(
            '아직 만들어진 비타민이 없습니다.\n비타민을 만들기 위해 사진을 등록해주세요.',
            '/vitaminAlbum',
          );
          return;
        }
        setData(data.result);
      } catch (error) {
        console.error(error);
        const axiosError = error as AxiosError;
        const errorMessage = getErrorMessage(axiosError);
        openModal(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const initButtonStyle = (el: HTMLElement) => {
    el.style.backgroundColor = 'var(--button-bg-color)';
    el.style.border = '0.2rem solid var(--gray-bg-color)';
    el.style.color = 'white';
  };

  const activateButtonStyle = (el: HTMLElement) => {
    el.style.backgroundColor = 'var(--main-bg-color)';
    el.style.border = '0.2rem solid var(--main-color)';
    el.style.color = 'var(--main-color)';
  };

  const onClickButton = (target: number, el: HTMLElement) => {
    if (clickedTarget.current === target) {
      initButtonStyle(el);
      clickedTarget.current = null;
    } else {
      for (const buttonRef of buttonRefs.current) {
        if (buttonRef?.style.backgroundColor === 'var(--main-bg-color)') {
          initButtonStyle(buttonRef);
          break;
        }
      }
      activateButtonStyle(el);
      clickedTarget.current = target;
    }
  };

  const handleNextButtonClick = () => {
    setIsNextButtonClicked(true);
    if (clickedTarget.current === data[gameIndex].answerIndex) {
      setAnswerState('correct');
      setIsSelectedAnswerCorrect((prev) => [...prev, true]);
    } else {
      setAnswerState('incorrect');
      setIsSelectedAnswerCorrect((prev) => [...prev, false]);
    }
  };

  useEffect(() => {
    if (isSelectedAnswerCorrect.length === 0) return;
    (async () => {
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          setAnswerState('');
          resolve();
        }, 2000);
      });
      if (gameIndex === data.length - 1) {
        const correctCnt = isSelectedAnswerCorrect.filter((v) => v).length;
        openModal(
          `모든 퀴즈가 종료되었습니다.\n${data.length}개 중에 ${correctCnt}개를 맞추셨습니다.`,
          '/vitamin',
        );
      } else {
        setGameIndex((prev) => prev + 1);
        setIsNextButtonClicked(false);
      }
    })();
  }, [isSelectedAnswerCorrect]);

  if (loading) return <Splash />;
  return (
    <Container>
      <GameWrapper>
        {data.length > 0 && (
          <>
            <Text>{data[gameIndex].script}</Text>
            <Image alt="비타민 퀴즈 사진" src={data[gameIndex].imgUrl} />
            <ButtonContainer>
              {data[gameIndex].choices.map((v, i) => (
                <GameButton
                  key={v}
                  ref={(el) =>
                    (buttonRefs.current[buttonRefs.current.length] = el)
                  }
                  onClick={(e) =>
                    onClickButton(i, e.target as HTMLButtonElement)
                  }
                  $isLongMobileSmall={true}>
                  {v}
                </GameButton>
              ))}
            </ButtonContainer>
          </>
        )}
      </GameWrapper>
      <ButtonWrapper>
        <Button
          text="다음"
          disabled={isNextButtonClicked}
          onClick={handleNextButtonClick}
        />
      </ButtonWrapper>
      <AnswerFeedback>{renderAnswerState(answerState)}</AnswerFeedback>
      {isModalOpen && (
        <LayerPopup
          label={modalText}
          centerButtonText="확인"
          onClickCenterButton={closeModal}
          closeModal={closeModal}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.6rem;
  height: calc(var(--vh, 1vh) * 100);
  flex-direction: column;
`;
const GameWrapper = styled.div`
  width: 146.3rem;
  height: 75rem;
  border-radius: 1.6rem;
  background: #fff;
  box-shadow: 1.5rem 1.3rem 2.8rem 0 rgba(0, 0, 0, 0.06);
  padding: 3rem;
  margin: 2.55rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 900px;
    height: 500px;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    height: 600px;
    padding: 1.6rem;
  }
`;
const Image = styled.img`
  width: 900px;
  height: 500px;
  object-fit: contain;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 500px;
    height: 300px;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    height: 250px;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 146.3rem;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 900px;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

export default VitaminPlay;
