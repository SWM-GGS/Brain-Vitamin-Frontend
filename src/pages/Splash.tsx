import { styled } from 'styled-components';

function Splash() {
  return (
    <Container>
      <Logo alt="로고" src="/src/assets/images/logo.svg" />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Logo = styled.img`
  width: 50rem;
  height: 50rem;
  @media screen and (max-width: 767px) {
    width: 30rem;
    height: 30rem;
  }
`;

export default Splash;
