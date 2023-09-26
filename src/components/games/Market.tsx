import { styled } from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin: 0 0 2rem 0;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    gap: 2rem;
    margin: 0 0 1rem 0;
  }
`;

const Item = styled.div`
  text-align: center;
`;

const Name = styled.div`
  font-size: 4rem;
  font-family: 'Pretendard-Bold';
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 2rem;
  }
  @media screen and (max-width: 767px) {
    font-size: 1.6rem;
  }
`;

const Price = styled.div`
  font-size: 3.4rem;
  font-family: 'Pretendard-Medium';
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 2.2rem;
  }
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
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 10rem;
    height: 10rem;
    font-size: 1.8rem;
    padding: 1rem;
  }
  @media screen and (max-width: 767px) {
    width: 11rem;
    height: 11rem;
    font-size: 1.6rem;
  }
`;

const Percent = styled.span`
  font-size: 4.5rem;
  font-family: 'Pretendard-Bold';
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 2.2rem;
  }
  @media screen and (max-width: 767px) {
    font-size: 2rem;
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
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 13rem;
    height: 10rem;
    font-size: 1.8rem;
    padding: 1rem;
  }
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
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 6rem;
    height: 6rem;
  }
  @media screen and (max-width: 767px) {
    width: 6rem;
    height: 6rem;
  }
`;

const Button = styled.button`
  padding: 3rem;
  margin: 1rem;
  font-size: 5rem;
  border-radius: 0.8rem;
  background: var(--button-bg-color);
  border: 0.2rem solid var(--gray-bg-color);
  color: white;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 1.8rem;
    padding: 1rem;
    margin: 0.5rem;
  }
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
