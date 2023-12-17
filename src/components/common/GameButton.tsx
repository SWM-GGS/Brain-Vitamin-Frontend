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
    gap: 1rem;
  }
`;
const Button = styled.button<{
  $isLong?: boolean;
  $isMedium?: boolean;
  $isSmall?: boolean;
  $isLongMobileSmall?: boolean;
  $isML?: boolean;
  $isVitamin?: boolean;
}>`
  padding: 3rem 4rem;
  font-size: 6rem;
  border-radius: 1rem;
  background-color: var(--main-color);
  color: white;
  border: 0.2rem solid var(--gray-bg-color);
  ${(props) => props.$isLong && `min-width: 365px;`}
  ${(props) => props.$isML && `min-width: 200px; padding: 2rem 1rem;`}
  ${(props) => props.$isMedium && `width: 220px; height: 220px;`}
  ${(props) => props.$isSmall && `width: 130px; height: 130px;`}
  ${(props) => props.$isLongMobileSmall && `min-width: 365px;`}
  ${(props) =>
    props.$isVitamin &&
    `min-width: 365px; max-width: 550px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`}
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 2.6rem;
    padding: 1.5rem 2rem;
    ${(props) => props.$isLong && `min-width: 230px;`}
    ${(props) => props.$isML && `min-width: 105px; padding: 1rem 1rem;`}
    ${(props) => props.$isMedium && `width: 130px; height: 130px;`}
    ${(props) => props.$isSmall && `width: 70px; height: 70px;`}
    ${(props) => props.$isLongMobileSmall && `min-width: 180px;`}
    ${(props) =>
      props.$isVitamin &&
      `min-width: 180px; max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`}
  }
  @media screen and (max-width: 767px) {
    font-size: 2rem;
    padding: 1.5rem 2rem;
    ${(props) => props.$isLong && `min-width: 230px;`}
    ${(props) => props.$isML && `min-width: 100px; padding: 1rem 1rem;`}
    ${(props) => props.$isMedium && `width: 100px; height: 100px;`}
    ${(props) => props.$isSmall && `width: 60px; height: 60px;`}
    ${(props) => props.$isLongMobileSmall && `min-width: 130px;`}
    ${(props) =>
      props.$isVitamin &&
      `min-width: 130px; max-width: 140px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`}
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
