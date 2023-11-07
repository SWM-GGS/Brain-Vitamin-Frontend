import styled from 'styled-components';

const Container = styled.div<{ $difficulty: number }>`
  display: grid;
  grid-gap: 2rem;
  height: 100%;
  place-items: center;
  ${(props) => {
    if (props.$difficulty === 1) {
      return `
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  max-width: 100rem;
  margin: 0 auto;`;
    }
    if (props.$difficulty === 2) {
      return `
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  max-width: 140rem;
  margin: 0 auto;`;
    }
    if (props.$difficulty === 3) {
      return `
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(2, 1fr);
  @media screen and (max-width: 767px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }`;
    }
  }}
`;

const Card = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transition: all 0.2s ease-in;
  transform-style: preserve-3d;
`;

const FlipWrapper = styled.div<{ $difficulty: number }>`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: ${(props) => (props.$difficulty === 3 ? '150%' : '100%')};
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    ${(props) => {
      if (props.$difficulty === 1) {
        return `padding-bottom: 50%;`;
      }
      if (props.$difficulty === 2) {
        return `padding-bottom: 70%;`;
      }
      if (props.$difficulty === 3) {
        return `padding-bottom: 120%;`;
      }
    }}
  }
  @media screen and (max-width: 767px) {
    padding-bottom: 150%;
  }
`;

const Flip = styled.div<{ $status: boolean; $clickable: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  perspective: 110rem;
  &:active ${Card} {
    transform: rotateY(180deg);
  }
  pointer-events: ${(props) =>
    props.$status || !props.$clickable ? 'none' : 'auto'};
  cursor: pointer;
`;

const Front = styled.div<{ $status: boolean; $background: string }>`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background: url(${(props) => props.$background});
  background-size: cover;
  background-position: center;
  transform: ${(props) =>
    props.$status ? 'rotateY(0deg)' : 'rotateY(180deg)'};
  border-radius: 1.5rem;
  box-shadow: 0 0.4rem 1.8rem 0 rgba(0, 0, 0, 0.3);
  @media screen and (max-width: 767px) {
    border-radius: 0.5rem;
  }
`;

const Back = styled.div<{ $status: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background: royalblue;
  transform: ${(props) =>
    props.$status ? 'rotateY(180deg)' : 'rotateY(0deg)'};
  border-radius: 1.5rem;
  box-shadow: 0 0.4rem 1.8rem 0 rgba(0, 0, 0, 0.3);
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20rem;
    height: 20rem;
    background-image: url('/assets/images/logo.svg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.8;
    @media screen and (min-width: 768px) and (max-height: 1079px) {
      width: 7rem;
      height: 7rem;
    }
    @media screen and (max-width: 767px) {
      width: 5rem;
      height: 5rem;
    }
  }
  @media screen and (max-width: 767px) {
    border-radius: 0.5rem;
  }
`;

const RestartBtn = styled.button`
  font-size: 4rem;
  padding: 2rem;
  margin: 2rem 0 0 0;
`;

export { Container, Card, FlipWrapper, Flip, Front, Back, RestartBtn };
