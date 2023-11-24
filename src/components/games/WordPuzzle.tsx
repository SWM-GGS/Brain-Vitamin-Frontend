import { styled } from 'styled-components';

const Container = styled.div`
  margin: 0 auto;
  font-size: 3rem;
  height: 100%;
`;

const Wrapper = styled.div`
  max-width: 150rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-evenly;
  gap: 2rem;
  text-align: center;
  @media screen and (max-width: 767px) {
    justify-content: center;
  }
`;

const DropBoxWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  @media screen and (max-width: 767px) {
    flex-wrap: wrap;
  }
`;

const DropBox = styled.div`
  width: 10rem;
  height: 10rem;
  border-radius: 8px;
  border: 0.2rem solid var(--main-color);
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 5rem;
    height: 5rem;
  }
  @media screen and (max-width: 767px) {
    width: 4rem;
    height: 4rem;
  }
`;

const Img = styled.img`
  width: 30rem;
  height: 30rem;
  border-radius: 10px;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 13rem;
    height: 13rem;
  }
  @media screen and (max-width: 767px) {
    width: 7rem;
    height: 7rem;
  }
`;

const Letter = styled.li`
  font-size: 6rem;
  font-family: 'Pretendard-Bold';
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 3rem;
  }
  @media screen and (max-width: 767px) {
    font-size: 2.5rem;
  }
`;

export { Container, Wrapper, DropBoxWrapper, DropBox, Img, Letter };
