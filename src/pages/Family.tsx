import LeftTapBar from '../components/common/LeftTabBar';
import BottomTapBar from '../components/common/BottomTabBar';
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import Splash from './Splash';
import { styled } from 'styled-components';
import Label from '../components/common/Label';
import { useNavigate } from 'react-router';
import LayerPopup from '../components/common/LayerPopup';
import { useModal } from '../hooks/useModal';
import Button from '../components/common/Button';
import { getErrorMessage } from '../utils/getErrorMessage';

export type EmotionInfoDtoListProps = {
  id: number;
  codeDetail: string;
  codeDetailName: string;
  commonCode: {
    id: number;
    code: string;
    codeName: string;
  };
};
function Family() {
  const { accessToken, id } = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  type PostPreviewDtoListProps = {
    id: number;
    thumbnailUrl: string;
  };
  type FamilyMemberDtoListProps = {
    name: string;
    relationship: string;
    profileImgUrl: string;
  };
  type Props = {
    emotionInfoDtoList: EmotionInfoDtoListProps[];
    postPreviewDtoList: PostPreviewDtoListProps[];
    familyMemberDtoList: FamilyMemberDtoListProps[];
  };
  const [data, setData] = useState<Props>({
    emotionInfoDtoList: [],
    postPreviewDtoList: [],
    familyMemberDtoList: [],
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const { isModalOpen, modalText, openModal, closeModal } = useModal();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/patient/family-stories/${id}`,
          {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          },
        );
        if (!data.isSuccess) {
          openModal(data.message);
          return;
        }
        setData(data.result);
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

  const toPostRead = (postId: number) => {
    navigate(`/familyPostRead/${postId}`, {
      state: { emotionInfoDtoList: data?.emotionInfoDtoList },
    });
  };

  const toVitamin = () => {
    navigate('/vitamin');
  };

  const renderImages = () => {
    if (!data?.postPreviewDtoList || data.postPreviewDtoList.length === 0) {
      return <Empty>아직 게시물이 없어요.</Empty>;
    } else if (!isMobile && data.postPreviewDtoList.length >= 5) {
      return (
        <>
          <ImageContainer2>
            <LargeImage
              alt=""
              src={data.postPreviewDtoList[0].thumbnailUrl}
              onClick={() => toPostRead(data.postPreviewDtoList[0].id)}
            />
            <SmallContainer>
              <SmallImage
                alt=""
                src={data.postPreviewDtoList[3].thumbnailUrl}
                onClick={() => toPostRead(data.postPreviewDtoList[3].id)}
              />
              <SmallImage
                alt=""
                src={data.postPreviewDtoList[4].thumbnailUrl}
                onClick={() => toPostRead(data.postPreviewDtoList[4].id)}
              />
            </SmallContainer>
          </ImageContainer2>
          <ImageContainer3>
            <MediumImage
              alt=""
              src={data.postPreviewDtoList[1].thumbnailUrl}
              onClick={() => toPostRead(data.postPreviewDtoList[1].id)}
            />
            <MediumImage
              alt=""
              src={data.postPreviewDtoList[2].thumbnailUrl}
              onClick={() => toPostRead(data.postPreviewDtoList[2].id)}
            />
          </ImageContainer3>
        </>
      );
    } else {
      return (
        <BigImage
          alt=""
          src={data.postPreviewDtoList[0].thumbnailUrl}
          onClick={() => toPostRead(data.postPreviewDtoList[0].id)}
        />
      );
    }
  };

  if (loading) return <Splash />;
  return (
    <Container>
      <LeftTapBar />
      <Container2>
        <Container3>
          <ImageContainer>{renderImages()}</ImageContainer>
          <MemberContainer>
            <Label>가족 구성원</Label>
            <MemberBox>
              {data.familyMemberDtoList.length === 0 ? (
                <Empty>아직 구성원이 없어요.</Empty>
              ) : (
                data.familyMemberDtoList.map((v) => (
                  <MemberContainer2 key={v.name}>
                    {v.profileImgUrl ? (
                      <ProfileImage alt="" src={v.profileImgUrl} />
                    ) : (
                      <ProfileImage
                        alt=""
                        src="/assets/images/profile-default.svg"
                      />
                    )}
                    <Align>
                      <Name>
                        {v.name}({v.relationship})
                      </Name>
                      {/* <Sub>접속중</Sub> */}
                    </Align>
                  </MemberContainer2>
                ))
              )}
            </MemberBox>
          </MemberContainer>
        </Container3>
        <Button style={{ alignSelf: 'flex-end' }} onClick={toVitamin}>
          우리가족 비타민 만들기
        </Button>
      </Container2>
      {isModalOpen && (
        <LayerPopup
          label={modalText}
          centerButtonText="확인"
          onClickCenterButton={closeModal}
          closeModal={closeModal}
        />
      )}
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
  flex-direction: column;
  gap: 2.8rem;
  justify-content: center;
  height: calc(var(--vh, 1vh) * 100);
  align-items: center;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    padding: 1rem 3rem;
    gap: 2rem;
  }
  @media screen and (max-width: 767px) {
    flex-wrap: wrap;
    padding: 1.6rem;
    gap: 2rem;
    justify-content: flex-start;
  }
`;
const Container3 = styled.div`
  display: flex;
  justify-content: center;
  gap: 2.8rem;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    gap: 2rem;
  }
  @media screen and (max-width: 767px) {
    flex-wrap: wrap;
    gap: 2rem;
    align-content: flex-start;
  }
`;
const ImageContainer = styled.div`
  width: 1050px;
  height: 900px;
  border-radius: 2.1rem;
  display: flex;
  justify-content: space-between;
  gap: 2.8rem;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 542px;
    height: 460px;
    gap: 2rem;
  }
  @media screen and (max-width: 767px) {
    flex-wrap: wrap;
    padding: 0;
    gap: 1rem;
    align-content: center;
    width: 300px;
    height: 300px;
    justify-content: center;
  }
`;
const MemberContainer = styled.div`
  width: 360px;
  height: 900px;
  border-radius: 2.1rem;
  background: #fff;
  box-shadow: 1.5rem 1.3rem 2.8rem 0 rgba(0, 0, 0, 0.06);
  padding: 4.2rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 18px;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 200px;
    height: 460px;
    padding: 1.6rem;
  }
  @media screen and (max-width: 767px) {
    width: 300px;
    height: 250px;
    padding: 2rem;
  }
`;
const ImageContainer2 = styled.div`
  width: 580px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2.8rem;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 300px;
    gap: 2rem;
  }
`;
const ImageContainer3 = styled.div`
  width: 430px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2.8rem;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 216px;
    gap: 2rem;
  }
`;
const LargeImage = styled.img`
  border-radius: 2rem;
`;
const SmallContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2.8rem;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    gap: 2rem;
  }
`;
const SmallImage = styled.img`
  width: 270px;
  border-radius: 2rem;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 135px;
  }
`;
const MediumImage = styled.img`
  border-radius: 2rem;
`;
const MemberBox = styled.div`
  height: 100%;
  border-radius: 2.1rem;
  background: var(--gray-bg-color);
  padding: 3rem 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 5rem;
  overflow: auto;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    gap: 1.6rem;
    padding: 1rem;
  }
  @media screen and (max-width: 767px) {
    gap: 1rem;
    padding: 1rem;
  }
`;
const MemberContainer2 = styled.div`
  display: flex;
  gap: 2.3rem;
  align-items: center;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    gap: 1rem;
  }
`;
const Align = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const ProfileImage = styled.img`
  width: 6.2rem;
  height: 6.2rem;
  border-radius: 50%;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 4rem;
    height: 4rem;
  }
  @media screen and (max-width: 767px) {
    width: 5rem;
    height: 5rem;
  }
`;
const Name = styled.div`
  color: #433d3a;
  font-family: 'Pretendard-Medium';
  font-size: 2.6rem;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 1.6rem;
  }
  @media screen and (max-width: 767px) {
    font-size: 1.8rem;
  }
`;
const Empty = styled.div`
  margin: auto;
  font-size: 3rem;
  text-align: center;
  word-break: keep-all;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 2rem;
  }
  @media screen and (max-width: 767px) {
    font-size: 1.6rem;
  }
`;
const BigImage = styled.img`
  width: 100%;
  border-radius: 2.1rem;
`;

export default Family;
