import styled from 'styled-components';

const DAY = ['일', '월', '화', '수', '목', '금', '토'];

type HeadProps = {
  year: number;
  month: number;
  goToday: () => void;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
};

const Head = ({ year, month, goToday, setMonth }: HeadProps) => {
  return (
    <Form>
      <Nav>
        <Year>
          {year}년 {month}월
        </Year>
        <BtnBox>
          <Btn onClick={() => setMonth(month - 1)}>&lt;</Btn>
          <Btn width="3vw" onClick={() => goToday()}>
            오늘
          </Btn>
          <Btn onClick={() => setMonth(month + 1)}>&gt;</Btn>
        </BtnBox>
      </Nav>
      <Days>
        {DAY.map((item) => (
          <Day key={item}>{item}</Day>
        ))}
      </Days>
    </Form>
  );
};

const Form = styled.section`
  display: flex;
  flex-direction: column;
  width: 100vw;
  border: 2px solid #e4e3e6;
  border-radius: 2px;
`;

const Nav = styled.section`
  margin: 0.7vw;
`;

const Year = styled.div`
  font-size: 2rem;
  font-weight: 700;
`;

const BtnBox = styled.div``;

const Btn = styled.button<{ width?: string }>`
  border: 0.5px solid #e4e3e6;
  border-radius: 5px;
`;

const Days = styled.div`
  display: flex;
`;

const Day = styled.li`
  width: 100%;
  text-align: center;
  &:nth-child(7n + 1),
  &:nth-child(7n) {
    color: red;
  }
`;

export default Head;
