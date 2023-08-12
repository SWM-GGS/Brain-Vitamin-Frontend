import { useNavigate } from 'react-router';
import { styled } from 'styled-components';

function LeftTapBar() {
  const path = window.location.pathname;
  const navigate = useNavigate();

  const onClickTap = (path: string) => {
    if (path === '/family' || path === '/myPage') {
      alert('해당 페이지는 향후 추가될 예정이에요.');
      return;
    }
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
            background: path === '/family' ? 'var(--main-bg-color)' : 'none',
            color: path === '/family' ? 'var(--main-color)' : '#433D3A',
          }}
          onClick={() => onClickTap('/family')}>
          가족 커뮤니티
        </Tap>
        <Tap
          style={{
            background: path === '/myPage' ? 'var(--main-bg-color)' : 'none',
            color: path === '/myPage' ? 'var(--main-color)' : '#433D3A',
          }}
          onClick={() => onClickTap('/myPage')}>
          마이페이지
        </Tap>
      </TapWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 27rem;
  height: 100vh;
  background: #fff;
  padding: 2.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const Logo = styled.img`
  width: 20rem;
  height: 20rem;
`;

const TapWrapper = styled.div`
  width: 100%;
  margin: 15rem 0 0 0;
`;

const Tap = styled.div`
  width: 100%;
  border-radius: 2.6rem;
  font-size: 2.2rem;
  padding: 2.6rem 2rem;
  margin: 0 0 3rem 0;
`;

export default LeftTapBar;
