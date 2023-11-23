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
const SideContainer = styled.div`
  padding: 3rem 5rem;
  display: flex;
  gap: 2.8rem;
  justify-content: center;
  height: calc(var(--vh, 1vh) * 100);
  @media screen and (min-width: 768px) {
    align-items: center;
    flex-direction: column;
    width: 140rem;
  }
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 800px;
    padding: 1rem 3rem;
  }
  @media screen and (max-width: 767px) {
    flex-wrap: wrap;
    padding: 5rem 1.6rem;
    gap: 1rem;
    align-content: flex-start;
  }
`;

export { Container, WidthContainer, SideContainer };
