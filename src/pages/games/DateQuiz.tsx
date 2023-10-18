import { useEffect, useState } from 'react';
import {
  Container,
  Desc,
  Days,
  Day,
  Wrapper,
  Form,
  ShowAnswer,
} from '../../components/games/DateQuiz';
import { GameProps } from '../../routes/gameRouter.tsx';
import { getMonthDate } from '../../modules/getMonthDate.ts';
import { useGameLogic } from '../../hooks/useGameLogic.ts';
import { AnswerFeedback } from '../../components/common/AnswerFeedback.tsx';

export default function DateQuiz({
  gameData,
  onGameEnd,
  saveGameResult,
  isNextButtonClicked,
  setAnswerState,
  answerState,
}: Readonly<GameProps>) {
  const DATE = new Date();
  const YEAR = DATE.getFullYear();
  const MONTH = DATE.getMonth() + 1;
  const TODAY = DATE.getDate();
  const [totalDate, setTotalDate] = useState<number[]>([]);
  const DAY = ['일', '월', '화', '수', '목', '금', '토'];

  useEffect(() => {
    setTotalDate(getMonthDate(YEAR, MONTH));
    setAnswer(TODAY);
  }, []);

  const { onClickButton, setAnswer, buttonRefs, showAnswer } =
    useGameLogic<number>(
      {
        gameData,
        onGameEnd,
        saveGameResult,
        isNextButtonClicked,
        setAnswerState,
        answerState,
      },
      false,
      true,
    );

  const getWeek = (date: Date) => {
    const currentDate = date.getDate();
    const firstDay = new Date(date.setDate(1)).getDay();

    return Math.ceil((currentDate + firstDay) / 7);
  };

  const week = getWeek(new Date());

  return (
    <Container>
      <Desc>
        {YEAR}년 {MONTH}월 달력을 보고 있습니다.
        <br />
        아래 달력에서 오늘의 날짜를 터치해주세요.
      </Desc>
      <Days>
        {DAY.map((item) => (
          <Day key={item}>{item}</Day>
        ))}
      </Days>
      <Wrapper>
        {totalDate.slice((week - 1) * 7, week * 7).map((date) => (
          <Form
            ref={(el) => (buttonRefs.current[buttonRefs.current.length] = el)}
            key={date}
            onClick={(e) => onClickButton(date, e.target as HTMLElement)}>
            {date}일
          </Form>
        ))}
      </Wrapper>
      {showAnswer && (
        <AnswerFeedback>
          <ShowAnswer>
            <p>오늘의 날짜는 [{TODAY}일]입니다.</p>
          </ShowAnswer>
        </AnswerFeedback>
      )}
    </Container>
  );
}
