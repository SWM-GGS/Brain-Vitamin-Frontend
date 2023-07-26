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
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  margin: 1rem 0;
`;

const Img = styled.img`
  width: 30rem;
  height: 30rem;
  margin: 0 2rem 0 0;
`;

const Button = styled.button`
  padding: 4rem;
  margin: 1rem;
`;

export { Memo, Container, Img, Button };
