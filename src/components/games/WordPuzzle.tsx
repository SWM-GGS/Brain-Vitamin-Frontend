import { styled } from 'styled-components';

const Container = styled.div`
  padding: 1.6rem;
  margin: 0 auto;
  font-size: 3rem;
  height: 100%;
`;

const Wrapper = styled.div`
  max-width: 150rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 2rem;
  text-align: center;
`;

const DropBoxWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const DropBox = styled.div`
  width: 10rem;
  height: 10rem;
  border-radius: 8px;
  border: 0.2rem solid var(--main-color);
  @media screen and (max-width: 767px) {
    width: 3.5rem;
    height: 3.5rem;
  }
`;

const Img = styled.img`
  width: 30rem;
  height: 30rem;
  @media screen and (max-width: 767px) {
    width: 8rem;
    height: 8rem;
  }
`;

const Letter = styled.li`
  font-size: 4rem;
  font-family: 'Pretendard-Bold';
  @media screen and (max-width: 767px) {
    font-size: 2rem;
  }
`;

export { Container, Wrapper, DropBoxWrapper, DropBox, Img, Letter };
