import styled from 'styled-components';
import Dates from './Dates';

type BodyProps = {
  totalDate: number[];
  today: number;
  month: number;
  year: number;
};

const Body = ({ totalDate, today, month, year }: BodyProps) => {
  const lastDate = totalDate.indexOf(1);
  const firstDate = totalDate.indexOf(1, 7);

  // today
  const findToday = totalDate.indexOf(today);
  const getMonth = new Date().getMonth() + 1;

  return (
    <Form>
      {totalDate.map((elm, idx) => (
        <Dates
          key={elm}
          idx={idx}
          lastdate={lastDate}
          firstdate={firstDate}
          elm={elm}
          $findToday={findToday === idx && month === getMonth && findToday}
          month={month}
          year={year}
        />
      ))}
    </Form>
  );
};

const Form = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

export default Body;
