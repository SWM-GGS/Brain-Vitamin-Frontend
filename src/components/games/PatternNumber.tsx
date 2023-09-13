import { styled } from 'styled-components';

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
const NumberContainer = styled.div`
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

export { Container, NumberContainer };
