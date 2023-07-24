import { styled } from 'styled-components';

const Num = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 30rem;
`;

const NumBtn = styled.button`
  padding: 3rem;
  margin: 1rem;
  font-size: 4rem;
`;

export { Num, NumBtn };
