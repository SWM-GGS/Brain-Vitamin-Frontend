import { styled } from 'styled-components';
import Label from '../components/common/Label';
import LeftTapBar from '../components/common/LeftTabBar';
import { useNavigate } from 'react-router';
import Header from '../components/common/Header';

function Vitamin() {
  const navigate = useNavigate();

  const toVitaminAlbum = () => {
    navigate('/vitaminAlbum');
  };

  const toVitaminPlay = () => {
    navigate('/vitaminPlay');
  };

  return (
    <Container>
      <LeftTapBar />
      <Header label="우리가족 비타민" />
      <Wrapper>
        <Box onClick={toVitaminAlbum}>
          <VitaminImage alt="" src="/assets/images/album.svg" />
          <Label>추억 보러 가기</Label>
          <Sub>퀴즈에 나올 사진을 등록해주세요.</Sub>
        </Box>
        <Box onClick={toVitaminPlay}>
          <VitaminImage alt="" src="/assets/images/vitamin.svg" />
          <Label>우리가족 비타민</Label>
          <Sub>앨범에서 랜덤으로 나오는 퀴즈를 풀어보아요!</Sub>
        </Box>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

const Wrapper = styled.div`
  padding: 5rem;
  display: flex;
  gap: 2.8rem;
  justify-content: center;
  height: calc(var(--vh, 1vh) * 100);
  @media screen and (min-width: 768px) {
    align-items: center;
  }
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    padding: 1rem 3rem;
    gap: 2rem;
  }
  @media screen and (max-width: 767px) {
    flex-wrap: wrap;
    padding: 5rem 1.6rem 1.6rem 1.6rem;
    gap: 2rem;
    align-content: flex-start;
  }
`;

const Box = styled.div`
  width: 700px;
  height: 700px;
  border-radius: 3rem;
  background: #fff;
  box-shadow: 1.5rem 1.3rem 2.8rem 0 rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 365px;
    height: 380px;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    height: 300px;
  }
`;

const VitaminImage = styled.img`
  margin: 0 0 4.9rem 0;
  width: 250px;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 160px;
    margin: 0 0 2rem 0;
  }
  @media screen and (max-width: 767px) {
    width: 10rem;
    height: 10rem;
    margin: 0 0 2rem 0;
  }
`;

const Sub = styled.p`
  color: var(--main-color);
  font-family: 'Pretendard-Medium';
  font-size: 2.8rem;
  padding: 1rem 3.2rem;
  background: var(--main-bg-color);
  border-radius: 5.9rem;
  margin: 3.4rem 0 0 0;
  text-align: center;
  word-break: keep-all;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 1.6rem;
  }
  @media screen and (max-width: 767px) {
    font-size: 1.4rem;
    margin: 2rem 0 0 0;
  }
`;

export default Vitamin;
