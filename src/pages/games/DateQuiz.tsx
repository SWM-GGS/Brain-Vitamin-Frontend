import { useEffect, useState } from 'react';
import { Container, Desc, Body } from '../../components/games/DateQuiz';
import { GameProps } from '../../routes/gameRouter.tsx';
import { getMonthDate } from '../../modules/getMonthDate.ts';

export default function DateQuiz({
  gameData,
  onGameEnd,
  saveGameResult,
  isNextButtonClicked,
  setAnswerState,
  answerState,
}: GameProps) {
  const DATE = new Date();
  const YEAR = DATE.getFullYear();
  const MONTH = DATE.getMonth() + 1;
  const TODAY = DATE.getDate();
  const [totalDate, setTotalDate] = useState<number[]>([]);

  useEffect(() => {
    setTotalDate(getMonthDate(YEAR, MONTH));
  }, []);

  return (
    <Container>
      <Desc>
        {YEAR}년 {MONTH}월 달력을 보고 있습니다.
        <br />
        아래 달력에서 오늘의 날짜를 터치해주세요.
      </Desc>
      <Body
        totalDate={totalDate}
        today={TODAY}
        gameData={gameData}
        onGameEnd={onGameEnd}
        saveGameResult={saveGameResult}
        isNextButtonClicked={isNextButtonClicked}
        setAnswerState={setAnswerState}
        answerState={answerState}
      />
    </Container>
  );
}
