import axios from 'axios';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import GameRouter from '../routes/gameRouter';
import LayerPopup from '../components/common/LayerPopup';
import Timer from '../modules/Timer';
import { useNavigate } from 'react-router';
import Button from '../components/common/Button';

export type CogTrainingProps = {
  cogArea: string;
  difficulty: number;
  explanation: string;
  problemId: number;
  problemPool: any[];
  timeLimit: number;
  trainingName: string;
  discountPercent?: number;
};
function CogTraining() {
  const [gameData, setGameData] = useState<CogTrainingProps[]>([]);
  const [gameIndex, setGameIndex] = useState(0);
  const [showLayerPopup, setShowLayerPopup] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [exitGame, setExitGame] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getGameData = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/patient/vitamins/cog-training`,
        );
        console.log(data);
        setGameData(data.result);
        setShowLayerPopup(true);
      } catch (error) {
        console.error(error);
      }
    };
    // getGameData();
    setGameData([
      {
        cogArea: '기억력',
        difficulty: 1,
        explanation: '아래 카드들의 짝을 모두 맞춰 뒤집어 주세요',
        problemId: 4,
        problemPool: [{ imgUrl: '' }, { imgUrl: '' }, { imgUrl: '' }],
        timeLimit: 60,
        trainingName: '카드 뒤집기',
      },
      {
        cogArea: '주의집중력',
        difficulty: 1,
        explanation: '위의 팔레트를 보고 똑같이 색을 칠해주세요',
        problemId: 8,
        problemPool: [],
        timeLimit: 60,
        trainingName: '팔레트 따라 색칠하기',
      },
      {
        cogArea: '시지각능력',
        difficulty: 2,
        explanation:
          '다음의 그림은 여러개의 숫자가 합쳐진 그림입니다. 무슨 숫자가 있는지 선택해주세요',
        problemId: 12,
        problemPool: [],
        timeLimit: 60,
        trainingName: '합쳐진 숫자 찾기',
      },
      {
        cogArea: '언어능력',
        difficulty: 2,
        explanation:
          '아래의 그림을 보고 단어를 조합해서 올바른 단어를 만들어주세요',
        problemId: 20,
        problemPool: [
          { answer: true, contents: '버스', imgUrl: '' },
          { answer: true, contents: '버스', imgUrl: '' },
          { answer: false, contents: '냉장고' },
          { answer: false, contents: '냉장고' },
          { answer: false, contents: '냉장고' },
          { answer: false, contents: '냉장고' },
          { answer: false, contents: '냉장고' },
          { answer: false, contents: '냉장고' },
        ],
        timeLimit: 60,
        trainingName: '글자 조합해서 단어 만들기',
      },
      {
        cogArea: '계산능력',
        difficulty: 2,
        discountPercent: 0,
        explanation:
          'ㅇㅇ님이 쇼핑을 하러 갔습니다. 지불해야 할 총 금액을 선택해주세요',
        problemId: 23,
        problemPool: [
          {
            contents: '양파',
            count: 5,
            imgUrl:
              'https://img4.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202012/16/healthchosun/20201216135843820ghdj.jpg',
            price: 900,
          },
          {
            contents: '귤',
            count: 5,
            imgUrl:
              'https://www.shinsegaegroupnewsroom.com/wp-content/uploads/2019/12/%EB%B3%B4%EB%8F%84%EC%9E%90%EB%A3%8C106.%EC%9D%B4%EB%A7%88%ED%8A%B8-%ED%95%9C%EC%97%AC%EB%A6%84-%EB%8C%80%EC%84%B8%EB%A1%9C-%EB%96%A0%EC%98%A4%EB%A5%B8-%EA%B7%A4-%E2%80%98%EB%8B%B9%EB%8F%84',
            price: 600,
          },
          {
            contents: '수박',
            count: 4,
            imgUrl:
              'https://i.namu.wiki/i/ImSm8Yu1bL5ojWlfAWWpfZRkD0uBnl61DOemJvxXZVYDf5tgTi4pkSnR3asTmMcIgAi37xZ14t-C8ZOlDGioPg.webp',
            price: 23100,
          },
        ],
        timeLimit: 60,
        trainingName: '시장에서 쇼핑하기',
      },
      {
        cogArea: '집행능력',
        difficulty: 1,
        explanation:
          '미로의 입구에서 도착지점까지의 경로 중 하나의 도형을 지나게 됩니다. 그 도형을 선택해주세요',
        problemId: 27,
        problemPool: [
          {
            answer: true,
            imgUrl:
              'https://blog.kakaocdn.net/dn/F3z2i/btrd5j0Dowe/4QOiZCy4Mw4kUYb9kkeSt0/img.jpg',
            x: 1,
            y: 1,
          },
          {
            answer: false,
            imgUrl:
              'https://blog.kakaocdn.net/dn/F3z2i/btrd5j0Dowe/4QOiZCy4Mw4kUYb9kkeSt0/img.jpg',
            x: 2,
            y: 2,
          },
          {
            answer: false,
            imgUrl:
              'https://blog.kakaocdn.net/dn/F3z2i/btrd5j0Dowe/4QOiZCy4Mw4kUYb9kkeSt0/img.jpg',
            x: 3,
            y: 3,
          },
        ],
        timeLimit: 60,
        trainingName: '미로 길찾기',
      },
      {
        cogArea: '시공간/지남력',
        difficulty: 1,
        explanation: '이번주의 달력을 보고 오늘의 날짜를 선택해주세요',
        problemId: 32,
        problemPool: [],
        timeLimit: 60,
        trainingName: '오늘의 날짜 찾기',
      },
    ]);
  }, []);

  const goToNextGame = () => {
    if (gameIndex === gameData.length - 1) {
      alert('모든 게임이 종료되었습니다');
      return;
    }
    setGameIndex((prev) => prev + 1);
  };

  const onGameEnd = () => {
    goToNextGame();
    setShowLayerPopup(true);
    setIsTimerRunning(false);
  };

  const startGame = () => {
    setShowLayerPopup(false);
    setIsTimerRunning(true);
    // navigate(`/cogTraining/${gameData[gameIndex].pathUri}`);
    navigate(path[gameIndex]);
  };

  const path = [
    '/cogTraining/cardMatch',
    '/cogTraining/coloring',
    '/cogTraining/overlapping',
    '/cogTraining/wordPuzzle',
    '/cogTraining/market',
    '/cogTraining/maze',
    '/cogTraining/dateQuiz',
  ];

  return (
    <Container>
      {gameData.length ? (
        <>
          <Wrapper>
            <StatusWrapper>
              {isTimerRunning && (
                <Timer
                  // timeLimit={gameData[gameIndex].timeLimit}
                  timeLimit={500000}
                  onTimeUp={onGameEnd}
                />
              )}
              <Num>
                {gameIndex + 1}/{gameData.length}
              </Num>
            </StatusWrapper>
            <GameWrapper>
              {/* <GameRouter gameData={gameData[gameIndex]} onGameEnd={onGameEnd} /> */}
              <GameRouter
                gameData={gameData[gameIndex]}
                onGameEnd={onGameEnd}
              />
            </GameWrapper>
            <ButtonWrapper>
              <Button onClick={() => setExitGame(true)}>게임 종료</Button>
            </ButtonWrapper>
          </Wrapper>
          {showLayerPopup && (
            <LayerPopup
              label={gameData[gameIndex].trainingName}
              desc={gameData[gameIndex].explanation}
              leftButtonText="취소"
              onClickLeftButton={() => navigate('/home')}
              rightButtonText="게임 시작"
              onClickRightButton={startGame}
            />
          )}
          {exitGame && (
            <LayerPopup
              label="게임을 정말 종료하시겠습니까?"
              leftButtonText="취소"
              onClickLeftButton={() => setExitGame(false)}
              rightButtonText="종료"
              onClickRightButton={() => navigate('/home')}
            />
          )}
        </>
      ) : null}
    </Container>
  );
}

const Container = styled.div`
  padding: 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Wrapper = styled.div``;

const GameWrapper = styled.div`
  width: 146.3rem;
  height: 71.9rem;
  border-radius: 1.6rem;
  background: #fff;
  box-shadow: 1.5rem 1.3rem 2.8rem 0 rgba(0, 0, 0, 0.06);
  padding: 3rem;
  margin: 2.55rem 0;
`;

const StatusWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Num = styled.div`
  font-size: 3rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default CogTraining;
