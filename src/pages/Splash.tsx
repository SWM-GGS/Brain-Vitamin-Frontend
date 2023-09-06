import { styled } from 'styled-components';

function Splash() {
  return (
    <Container>
      <Logo alt="로고" src="/assets/images/logo.svg" />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Logo = styled.img`
  width: 40rem;
  height: 40rem;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 25rem;
    height: 25rem;
  }
  @media screen and (max-width: 767px) {
    width: 20rem;
    height: 20rem;
  }
`;

export default Splash;
