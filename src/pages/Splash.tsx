import { styled } from 'styled-components';
import Loading from '../components/common/Loading';

function Splash() {
  return (
    <Container>
      <LoadingWrapper>
        <Loading />
      </LoadingWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(var(--vh, 1vh) * 100);
`;

const LoadingWrapper = styled.div`
  width: 350px;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 250px;
  }
  @media screen and (max-width: 767px) {
    width: 150px;
  }
`;

export default Splash;
