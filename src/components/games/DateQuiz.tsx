import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

const Desc = styled.p`
  font-size: 3.2rem;
  text-align: center;
  margin: 0 0 10rem 0;
  word-break: keep-all;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 2.4rem;
    margin: 0 0 2rem 0;
  }
  @media screen and (max-width: 767px) {
    font-size: 1.8rem;
    margin: 0 0 2rem 0;
  }
`;

const Days = styled.div`
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
  @media screen and (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const Form = styled.button`
  position: relative;
  padding: 0 0.6vw;
  width: calc(100% / 7);
  min-height: 9vw;
  text-align: center;
  border: 0.1rem solid #e4e3e6;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--main-color);
  color: white;
  margin: 1rem 0 0 0;
  font-size: 3rem;
  font-family: 'Pretendard-Medium';
  @media screen and (max-width: 768px) {
    font-size: 1.6rem;
    padding: 1.5rem 0;
  }
`;

const ShowAnswer = styled.div`
  font-size: 5rem;
  width: 50rem;
  height: 50rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--main-bg-color);
  border-radius: 1.3rem;
  box-shadow: 15px 13px 28px 0px rgba(0, 0, 0, 0.06);
  padding: 4rem;
  word-break: keep-all;
  text-align: center;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 2.4rem;
    width: 25rem;
    height: 25rem;
    padding: 2rem;
  }
  @media screen and (max-width: 767px) {
    font-size: 2rem;
    width: 20rem;
    height: 20rem;
    padding: 2rem;
  }
`;

export { Container, Desc, Days, Day, Wrapper, Form, ShowAnswer };
