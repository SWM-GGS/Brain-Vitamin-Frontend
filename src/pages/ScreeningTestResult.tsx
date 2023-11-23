import { useLocation, useNavigate } from 'react-router';
import { styled } from 'styled-components';
import Button from '../components/common/Button';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import Header from '../components/common/Header';
import { Container } from '../components/common/Container';

function screeningTestResult() {
  const { state } = useLocation();
  const { cogLevel, totalScore } = state;
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
          <ResultWrapper>
            <Result $cogLevel={cogLevel}>
              <span>{cogLevel}</span>
            </Result>
            <Desc>
              {cogLevel === '양호'
                ? `현재 ${nickname}님은 양호한 단계로 보입니다.`
                : `현재 ${nickname}님은 경도인지장애가 의심되는 단계로 보입니다.`}
            </Desc>
            <Sub>
              진단 결과 {nickname}님의 합산 점수는 {totalScore}점입니다.
              <br />
              보다 정확한 진단을 위해 귀하의 연령과 교육년수를 함께 고려하였음을
              알려드립니다.
              <br />
              치매에 대한 정밀 검사와 치매 예방을 위한 적극적인 관리가
              필요합니다.
            </Sub>
            <Button text="홈으로 돌아가기" onClick={toHome} />
          </ResultWrapper>
        </Box>
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
    height: 450px;
    padding: 2rem;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    height: 500px;
    padding: 1.6rem;
  }
`;

const ResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: center;
  width: 100rem;
  margin: 0 auto;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 57rem;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

const Result = styled.div<{ $cogLevel: string }>`
  width: 20rem;
  height: 20rem;
  background: ${(props) =>
    props.$cogLevel === '양호' ? 'forestgreen' : '#FF3F3F'};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5rem;
  border-radius: 50%;
  font-family: 'Pretendard-Bold';
  color: white;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 130px;
    height: 130px;
    font-size: 2.4rem;
  }
  @media screen and (max-width: 767px) {
    width: 10rem;
    height: 10rem;
    font-size: 2rem;
  }
`;

const Desc = styled.p`
  font-family: 'Pretendard-Bold';
  font-size: 3.2rem;
  margin: 7rem 0 6rem 0;
  text-align: center;
  word-break: keep-all;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 2.4rem;
    margin: 2rem 0 1.5rem 0;
  }
  @media screen and (max-width: 767px) {
    font-size: 1.8rem;
    margin: 2rem 0 1.5rem 0;
  }
`;

const Sub = styled.p`
  color: #6d6b69;
  font-size: 2.8rem;
  font-family: 'Pretendard-Medium';
  text-align: center;
  word-break: keep-all;
  margin: 0 0 6.8rem 0;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 1.6rem;
    margin: 0 0 2.5rem 0;
  }
  @media screen and (max-width: 767px) {
    font-size: 1.4rem;
    margin: 0 0 3.5rem 0;
  }
`;

export default screeningTestResult;
