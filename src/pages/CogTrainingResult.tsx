import { useLocation, useNavigate } from 'react-router';
import { styled } from 'styled-components';
import Button from '../components/common/Button';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import Header from '../components/common/Header';

function CogTrainingResult() {
  const { state } = useLocation();
  const { totalScore, result } = state;
  const navigate = useNavigate();
  const nickname = useSelector((state: RootState) => state.user.nickname);

  const toHome = () => {
    navigate('/home');
  };

  return (
    <Container>
      <Header label="결과보기" />
      <Wrapper>
        <Box>
          <MyWrapper>
            <ProfileImage alt="" src="/assets/images/profile-default.svg" />
            <Name>{nickname}</Name>
            <Score>{totalScore}점</Score>
            <Result>{result}</Result>
          </MyWrapper>
        </Box>
        <ButtonWrapper>
          <Button onClick={toHome}>홈으로 돌아가기</Button>
        </ButtonWrapper>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  padding: 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Wrapper = styled.div``;

const Box = styled.div`
  width: 146.3rem;
  height: 75rem;
  border-radius: 1.6rem;
  background: #fff;
  box-shadow: 1.5rem 1.3rem 2.8rem 0 rgba(0, 0, 0, 0.06);
  padding: 3rem;
  margin: 2.55rem 0;
  @media screen and (max-width: 767px) {
    width: 30rem;
    height: 50rem;
    padding: 1.6rem;
    margin: 2rem 0;
  }
`;

const MyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: center;
`;

const ProfileImage = styled.img`
  width: 20rem;
  height: 20rem;
  @media screen and (max-width: 767px) {
    width: 10rem;
    height: 10rem;
  }
`;

const Name = styled.span`
  font-family: 'Pretendard-Bold';
  font-size: 2.6rem;
  margin: 2rem 0 6rem 0;
  @media screen and (max-width: 767px) {
    font-size: 2rem;
    margin: 1rem 0 3rem 0;
  }
`;

const Score = styled.span`
  font-family: 'Pretendard-Bold';
  font-size: 2.6rem;
  padding: 2.1rem 8rem;
  border-radius: 1.2rem;
  background: var(--gray-bg-color);
  @media screen and (max-width: 767px) {
    font-size: 2rem;
  }
`;

const Result = styled.span`
  font-size: 2rem;
  margin: 1rem 0 0 0;
  color: var(--main-color);
  font-family: 'Pretendard-Medium';
  @media screen and (max-width: 767px) {
    font-size: 1.4rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default CogTrainingResult;
