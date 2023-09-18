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
const Button = styled.button<{ $isLong?: boolean; $isMedium?: boolean }>`
  padding: 3rem 4rem;
  font-size: 6rem;
  border-radius: 1rem;
  background-color: var(--button-bg-color);
  color: white;
  border: 0.2rem solid var(--gray-bg-color);
  ${(props) =>
    props.$isLong ? `min-width: 365px;` : `width: 130px; height: 130px;`}
  ${(props) => props.$isMedium && `width: 220px; height: 220px;`}
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 3rem;
    padding: 1.5rem 2rem;
    ${(props) =>
      props.$isLong ? `min-width: 230px;` : `width: 70px; height: 70px;`}
    ${(props) => props.$isMedium && `width: 130px; height: 130px;`}
  }
  @media screen and (max-width: 767px) {
    font-size: 2rem;
    padding: 1.5rem 2rem;
    ${(props) =>
      props.$isLong ? `min-width: 230px;` : `width: 60px; height: 60px;`}
    ${(props) => props.$isMedium && `width: 100px; height: 100px;`}
  }
`;
const PictureButton = styled(Button)<{ $imgUrl: string }>`
  background-image: url(${(props) => props.$imgUrl});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 0;
  border: 0.2rem solid var(--black-color);
`;

export { ButtonContainer, Button, PictureButton };
