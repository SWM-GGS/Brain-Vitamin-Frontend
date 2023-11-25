import { styled } from 'styled-components';
import LeftTapBar from '../components/common/LeftTabBar';
import Button from '../components/common/Button';
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import Splash from './Splash';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import { useNavigate } from 'react-router';
import { useModal } from '../hooks/useModal';
import LayerPopup from '../components/common/LayerPopup';
import { getErrorMessage } from '../utils/getErrorMessage';
import Header from '../components/common/Header';

function MyPage() {
  type Props = {
    weeklyVitaminDto: {
      weeklyVitaminAttendance: boolean[];
    };
    changesFromLastWeekDto: {
      changedFromLastWeek: {
        calculation: number;
        executive: number;
        orientation: number;
        memory: number;
        sound: number;
        attention: number;
        visual: number;
        language: number;
      };
    };
    screeningTestHistoryDto: {
      totalScore: number;
      state: string;
      description: string;
      testDate: string;
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
  const [positiveValues, setPositiveValues] = useState<{
    [key: string]: number;
  }>({});
  const [negativeValues, setNegativeValues] = useState<{
    [key: string]: number;
  }>({});
  const ability = {
    calculation: '계산능력',
    executive: '실행능력',
    orientation: '지남력',
    memory: '기억력',
    sound: '소리인지력',
    attention: '주의집중력',
    visual: '시지각능력',
    language: '언어능력',
  };
  const { isModalOpen, modalText, openModal, closeModal } = useModal();

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/patient/activities`,
          { headers: { authorization: `Bearer ${accessToken}` } },
        );
        if (!data.isSuccess) {
          openModal(data.message);
          return;
        }
        setData(data.result);
        if (!data.result.changesFromLastWeekDto) return;
        const percentInfo =
          data.result.changesFromLastWeekDto.changedFromLastWeek;
        const positiveValues: {
          [key: string]: number;
        } = {};
        const negativeValues: {
          [key: string]: number;
        } = {};
        for (const key in percentInfo) {
          if (percentInfo[key] > 0) {
            positiveValues[key] = percentInfo[key];
          } else if (percentInfo[key] < 0) {
            negativeValues[key] = percentInfo[key];
          }
        }
        const sortedPositive = Object.fromEntries(
          Object.entries(positiveValues)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 2),
        );
        const sortedNegative = Object.fromEntries(
          Object.entries(negativeValues)
            .sort((a, b) => a[1] - b[1])
            .slice(0, 2),
        );
        setPositiveValues(sortedPositive);
        setNegativeValues(sortedNegative);
      } catch (error) {
        console.error(error);
        const axiosError = error as AxiosError;
        const errorMessage = getErrorMessage(axiosError);
        openModal(errorMessage);
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
        <Header label="내 활동 보기" />
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
                <Intro>잘하고 있어요!</Intro>
                {Object.entries(positiveValues).map(([k, v]) => (
                  <InfoText key={k}>
                    {ability[k as keyof typeof ability]}
                    <br />
                    <PercentUp>+{Math.round(v)}% </PercentUp>
                  </InfoText>
                ))}
              </StatusBox>
              <StatusBox>
                <Intro>더 신경쓰면 좋아요</Intro>
                {Object.entries(negativeValues).map(([k, v]) => (
                  <InfoText key={k}>
                    {ability[k as keyof typeof ability]}
                    <br />
                    <PercentDown>{Math.round(v)}% </PercentDown>
                  </InfoText>
                ))}
              </StatusBox>
            </StatusContainer>
          </LeftContainer>
          <RightContainer>
            <IntroContainer>
              <ResultDate>{data?.screeningTestHistoryDto?.testDate}</ResultDate>
              <Intro>지난 검사 결과</Intro>
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
        <Button
          text="회원정보 수정하기"
          style={{ alignSelf: 'flex-end' }}
          onClick={toSetting}
        />
      </Container2>
      {isModalOpen && (
        <LayerPopup
          label={modalText}
          centerButtonText="확인"
          onClickCenterButton={closeModal}
          closeModal={closeModal}
        />
      )}
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
  padding: 3rem 5rem;
  display: flex;
  gap: 2.8rem;
  justify-content: center;
  height: calc(var(--vh, 1vh) * 100);
  @media screen and (min-width: 768px) {
    align-items: center;
    flex-direction: column;
  }
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    padding: 1rem 3rem;
    gap: 2rem;
  }
  @media screen and (max-width: 767px) {
    flex-wrap: wrap;
    padding: 5rem 1.6rem 1.6rem 1.6rem;
    gap: 1rem;
    align-content: flex-start;
  }
`;
const Container3 = styled.div`
  display: flex;
  gap: 2.8rem;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    gap: 2rem;
  }
  @media screen and (max-width: 768px) {
    align-items: center;
    flex-direction: column;
    gap: 1rem;
  }
`;
const LeftContainer = styled.div`
  width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2.8rem;
  @media screen and (min-width: 768px) {
    height: 800px;
  }
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 540px;
    height: 500px;
    gap: 2rem;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    gap: 1rem;
  }
`;
const RightContainer = styled.div`
  width: 450px;
  height: 800px;
  border-radius: 2.1rem;
  background: #fff;
  box-shadow: 1.5rem 1.3rem 2.8rem 0 rgba(0, 0, 0, 0.06);
  padding: 3.9rem 4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 3rem;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 210px;
    height: 500px;
    padding: 2rem;
    gap: 1rem;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    height: 230px;
    padding: 1.4rem;
    gap: 0.5rem;
  }
`;
const DateBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  height: 25.1rem;
  border-radius: 2.1rem;
  background: #fff;
  box-shadow: 1.5rem 1.3rem 2.8rem 0 rgba(0, 0, 0, 0.06);
  padding: 2.4rem 3rem;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    height: 140px;
    padding: 2rem;
    gap: 1rem;
  }
  @media screen and (max-width: 767px) {
    height: 110px;
    padding: 1.4rem;
    gap: 0.5rem;
  }
`;
const StatusContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2.8rem;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    gap: 2rem;
  }
  @media screen and (max-width: 767px) {
    gap: 1rem;
  }
`;
const StatusBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.2rem;
  width: 100%;
  height: 52rem;
  border-radius: 2.1rem;
  background: #fff;
  box-shadow: 1.5rem 1.3rem 2.8rem 0 rgba(0, 0, 0, 0.06);
  padding: 2.4rem 3rem;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    height: 340px;
    padding: 2rem;
    gap: 1rem;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    height: 260px;
    padding: 1.4rem;
    gap: 1rem;
  }
`;
const Intro = styled.p`
  font-family: 'Pretendard-Bold';
  font-size: 2.6rem;
  color: #433d3a;
  word-break: keep-all;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 2.2rem;
  }
  @media screen and (max-width: 767px) {
    font-size: 1.8rem;
    word-break: keep-all;
  }
