import styled from 'styled-components';

const Container = styled.div`
  padding: 1.6rem;
  margin: 0 auto;
  height: 100%;
  font-size: 6rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 5rem;
  }
  @media screen and (max-width: 767px) {
    font-size: 3rem;
  }
`;
const Expression = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  font-family: Pretendard-Bold;
  @media screen and (max-width: 767px) {
    gap: 2rem;
    flex-wrap: wrap;
  }
`;
const Box = styled.div`
  width: 150px;
  height: 150px;
  border: 0.4rem dashed var(--button-bg-color);
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 100px;
    height: 100px;
  }
  @media screen and (max-width: 767px) {
    width: 70px;
    height: 70px;
    border: 0.2rem dashed var(--button-bg-color);
  }
`;
const Quiz = styled.span`
  color: var(--button-bg-color);
`;
function Num({ $num }: { $num: number | null }) {
  if ($num) return <span>{$num}</span>;
  return (
    <Box>
      <Quiz>?</Quiz>
    </Box>
  );
}

export { Container, Expression, Num };
