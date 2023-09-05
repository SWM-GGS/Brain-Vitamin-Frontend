import { useNavigate } from 'react-router';
import { styled } from 'styled-components';

function BottomTapBar() {
  const path = window.location.pathname;
  const navigate = useNavigate();

  const onClickTap = (path: string) => {
    navigate(path);
  };

  return (
    <Container>
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
        가족
      </Tap>
      <Tap
        style={{
          background: path === '/myPage' ? 'var(--main-bg-color)' : 'none',
          color: path === '/myPage' ? 'var(--main-color)' : '#433D3A',
        }}
        onClick={() => onClickTap('/myPage')}>
        My
      </Tap>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 6rem;
  background: #fff;
  padding: 1rem 1.6rem;
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  box-shadow: 0 -2px 15px 4px rgba(0, 0, 0, 0.1);
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const Tap = styled.div`
  border-radius: 2.6rem;
  font-size: 1.6rem;
  padding: 1rem 3rem;
  font-family: 'Pretendard-Medium';
`;

export default BottomTapBar;
