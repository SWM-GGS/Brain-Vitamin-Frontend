import { styled } from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin: 0 0 2rem 0;
`;

const Cupon = styled.div`
  width: 20rem;
  height: 20rem;
  background: bisque;
  font-size: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  @media screen and (max-width: 767px) {
    width: 10rem;
    height: 10rem;
    font-size: 2rem;
  }
`;

const Item = styled.div`
  text-align: center;
`;

const Name = styled.div`
  font-size: 4rem;
  font-family: 'Pretendard-Bold';
  @media screen and (max-width: 767px) {
    font-size: 2rem;
  }
`;

const Price = styled.div`
  font-size: 3.4rem;
  font-family: 'Pretendard-Medium';
  @media screen and (max-width: 767px) {
    font-size: 1.8rem;
  }
`;

const Memo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20rem;
  height: 20rem;
  background: lemonchiffon;
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
  width: 20rem;
  height: 20rem;
  @media screen and (max-width: 767px) {
    width: 8rem;
    height: 8rem;
  }
`;

const Button = styled.button`
  padding: 3rem;
  margin: 1rem;
  font-size: 5rem;
  border-radius: 0.8rem;
  background: #c6c6c6;
  @media screen and (max-width: 767px) {
    font-size: 2rem;
    padding: 1.5rem;
  }
`;

export { Wrapper, Cupon, Item, Name, Price, Memo, Container, Img, Button };
