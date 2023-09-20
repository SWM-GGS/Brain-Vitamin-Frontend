import styled from 'styled-components';

const Board = styled.div<{ $difficulty: number }>`
  display: grid;
  grid-gap: 2rem;
  place-items: center;
  margin: 0 auto;
  ${(props) => {
    if (props.$difficulty === 1) {
      return `
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  @media screen and (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }`;
    }
    if (props.$difficulty === 2) {
      return `
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  @media screen and (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, 1fr);
  }`;
    }
    if (props.$difficulty === 3) {
      return `
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
  @media screen and (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(5, 1fr);
  }`;
    }
  }}
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    grid-gap: 1.5rem;
  }
  @media screen and (max-width: 767px) {
    grid-gap: 1rem;
  }
`;
const FlagImage = styled.img`
  width: 400px;
  border: 0.2rem solid var(--black-color);
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 150px;
  }
  @media screen and (max-width: 767px) {
    width: 130px;
  }
`;

export { Board, FlagImage };
