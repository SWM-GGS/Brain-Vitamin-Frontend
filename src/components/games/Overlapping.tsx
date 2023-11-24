import { styled } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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

const NumWrapper = styled.div`
  position: relative;
  width: 30rem;
  height: 40rem;
  margin: 0 auto;
  @media screen and (max-width: 767px) {
    height: 12rem;
    width: 100%;
  }
`;

const Num = styled.span<{ $top: number; $left: number }>`
  position: absolute;
  top: ${(props) => props.$top}%;
  left: ${(props) => props.$left}%;
  transform: translate(-50%, -50%);
  font-size: 30rem;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 15rem;
  }
  @media screen and (max-width: 767px) {
    font-size: 10rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const NumBtn = styled.button`
  padding: 3rem;
  margin: 0.5rem;
  font-size: 5rem;
  border-radius: 0.8rem;
  background: var(--main-color);
  border: 0.2rem solid var(--gray-bg-color);
  color: white;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 2.2rem;
    padding: 1.7rem;
  }
  @media screen and (max-width: 767px) {
    font-size: 2rem;
    padding: 1.5rem;
  }
`;

export { Container, Text, NumWrapper, Num, ButtonWrapper, NumBtn };