`;
const IntroContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    gap: 0.5rem;
  }
  @media screen and (max-width: 767px) {
    gap: 1rem;
  }
`;
const ResultDate = styled.p`
  font-size: 2.2rem;
  color: #433d3a;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 1.6rem;
  }
  @media screen and (max-width: 767px) {
    font-size: 1.2rem;
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
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    padding: 1rem;
    gap: 1rem;
  }
  @media screen and (max-width: 767px) {
    padding: 1rem;
    flex-direction: row;
    gap: 1rem;
  }
`;
const DayContainer = styled.div`
  display: flex;
  gap: 2.7rem;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    gap: 1rem;
  }
  @media screen and (max-width: 767px) {
    gap: 1rem;
  }
`;
const DayBox = styled.div`
  width: 9.2rem;
  height: 10.6rem;
  border-radius: 20px;
  border-width: 0.3rem;
  border-style: solid;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    height: 6rem;
    border-width: 0.2rem;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    height: 60px;
    border-radius: 1.5rem;
    border-width: 0.2rem;
  }
`;
const DayText = styled.span`
  font-size: 2.8rem;
  color: #433d3a;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 1.6rem;
  }
  @media screen and (max-width: 767px) {
    font-size: 1.4rem;
  }
`;
const PillImage = styled.img`
  width: 5.2rem;
  height: 5.2rem;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 3rem;
    height: 3rem;
  }
  @media screen and (max-width: 767px) {
    width: 2.6rem;
    height: 2.6rem;
  }
`;
const InfoText = styled.p`
  font-size: 2.2rem;
  color: #433d3a;
  font-family: 'Pretendard-Medium';
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 1.6rem;
    word-break: keep-all;
  }
  @media screen and (max-width: 767px) {
    font-size: 1.6rem;
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
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 10rem;
    height: 10rem;
    font-size: 2rem;
  }
  @media screen and (max-width: 767px) {
    width: 78px;
    height: 78px;
    font-size: 1.6rem;
  }
`;
const ResultScore = styled.span`
  font-size: 3rem;
  font-family: 'Pretendard-Medium';
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 2.4rem;
  }
  @media screen and (max-width: 767px) {
    font-size: 1.4rem;
  }
`;
const Desc = styled.span`
  font-size: 2.4rem;
  word-break: keep-all;
  text-align: center;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 1.4rem;
  }
  @media screen and (max-width: 767px) {
    font-size: 1.2rem;
  }
`;
const Align = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    gap: 1rem;
  }
  @media screen and (max-width: 767px) {
    gap: 1rem;
  }
`;
const PercentUp = styled.span`
  color: forestgreen;
  font-size: 3rem;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 2.6rem;
  }
  @media screen and (max-width: 767px) {
    font-size: 2rem;
  }
`;
const PercentDown = styled.span`
  color: #ff3f3f;
  font-size: 3rem;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 2.6rem;
  }
  @media screen and (max-width: 767px) {
    font-size: 2rem;
  }
`;

export default MyPage;
