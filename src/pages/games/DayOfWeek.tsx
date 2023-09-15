import { useEffect, useState } from 'react';
import { GameProps } from '../../routes/gameRouter.tsx';
import GameQuestion from '../../components/common/GameQuestion.tsx';
import {
  Button,
  ButtonContainer,
} from '../../components/common/GameButton.tsx';
import { useGameLogic } from '../../hooks/useGameLogic.ts';
import {
  Container,
  Body,
  WeekDate,
  WeekDateContainer,
  Day,
  DayContainer,
} from '../../components/games/DayOfWeek.tsx';
import { getRandomFloat } from '../../utils/random.ts';

function DayOfWeek({
  gameData,
  onGameEnd,
  saveGameResult,
  isNextButtonClicked,
  setAnswerState,
  answerState,
}: GameProps) {
  const difficulty = gameData.difficulty;
  const DATE = new Date();
  const YEAR = DATE.getFullYear();
  const MONTH = DATE.getMonth() + 1;
  const DAY = ['일', '월', '화', '수', '목', '금', '토'];
  const [quizDate, setQuizDate] = useState(0);
  const [totalDate, setTotalDate] = useState<number[]>([]);
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
    false,
    true,
  );

  const getWeek = (date: Date) => {
    const currentDate = date.getDate();
    const firstDay = new Date(date.setDate(1)).getDay();

    return Math.ceil((currentDate + firstDay) / 7);
  };

  const currentWeek = getWeek(DATE);

  const changeDate = (year: number, month: number) => {
    // 이전 날짜
    const PVLastDate = new Date(year, month - 1, 0).getDate();
    const PVLastDay = new Date(year, month - 1, 0).getDay();

    // 다음 날짜
    const ThisLasyDay = new Date(year, month, 0).getDay();
    const ThisLasyDate = new Date(year, month, 0).getDate();

    // 이전 날짜 만들기
    let PVLD = [];
    if (PVLastDay !== 6) {
      for (let i = 0; i < PVLastDay + 1; i++) {
        PVLD.unshift(PVLastDate - i);
      }
    }

    // 다음 날짜 만들기
    let TLD = [];
    for (let i = 1; i < 7 - ThisLasyDay; i++) {
      if (i === 0) {
        return TLD;
      }
      TLD.push(i);
    }

    // 현재날짜
    let TD = [];
    TD = [...Array(ThisLasyDate + 1).keys()].slice(1);
    return PVLD.concat(TD, TLD);
  };

  const splitArrayIntoChunks = (arr: number[], chunkSize: number) => {
    const chunks = [];

    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const generateRandomDate = (totalDate: number[]) => {
    const weekChunks = splitArrayIntoChunks(totalDate, 7);
    let selectedWeek: number[] = [];

    switch (difficulty) {
      case 1:
        selectedWeek = [currentWeek - 1, currentWeek + 1];
        break;
      case 2:
        selectedWeek = [currentWeek - 2, currentWeek + 2];
        break;
      case 3:
        selectedWeek = [
          currentWeek - 2,
          currentWeek + 2,
          currentWeek - 3,
          currentWeek + 3,
        ];
    }
    selectedWeek = selectedWeek.map((week) => week - 1);

    const isOut = (week: number) => {
      return week < 0 || week >= weekChunks.length;
    };

    const isInCurrentMonth = (week: number) => {
      return !weekChunks[week].includes(1) || weekChunks[week][0] === 1;
    };

    selectedWeek = selectedWeek.filter(
      (week) => !isOut(week) && isInCurrentMonth(week),
    );

    const candidateDates: number[] = [];

    selectedWeek.forEach((week) => {
      weekChunks[week].forEach((date) => {
        candidateDates.push(date);
      });
    });

    const getRandomIndex = (num: number) => {
      return Math.floor(getRandomFloat() * num);
    };

    const randomDate =
      candidateDates[getRandomIndex(candidateDates.length - 1)];
    const selectedDate = new Date(YEAR, MONTH - 1, randomDate);
    const randomDay = selectedDate.getDay();
    const daysOfWeek = [
      '일요일',
      '월요일',
      '화요일',
      '수요일',
      '목요일',
      '금요일',
      '토요일',
    ];
    const selectedDay = daysOfWeek[randomDay];
    let newDaysOfWeek = daysOfWeek.filter((_, i) => i !== randomDay);
    const randomIndex1 = getRandomIndex(newDaysOfWeek.length - 1);
    const candidate1 = newDaysOfWeek[randomIndex1];
    newDaysOfWeek = newDaysOfWeek.filter((_, i) => i !== randomIndex1);
    const randomIndex2 = getRandomIndex(newDaysOfWeek.length - 1);
    const candidate2 = newDaysOfWeek[randomIndex2];

    setAnswer(selectedDay);
    setQuizDate(selectedDate.getDate());
    setCandidates(
      [selectedDay, candidate1, candidate2].sort(() => getRandomFloat() - 0.5),
    );
  };

  useEffect(() => {
    const totalDate = changeDate(YEAR, MONTH);
    setTotalDate(totalDate);
    generateRandomDate(totalDate);
  }, []);

  return (
    <Container>
      <GameQuestion text={`아래 달력에서 ${quizDate}일은 무슨 요일일까요?`} />
      <Body>
        <DayContainer>
          {DAY.map((item) => (
            <Day key={item}>{item}</Day>
          ))}
        </DayContainer>
        <WeekDateContainer>
          {totalDate
            .slice((currentWeek - 1) * 7, currentWeek * 7)
            .map((date) => (
              <WeekDate key={date}>{date}일</WeekDate>
            ))}
        </WeekDateContainer>
      </Body>
      <ButtonContainer>
        {candidates.map((v) => (
          <Button
            key={v}
            ref={(el) => (buttonRefs.current[buttonRefs.current.length] = el)}
            onClick={(e) => onClickButton(v, e.target as HTMLButtonElement)}>
            {v}
          </Button>
        ))}
      </ButtonContainer>
    </Container>
  );
}

export default DayOfWeek;
