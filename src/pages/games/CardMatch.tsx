import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Container,
  Card,
  FlipWrapper,
  Flip,
  Front,
  Back,
} from '../../components/games/CardMatch.tsx';
import { GameProps } from '../../routes/gameRouter.tsx';

/**
 * 난도별 카드 개수 상이
 * 하 : 2 * 3
 * 중 : 2 * 4
 * 상 : 3 * 4
 */
export default function CardMatch({
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
  const [clickedCards, setClickedCards] = useState<number[]>([]);
  const [clickable, setClickable] = useState<boolean>(true);
  let difficulty = gameData.difficulty;
  const deck = problemPool.map((v) => v.imgUrl);
  const cards = [...deck, ...deck].map((card, i) => {
    return { idx: i, type: card, status: false };
  });
  const shuffle = () => cards.sort(() => 0.5 - Math.random());
  const mixedCards = useMemo(() => shuffle(), []);
  const startTimeRef = useRef<Date | null>(new Date());
  const endTimeRef = useRef<Date | null>(null);
  let duration = useRef(0);

  const checkAnswer = async () => {
    // 모든 카드의 상태가 true면 게임 종료
    if (mixedCards.every((card) => card.status)) {
      // 정답
      saveGameResult(gameData.problemId, duration.current, 'SUCCESS', 10);
      setAnswerState('correct');
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          setAnswerState('');
          resolve();
        }, 2000);
      });
      onGameEnd();
    } else {
      // 오답
      setAnswerState('incorrect');
    }
  };

  useEffect(() => {
    if (answerState === 'incorrect') {
      const handleIncorrect = async () => {
        saveGameResult(gameData.problemId, duration.current, 'FAIL', 0);
        await new Promise<void>((resolve) => {
          setTimeout(() => {
            setAnswerState('');
            resolve();
          }, 2000);
        });
        onGameEnd();
      };
      handleIncorrect();
    }
  }, [answerState]);

  useEffect(() => {
    if (isNextButtonClicked) {
      endTimeRef.current = new Date();
      if (startTimeRef.current && endTimeRef.current) {
        duration.current =
          (endTimeRef.current.getTime() - startTimeRef.current.getTime()) /
          1000;
      }
      checkAnswer();
    }
  }, [isNextButtonClicked]);

  useEffect(() => {
    // 클릭된 카드가 두 장인 경우, 매칭 여부 검사
    setClickable(false);
    if (clickedCards.length === 2) {
      setTimeout(() => {
        let firstCard = mixedCards.find((card) => card.idx === clickedCards[0])
          ?.type;
        let secondCard = mixedCards.find((card) => card.idx === clickedCards[1])
          ?.type;
        // 두 카드가 같지 않은 경우, 클릭된 두 장의 카드 다시 뒤집기
        if (firstCard !== secondCard) {
          mixedCards.forEach((card) => {
            if (card.idx === clickedCards[0] || card.idx === clickedCards[1]) {
              card.status = false;
            }
          });
          console.log('매칭에 실패하셨습니다ㅠㅠ');
        } else {
          // 매칭 성공
          console.log('매칭에 성공하셨습니다!');
          // 카드가 모두 매칭된 경우 자동 정답 처리
          endTimeRef.current = new Date();
          if (startTimeRef.current && endTimeRef.current) {
            duration.current =
              (endTimeRef.current.getTime() - startTimeRef.current.getTime()) /
              1000;
          }
          const checkAnswer = async () => {
            if (mixedCards.every((card) => card.status)) {
              // 정답
              saveGameResult(
                gameData.problemId,
                duration.current,
                'SUCCESS',
                10,
              );
              setAnswerState('correct');
              await new Promise<void>((resolve) => {
                setTimeout(() => {
                  setAnswerState('');
                  resolve();
                }, 2000);
              });
              onGameEnd();
            }
          };
          checkAnswer();
        }
        setClickedCards([]);
        setClickable(true);
      }, 500);
    } else {
      setClickable(true);
    }
  }, [clickedCards]);

  const handleClick = (idx: number) => {
    setClickedCards((prev) => [...prev, idx]);
    mixedCards.forEach((card) => {
      if (card.idx === idx) {
        card.status = !card.status;
        return;
      }
    });
  };

  return (
    <Container $difficulty={difficulty}>
      {mixedCards.map((card) => (
        <FlipWrapper key={card.idx}>
          <Flip
            $status={card.status}
            $clickable={clickable}
            onClick={() => {
              !card.status ? handleClick(card.idx) : null;
            }}>
            <Card>
              <Front $status={card.status} $background={card.type} />
              <Back $status={card.status} />
            </Card>
          </Flip>
        </FlipWrapper>
      ))}
    </Container>
  );
}
