import { styled } from 'styled-components';

const Container = styled.div`
  padding: 1.6rem;
  margin: 0 auto;
  height: 100%;
  font-size: 6rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 5rem;
    gap: 2rem;
  }
  @media screen and (max-width: 767px) {
    font-size: 3rem;
    padding: 1rem;
  }
`;
const Body = styled.div``;
const DayContainer = styled.div`
  display: flex;
  margin: 1rem 0 0 0;
`;
const Day = styled.div`
  width: 100%;
  text-align: center;
  &:nth-child(7n + 1),
  &:nth-child(7n) {
    color: red;
  }
  font-size: 3rem;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 2rem;
  }
  @media screen and (max-width: 768px) {
    font-size: 1.8rem;
  }
`;
const WeekDateContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
`;
const WeekDate = styled.span`
  position: relative;
  padding: 0 0.6vw;
  width: calc(100% / 7);
  min-height: 9vw;
  text-align: center;
  border: 0.1rem solid #e4e3e6;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0 0 0;
  font-size: 4rem;
  font-family: 'Pretendard-Medium';
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 3rem;
  }
  @media screen and (max-width: 768px) {
    font-size: 1.6rem;
    padding: 1.5rem 0;
  }
`;

export { Container, Body, DayContainer, Day, WeekDateContainer, WeekDate };
