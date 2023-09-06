import { keyframes, styled } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const AnswerFeedback = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Correct = styled.div`
  width: 50rem;
  height: 50rem;
  border: 5rem solid var(--main-color);
  border-radius: 50%;
  animation: ${fadeIn} 0.5s ease-in-out;
  box-shadow: 0 0.4rem 1.8rem 0 rgba(0, 0, 0, 0.3);
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 25rem;
    height: 25rem;
    border: 3rem solid var(--main-color);
  }
  @media screen and (max-width: 767px) {
    width: 20rem;
    height: 20rem;
    border: 2rem solid var(--main-color);
  }
`;

const Incorrect = styled.div`
  width: 50rem;
  height: 50rem;
  animation: ${fadeIn} 0.5s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  &::before {
    content: '✕';
    font-size: 60rem;
    color: var(--main-color);
    text-shadow: 0 0.4rem 1.8rem rgba(0, 0, 0, 0.3);
    @media screen and (min-width: 768px) and (max-height: 1079px) {
      font-size: 40rem;
    }
    @media screen and (max-width: 767px) {
      font-size: 28rem;
    }
  }
`;

export { AnswerFeedback, Correct, Incorrect };
