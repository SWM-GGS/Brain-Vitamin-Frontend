import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.6rem;
  height: calc(var(--vh, 1vh) * 100);
`;

const WidthContainer = styled.div`
  max-width: 192rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.6rem;
  height: calc(var(--vh, 1vh) * 100);
`;

export { Container, WidthContainer };
