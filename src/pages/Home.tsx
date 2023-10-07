import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { styled } from 'styled-components';
import Label from '../components/common/Label';
import LeftTapBar from '../components/common/LeftTabBar';
import BottomTapBar from '../components/common/BottomTabBar';
import { useNavigate } from 'react-router';

function Home() {
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  type Props = {
    first: boolean;
    nextToDo: string;
    consecutiveDays: number;
  };
  const [data, setData] = useState<Props>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/patient`,
          {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          },
        );
        setData(data.result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const onClickVitamin = () => {
    if (loading) return;
    if (data?.first) {
      navigate('/birthDateSet', { state: { nextToDo: data.nextToDo } });
    } else {
      navigate(`/${data?.nextToDo}`);
    }
  };

  const toFamily = () => {
    navigate('/family');
  };

  const toMyPage = () => {
    navigate('/myPage');
  };

  return (
    <Container>
      <LeftTapBar />
      <Wrapper>
        <BigBox onClick={onClickVitamin}>
          <VitaminImage alt="" src="/assets/images/vitamin.svg" />
          <Label>식후 30분 두뇌 비타민</Label>
          <Sub>{data?.consecutiveDays}일째 연속으로 챙겨먹고 있어요!</Sub>
        </BigBox>
        <BoxWrapper>
          <Box onClick={toFamily}>
            <VitaminImage alt="" src="/assets/images/family.svg" />
            <Label>우리 가족 이야기</Label>
          </Box>
          <Box onClick={toMyPage}>
            <VitaminImage alt="" src="/assets/images/my.svg" />
            <Label>내 활동 보기</Label>
          </Box>
        </BoxWrapper>
      </Wrapper>
      <BottomTapBar />
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
    padding: 0;
    gap: 1rem;
    align-content: flex-start;
  }
`;

const BigBox = styled.div`
  width: 71rem;
  height: 80rem;
  border-radius: 3rem;
  background: #fff;
  box-shadow: 1.5rem 1.3rem 2.8rem 0 rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 38rem;
    height: 38rem;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    height: 30rem;
    margin: 2rem 1.6rem 0 1.6rem;
  }
`;

const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  height: 80rem;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    height: 38rem;
    gap: 2rem;
  }
  @media screen and (max-width: 767px) {
    flex-direction: row;
    width: 100%;
    gap: 1.3rem;
    height: 20rem;
    padding: 1.6rem;
  }
`;

const Box = styled.div`
  width: 42rem;
  height: 100%;
  border-radius: 3rem;
  background: #fff;
  box-shadow: 1.5rem 1.3rem 2.8rem 0 rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 22rem;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    height: 16rem;
    padding: 1rem;
    word-break: keep-all;
    text-align: center;
  }
`;

const VitaminImage = styled.img`
  margin: 0 0 4.9rem 0;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
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
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 1.6rem;
  }
  @media screen and (max-width: 767px) {
    font-size: 1.4rem;
  }
`;

export default Home;
