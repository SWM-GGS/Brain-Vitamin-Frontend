import styled from 'styled-components';

const DAY = ['일', '월', '화', '수', '목', '금', '토'];

type BodyProps = {
  totalDate: number[];
  today: number;
};

const Body = ({ totalDate, today }: BodyProps) => {
  const lastDate = totalDate.indexOf(1);
  const firstDate = totalDate.indexOf(1, 7);

  const checkToday = (date: number) => {
    if (date === today) {
      alert(`정답입니다! 오늘은 ${today}일입니다.`);
    } else {
      console.log('다시 터치해주세요');
    }
  };

  return (
    <>
      <Days>
        {DAY.map((item, index) => (
          <Day key={index}>{item}</Day>
        ))}
      </Days>
      <Container>
        {totalDate.map((date, idx) => (
          <Form key={idx} onClick={() => checkToday(date)}>
            <DateNum $idx={idx} $lastdate={lastDate} $firstdate={firstDate}>
              <span>{date}일</span>
            </DateNum>
          </Form>
        ))}
      </Container>
    </>
  );
};

const Days = styled.div`
  display: flex;
  margin: 1rem 0 0 0;
`;

const Day = styled.li`
  width: 100%;
  text-align: center;
  &:nth-child(7n + 1),
  &:nth-child(7n) {
    color: red;
  }
`;

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const Form = styled.li`
  position: relative;
  padding: 0 0.6vw;
  width: calc(100% / 7);
  min-height: 9vw;
  text-align: center;
  border-bottom: 1px solid #e4e3e6;
  border-left: 1px solid #e4e3e6;
  &:nth-child(7n + 1),
  &:nth-child(7n) {
    color: red;
    // background-color: #f5f5f5;
  }
`;

const DateNum = styled.div<{
  $idx: number;
  $firstdate: number;
  $lastdate: number;
}>`
  margin: 1rem 0 0 0;
  color: ${(props) =>
    props.$idx < props.$lastdate ||
    (props.$firstdate > 0 && props.$idx > props.$firstdate - 1)
      ? '#969696'
      : null};
`;

export default Body;
