import styled from 'styled-components';

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4rem;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    gap: 2rem;
  }
  @media screen and (max-width: 767px) {
    gap: 2rem;
  }
`;
const Button = styled.button<{ $isLong?: boolean }>`
  padding: 3rem 4rem;
  font-size: 6rem;
  border-radius: 1rem;
  background-color: var(--button-bg-color);
  color: white;
  border: 0.2rem solid var(--gray-bg-color);
  ${(props) =>
    props.$isLong ? `min-width: 365px;` : `width: 130px; height: 130px;`}
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 3rem;
    padding: 1.5rem 2rem;
    ${(props) =>
      props.$isLong ? `min-width: 230px;` : `width: 70px; height: 70px;`}
  }
  @media screen and (max-width: 767px) {
    font-size: 2rem;
    padding: 1.5rem 2rem;
    ${(props) =>
      props.$isLong ? `min-width: 230px;` : `width: 60px; height: 60px;`}
  }
`;

export { ButtonContainer, Button };
