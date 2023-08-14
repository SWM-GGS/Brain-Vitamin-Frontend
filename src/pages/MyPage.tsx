import { styled } from 'styled-components';
import LeftTapBar from '../components/common/LeftTapBar';
import BottomTapBar from '../components/common/BottomTapBar';
import Button from '../components/common/Button';
import Label from '../components/common/Label';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Splash from './Splash';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import { useNavigate } from 'react-router';

function MyPage() {
  type Props = {
    weeklyVitaminDto: {
      weeklyVitaminAttendance: boolean[];
    };
    changesFromLastWeekDto: {
      changedFromLastWeek: {};
    };
    screeningTestHistoryDto: {
      totalScore: number;
      state: string;
      description: string;
    };
  };
  const [data, setData] = useState<Props>();
  const [loading, setLoading] = useState(true);
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const DAYS = ['월', '화', '수', '목', '금', '토', '일'];
  const WEEKS = ['첫', '둘', '셋', '넷', '다섯', '여섯'];
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const weekOfMonth = getWeekOfMonth(currentDate);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/patient/activities`,
          { headers: { authorization: `Bearer ${accessToken}` } },
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

  function getWeekOfMonth(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const dayOfMonth = date.getDate();
    const weekNumber = Math.ceil((dayOfMonth + firstDayOfWeek) / 7);
    return weekNumber;
  }

  const toSetting = () => {
    navigate('/setting');
  };

  if (loading) return <Splash />;
  return (
    <Container>
      <LeftTapBar />
      <Container2>
        <Container3>
          <LeftContainer>
            <DateBox>
              <Intro>
                {currentMonth}월 {WEEKS[weekOfMonth - 1]}째주
              </Intro>
              <DayContainer>
                {data?.weeklyVitaminDto?.weeklyVitaminAttendance.map((v, i) => (
                  <DayBox
                    style={{
                      borderColor: v ? 'var(--main-color)' : '#E8E8E8',
                    }}
                    key={`${DAYS[i]}`}>
                    {v ? (
                      <PillImage
                        alt="비타민을 먹었습니다."
                        src="/assets/images/pill-active.svg"
                      />
                    ) : (
                      <PillImage
                        alt="비타민을 먹지 않았습니다."
                        src="/assets/images/pill.svg"
                      />
                    )}
                    <DayText>{DAYS[i]}</DayText>
                  </DayBox>
                ))}
              </DayContainer>
            </DateBox>
            <StatusContainer>
              <StatusBox>
                <Intro>지난 주보다 좋아졌어요!</Intro>
                <InfoText>기억력이 30% 높아졌어요</InfoText>
                <InfoText>집중력이 12% 높아졌어요</InfoText>
              </StatusBox>
              <StatusBox>
                <Intro>지난 주보다 신경쓰면 좋아요!</Intro>
                <InfoText>계산능력이 30% 낮아졌어요</InfoText>
                <InfoText>시공간능력이 12% 낮아졌어요</InfoText>
              </StatusBox>
            </StatusContainer>
          </LeftContainer>
          <RightContainer>
            <IntroContainer>
              <ResultDate>2023년 6월 5일</ResultDate>
              <Label>지난 검사 결과</Label>
            </IntroContainer>
            <ResultBox>
              <Align>
                <ResultCircle
                  style={{
                    background:
                      data?.screeningTestHistoryDto?.state === '의심'
                        ? '#FF3F3F'
                        : 'forestgreen',
                  }}>
                  {data?.screeningTestHistoryDto?.state}
                </ResultCircle>
                <ResultScore>
                  {data?.screeningTestHistoryDto?.totalScore}점
                </ResultScore>
              </Align>
              <Desc>{data?.screeningTestHistoryDto?.description}</Desc>
            </ResultBox>
          </RightContainer>
        </Container3>
        <Button style={{ alignSelf: 'flex-end' }} onClick={toSetting}>
          회원정보 수정하기
        </Button>
      </Container2>
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
const Container2 = styled.div`
  padding: 5rem;
  display: flex;
  gap: 2.8rem;
  justify-content: center;
  height: 100vh;
  @media screen and (min-width: 768px) {
    align-items: center;
    flex-direction: column;
  }
  @media screen and (max-width: 767px) {
    flex-wrap: wrap;
    padding: 1.6rem;
    gap: 1rem;
    align-content: flex-start;
  }
`;
const Container3 = styled.div`
  display: flex;
  gap: 2.8rem;
  @media screen and (max-width: 768px) {
    align-items: center;
    flex-direction: column;
    gap: 1rem;
  }
`;
const LeftContainer = styled.div`
  width: 86.6rem;
  height: 83rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (max-width: 767px) {
    width: 100%;
    height: 35rem;
    gap: 1rem;
  }
`;
const RightContainer = styled.div`
  width: 43.8rem;
  height: 83rem;
  border-radius: 2.1rem;
  background: #fff;
  box-shadow: 1.5rem 1.3rem 2.8rem 0 rgba(0, 0, 0, 0.06);
  padding: 3.9rem 4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 3rem;
  @media screen and (max-width: 767px) {
    width: 100%;
    height: 22rem;
    padding: 1.6rem;
    gap: 1rem;
  }
`;
const DateBox = styled.div`
  height: 25.1rem;
  border-radius: 2.1rem;
  background: #fff;
  box-shadow: 1.5rem 1.3rem 2.8rem 0 rgba(0, 0, 0, 0.06);
  padding: 2.4rem 3rem;
  @media screen and (max-width: 767px) {
    height: 12rem;
    padding: 1.2rem 1rem;
  }
`;
const StatusContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 767px) {
    gap: 1rem;
    height: 100%;
  }
`;
const StatusBox = styled.div`
  width: 41.9rem;
  height: 55rem;
  border-radius: 2.1rem;
  background: #fff;
  box-shadow: 1.5rem 1.3rem 2.8rem 0 rgba(0, 0, 0, 0.06);
  padding: 2.4rem 3rem;
  @media screen and (max-width: 767px) {
    width: 100%;
    height: 100%;
    padding: 2rem 1.3rem;
  }
`;
const Intro = styled.p`
  font-family: 'Pretendard-Bold';
  font-size: 2.6rem;
  color: #433d3a;
  margin: 0 0 2.2rem 0;
  @media screen and (max-width: 767px) {
    font-size: 1.8rem;
    margin: 0 0 1rem 0;
    word-break: keep-all;
  }
`;
const IntroContainer = styled.div``;
const ResultDate = styled.p`
  font-size: 2.2rem;
  color: #433d3a;
  margin: 0 0 1.3rem 0;
  @media screen and (max-width: 767px) {
    font-size: 1.4rem;
    margin: 0 0 0.5rem 0;
  }
`;
const ResultBox = styled.div`
  height: 100%;
  padding: 3.4rem 2.4rem;
  background: var(--gray-bg-color);
  border-radius: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 767px) {
    padding: 1rem;
    flex-direction: row;
    gap: 1rem;
  }
`;
const DayContainer = styled.div`
  display: flex;
  gap: 2.7rem;
  @media screen and (max-width: 767px) {
    gap: 0.5rem;
  }
`;
const DayBox = styled.div`
  width: 9.2rem;
  height: 10.6rem;
  border-radius: 3rem;
  border-width: 0.3rem;
  border-style: solid;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 767px) {
    width: 100%;
    height: 4.8rem;
    border-radius: 1.5rem;
    border-width: 0.2rem;
  }
`;
const DayText = styled.span`
  font-size: 2.8rem;
  color: #433d3a;
  @media screen and (max-width: 767px) {
    font-size: 1.4rem;
  }
`;
const PillImage = styled.img`
  width: 5.2rem;
  height: 5.2rem;
  @media screen and (max-width: 767px) {
    width: 2.6rem;
    height: 2.6rem;
  }
`;
const InfoText = styled.p`
  font-size: 2.2rem;
  color: #433d3a;
  font-family: 'Pretendard-Medium';
  margin: 0 0 1.8rem 0;
  @media screen and (max-width: 767px) {
    font-size: 1.6rem;
    margin: 0 0 1rem 0;
    word-break: keep-all;
  }
`;
const ResultCircle = styled.div`
  width: 20rem;
  height: 20rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
  font-family: 'Pretendard-Medium';
  color: white;
  @media screen and (max-width: 767px) {
    width: 7rem;
    height: 7rem;
    font-size: 1.6rem;
  }
`;
const ResultScore = styled.span`
  font-size: 3rem;
  font-family: 'Pretendard-Medium';
  margin: 3rem 0;
  @media screen and (max-width: 767px) {
    font-size: 1.8rem;
    margin: 1rem 0;
  }
`;
const Desc = styled.span`
  font-size: 2.4rem;
  word-break: keep-all;
  text-align: center;
  @media screen and (max-width: 767px) {
    font-size: 1.6rem;
  }
`;
const Align = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default MyPage;
