import { styled } from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin: 0 0 2rem 0;
`;

const Item = styled.div`
  text-align: center;
`;

const Name = styled.div`
  font-size: 4rem;
  font-family: 'Pretendard-Bold';
  @media screen and (max-width: 767px) {
    font-size: 1.6rem;
  }
`;

const Price = styled.div`
  font-size: 3.4rem;
  font-family: 'Pretendard-Medium';
  @media screen and (max-width: 767px) {
    font-size: 1.8rem;
  }
`;

const Coupon = styled.div`
  width: 22rem;
  height: 22rem;
  background: bisque;
  font-size: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1rem;
  word-break: keep-all;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 767px) {
    width: 11rem;
    height: 11rem;
    font-size: 1.6rem;
  }
`;

const Percent = styled.span`
  font-size: 4.5rem;
  font-family: 'Pretendard-Bold';
  @media screen and (max-width: 767px) {
    font-size: 2rem;
    font-family: 'Pretendard-Bold';
  }
`;

const Memo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 22rem;
  height: 22rem;
  background: lemonchiffon;
  font-size: 3.5rem;
  padding: 1rem;
  word-break: keep-all;
  @media screen and (max-width: 767px) {
    width: 11rem;
    height: 11rem;
    font-size: 1.6rem;
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
    width: 7rem;
    height: 7rem;
  }
`;

const Button = styled.button`
  padding: 3rem;
  margin: 1rem;
  font-size: 5rem;
  border-radius: 0.8rem;
  background: #c6c6c6;
  border: 0.2rem solid var(--gray-bg-color);
  @media screen and (max-width: 767px) {
    font-size: 1.6rem;
    padding: 1rem;
    margin: 0.5rem;
  }
`;

export {
  Wrapper,
  Coupon,
  Percent,
  Item,
  Name,
  Price,
  Memo,
  Container,
  Img,
  Button,
};
