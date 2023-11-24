import { useLocation, useNavigate } from 'react-router';
import { styled } from 'styled-components';
import Button from '../components/common/Button';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import Header from '../components/common/Header';
import endSound from '/assets/sounds/end.mp3';
import { useEffect } from 'react';
import { Container } from '../components/common/Container';

function CogTrainingResult() {
  const { state } = useLocation();
  const { totalScore, result } = state;
  const navigate = useNavigate();
  const { nickname, profileImgUrl } = useSelector(
    (state: RootState) => state.user,
  );

  useEffect(() => {
    const audio = new Audio(endSound);
    audio.play();
  }, []);

  const toHome = () => {
    navigate('/home');
  };

  return (
    <Container>
      <Header label="결과보기" />
      <Wrapper>
        <Box>
          <MyWrapper>
            {profileImgUrl ? (
              <ProfileImage alt="" src={profileImgUrl} />
            ) : (
              <ProfileImage alt="" src="/assets/images/profile-default.svg" />
            )}
            <Name>{nickname}</Name>
            <Score>{totalScore}점</Score>
            <Result>{result}</Result>
          </MyWrapper>
        </Box>
        <ButtonWrapper>
          <Button text="홈으로 돌아가기" onClick={toHome} />
        </ButtonWrapper>
      </Wrapper>
    </Container>
  );
}

const Wrapper = styled.div`
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

const Box = styled.div`
  width: 1700px;
  height: 800px;
  border-radius: 1.6rem;
  background: #fff;
  box-shadow: 1.5rem 1.3rem 2.8rem 0 rgba(0, 0, 0, 0.06);
  padding: 3rem;
  margin: 2.55rem 0;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 900px;
    height: 500px;
    padding: 2rem;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    height: 500px;
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
  object-fit: cover;
  border-radius: 10px;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 185px;
    height: 185px;
  }
  @media screen and (max-width: 767px) {
    width: 10rem;
    height: 10rem;
  }
`;

const Name = styled.span`
  font-family: 'Pretendard-Bold';
  font-size: 2.6rem;
  margin: 2rem 0 6rem 0;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 2.4rem;
    margin: 1rem 0 3rem 0;
  }
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
