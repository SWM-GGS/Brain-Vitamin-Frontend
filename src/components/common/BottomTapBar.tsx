import { useNavigate } from 'react-router';
import { styled } from 'styled-components';

function BottomTapBar() {
  const path = window.location.pathname;
  const navigate = useNavigate();

  const onClickTap = () => {
    navigate(path);
  };

  return (
    <Container>
      <Tap
        style={{
          background: path === '/home' ? 'var(--main-bg-color)' : 'none',
          color: path === '/home' ? 'var(--main-color)' : '#433D3A',
        }}
        onClick={onClickTap}>
        홈
      </Tap>
      <Tap
        style={{
          background: path === '/family' ? 'var(--main-bg-color)' : 'none',
          color: path === '/family' ? 'var(--main-color)' : '#433D3A',
        }}
        onClick={onClickTap}>
        가족
      </Tap>
      <Tap
        style={{
          background: path === '/myPage' ? 'var(--main-bg-color)' : 'none',
          color: path === '/myPage' ? 'var(--main-color)' : '#433D3A',
        }}
        onClick={onClickTap}>
        My
      </Tap>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 7rem;
  background: #fff;
  padding: 1.6rem;
  display: flex;
  justify-content: space-between;
  align-self: flex-end;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const Tap = styled.div`
  border-radius: 2.6rem;
  font-size: 1.6rem;
  padding: 1rem 3rem;
`;

export default BottomTapBar;
