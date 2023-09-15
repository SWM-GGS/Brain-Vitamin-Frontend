import { useState, useEffect } from 'react';
import Head from '../components/calendar/Head';
import Body from '../components/calendar/Body';
import { getMonthDate } from '../modules/getMonthDate';

const Calendar = () => {
  const DATE = new Date();
  const YEAR = DATE.getFullYear();
  const MONTH = DATE.getMonth() + 1;
  const TODAY = DATE.getDate();

  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [totalDate, setTotalDate] = useState<number[]>([]);

  useEffect(() => {
    setTotalDate(getMonthDate(YEAR, 7));
  }, []);

  useEffect(() => {
    setTotalDate(getMonthDate(YEAR, month));
  }, [month]);

  const [today, setToday] = useState(0);

  const goToday = () => {
    setYear(YEAR);
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
