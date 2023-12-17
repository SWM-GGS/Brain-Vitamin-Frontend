import { useNavigate } from 'react-router';
import { styled } from 'styled-components';

function LeftTapBar() {
  const path = window.location.pathname;
  const navigate = useNavigate();

  const onClickTap = (path: string) => {
    navigate(path);
  };

  return (
    <Container>
      <Logo alt="로고" src="/assets/images/logo.svg" />
      <TapWrapper>
        <Tap
          style={{
            background: path === '/home' ? 'var(--main-bg-color)' : 'none',
            color: path === '/home' ? 'var(--main-color)' : '#433D3A',
          }}
          onClick={() => onClickTap('/home')}>
          홈
        </Tap>
        <Tap
          style={{
            background: path === '/vitamin' ? 'var(--main-bg-color)' : 'none',
            color: path === '/vitamin' ? 'var(--main-color)' : '#433D3A',
          }}
          onClick={() => onClickTap('/vitamin')}>
          우리 가족 이야기
        </Tap>
        <Tap
          style={{
            background: path === '/myPage' ? 'var(--main-bg-color)' : 'none',
            color: path === '/myPage' ? 'var(--main-color)' : '#433D3A',
          }}
          onClick={() => onClickTap('/myPage')}>
          내 활동 보기
        </Tap>
      </TapWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 350px;
  height: calc(var(--vh, 1vh) * 100);
  background: #fff;
  padding: 4rem 2.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 250px;
  }
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const Logo = styled.img`
  width: 20rem;
  height: 20rem;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 15rem;
    height: 15rem;
  }
`;

const TapWrapper = styled.div`
  width: 100%;
  margin: 15rem 0 0 0;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    margin: 2rem 0 0 0;
  }
`;

const Tap = styled.div`
  width: 100%;
  border-radius: 2.6rem;
  font-size: 2.2rem;
  word-break: keep-all;
  padding: 2.6rem 2rem;
  margin: 0 0 3rem 0;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 1.7rem;
    padding: 2rem;
    margin: 0 0 2rem 0;
  }
`;

export default LeftTapBar;
