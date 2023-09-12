import { styled } from 'styled-components';

const Container = styled.div`
  padding: 1.6rem;
  margin: 0 auto;
  height: 100%;
`;
const Text = styled.p`
  font-size: 3.2rem;
  text-align: center;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 2.4rem;
  }
  @media screen and (max-width: 767px) {
    font-size: 2rem;
  }
`;
const Num = styled.span`
  font-size: 6rem;
  padding: 1rem;
  font-family: Pretendard-Bold;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 5rem;
  }
  @media screen and (max-width: 767px) {
    font-size: 3rem;
  }
`;

export { Container, Text, Num };
