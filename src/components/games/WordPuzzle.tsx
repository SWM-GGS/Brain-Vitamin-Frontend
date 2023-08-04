import { styled } from 'styled-components';

const Container = styled.div`
  padding: 1.6rem;
  margin: 0 auto;
  font-size: 3rem;
`;

const Wrapper = styled.div`
  max-width: 150rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-evenly;
`;

const DropBoxWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const DropBox = styled.div`
  width: 10rem;
  height: 10rem;
  border: 0.1rem solid black;
  @media screen and (max-width: 767px) {
    width: 5rem;
    height: 5rem;
  }
`;

const Img = styled.img`
  width: 30rem;
  height: 30rem;
  @media screen and (max-width: 767px) {
    width: 10rem;
    height: 10rem;
  }
`;

export { Container, Wrapper, DropBoxWrapper, DropBox, Img };
