import { styled } from 'styled-components';

const NumContainer = styled.div`
  position: relative;
  width: 30rem;
  height: 40rem;
  margin: 0 auto;
  @media screen and (max-width: 767px) {
    height: 15rem;
  }
`;

const Num = styled.span<{ $top: number; $left: number }>`
  position: absolute;
  top: ${(props) => props.$top}%;
  left: ${(props) => props.$left}%;
  transform: translate(-50%, -50%);
  font-size: 30rem;
  @media screen and (max-width: 767px) {
    font-size: 15rem;
  }
`;

const NumBtn = styled.button`
  padding: 3rem;
  margin: 1rem;
  font-size: 10rem;
  @media screen and (max-width: 767px) {
    font-size: 2rem;
  }
`;

export { NumContainer, Num, NumBtn };
