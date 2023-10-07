import { styled } from 'styled-components';

const Label = styled.p`
  font-size: 3.2rem;
  font-family: 'Pretendard-Bold';
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 2.6rem;
  }
  @media screen and (max-width: 767px) {
    font-size: 2rem;
  }
`;

export default Label;
