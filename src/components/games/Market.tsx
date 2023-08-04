import { styled } from 'styled-components';

const Memo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20rem;
  height: 20rem;
  background: lemonchiffon;
  margin: 0 auto;
  font-size: 4rem;
  @media screen and (max-width: 767px) {
    width: 10rem;
    height: 10rem;
    font-size: 2rem;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 3rem;
  margin: 1rem 0;
  flex-wrap: wrap;
`;

const Img = styled.img`
  width: 30rem;
  height: 30rem;
  margin: 0 2rem 0 0;
  @media screen and (max-width: 767px) {
    width: 10rem;
    height: 10rem;
  }
`;

const Button = styled.button`
  padding: 4rem;
  margin: 1rem;
  font-size: 5rem;
  @media screen and (max-width: 767px) {
    font-size: 2rem;
  }
`;

export { Memo, Container, Img, Button };
