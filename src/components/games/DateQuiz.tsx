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
      alert('틀렸습니다 ㅜ.ㅜ');
    }
  };

  const getWeek = (date: Date) => {
    const currentDate = date.getDate();
    const firstDay = new Date(date.setDate(1)).getDay();

    return Math.ceil((currentDate + firstDay) / 7);
  };

  const week = getWeek(new Date());
  const quizDate = Math.floor(Math.random() * (30 - 1) + 1);

  const checkAnswer = (index: number) => {
    if (totalDate.indexOf(quizDate, lastDate) % 7 === index) {
      alert('정답입니다!');
    } else {
      alert('틀렸습니다 ㅜ.ㅜ');
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
        {totalDate.slice((week - 1) * 7, week * 7).map((date, idx) => (
          <Form key={idx} onClick={() => checkToday(date)}>
            <DateNum $idx={idx} $lastdate={lastDate} $firstdate={firstDate}>
              <span>{date}일</span>
            </DateNum>
          </Form>
        ))}
      </Container>
      <h1>
        {new Date().getMonth() + 1}월 {quizDate}
        일은 무슨 요일일까요?
      </h1>
      {DAY.map((item, index) => (
        <Button key={index} onClick={() => checkAnswer(index)}>
          {item}
        </Button>
      ))}
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
  display: flex;
  justify-content: center;
  align-items: center;
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

const Button = styled.button`
  padding: 1rem;
  margin: 2rem;
  font-size: 5rem;
`;

export default Body;
