import { styled } from 'styled-components';

const Button = styled.button`
  width: 35.8rem;
  height: 5.2rem;
  background: var(--main-color);
  border-radius: 1.1rem;
  font-family: 'Pretendard-Bold';
  font-size: 1.6rem;
  color: white;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
  &:disabled {
    background: #c6c6c6;
  }
`;

export default Button;
