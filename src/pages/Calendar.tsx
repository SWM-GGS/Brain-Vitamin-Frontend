import { useState, useEffect } from 'react';
import Head from '../components/calendar/Head';
import Body from '../components/calendar/Body';

const Calendar = () => {
  const DATE = new Date();
  const YEAR = DATE.getFullYear();
  const MONTH = DATE.getMonth() + 1;
  const TODAY = DATE.getDate();

  const [year, setYear] = useState(YEAR);
  const [month, setMonth] = useState(MONTH);
  const [totalDate, setTotalDate] = useState<number[]>([]);

  const changeDate = (month: number) => {
    // 이전 날짜
    const PVLastDate = new Date(YEAR, month - 1, 0).getDate();
    const PVLastDay = new Date(YEAR, month - 1, 0).getDay();

    // 다음 날짜
    const ThisLasyDay = new Date(YEAR, month, 0).getDay();
    const ThisLasyDate = new Date(YEAR, month, 0).getDate();

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

  useEffect(() => {
    setTotalDate(changeDate(7));
  }, []);

  useEffect(() => {
    setTotalDate(changeDate(month));
  }, [month]);

  const [today, setToday] = useState(0);

  const goToday = () => {
    setMonth(MONTH);
    setToday(TODAY);
  };

  return (
    <>
      <Head year={year} month={month} setMonth={setMonth} goToday={goToday} />
      <Body totalDate={totalDate} today={today} month={month} year={year} />
    </>
  );
};

export default Calendar;
