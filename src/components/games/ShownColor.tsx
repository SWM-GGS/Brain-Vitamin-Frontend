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
const Letter = styled.span<{ $color: string }>`
  color: ${(props) => props.$color};
  font-size: 7rem;
  text-align: center;
  font-family: Pretendard-Bold;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 5.5rem;
  }
  @media screen and (max-width: 767px) {
    font-size: 3.5rem;
  }
`;

export { Container, Letter };
