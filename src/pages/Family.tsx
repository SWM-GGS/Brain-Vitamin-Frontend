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
  const { accessToken, familyKey } = useSelector(
    (state: RootState) => state.user,
  );
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
  const [data, setData] = useState<Props>();
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
    if (!familyKey) {
      openModal('아직 가족 그룹이 없어요.', '/home');
      return;
    }
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/patient/family-stories/${familyKey}`,
          // `${import.meta.env.VITE_API_URL}/patient/family-stories/${1}`,
          {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          },
        );
        setData(data.result);
      } catch (error) {
        console.error(error);
        if ((error as AxiosError).response?.status === 400) {
          openModal('아직 가족 그룹이 없어요.', '/home');
        }
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

  const renderImages = () => {
    if (!data) return;
    if (!data.postPreviewDtoList || data.postPreviewDtoList.length === 0) {
      return <Empty>아직 게시물이 없어요.</Empty>;
    }
    if (!isMobile && data.postPreviewDtoList.length >= 5) {
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

  return (
    <>
      {loading || !data ? (
        <Splash />
      ) : (
        <Container>
          <LeftTapBar />
          <Container2>
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
          </Container2>
          <BottomTapBar />
        </Container>
      )}
      {isModalOpen && (
        <LayerPopup
          label={modalText}
          centerButtonText="확인"
          onClickCenterButton={closeModal}
        />
      )}
    </>
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
  height: calc(var(--vh, 1vh) * 100);
  @media screen and (min-width: 768px) {
    align-items: center;
  }
  @media screen and (max-width: 767px) {
    flex-wrap: wrap;
    padding: 1.6rem;
    gap: 1rem;
    align-content: flex-start;
  }
`;
const ImageContainer = styled.div`
  width: 99rem;
  height: 86.7rem;
  border-radius: 2.1rem;
  display: flex;
  justify-content: space-between;
  gap: 2.8rem;
  @media screen and (max-width: 767px) {
    flex-wrap: wrap;
    padding: 0;
    gap: 1rem;
    align-content: center;
    width: 35rem;
    height: 30rem;
    justify-content: center;
  }
`;
const MemberContainer = styled.div`
  width: 35rem;
  height: 86.7rem;
  border-radius: 2.1rem;
  background: #fff;
  box-shadow: 1.5rem 1.3rem 2.8rem 0 rgba(0, 0, 0, 0.06);
  padding: 4.2rem 3rem;
  @media screen and (max-width: 767px) {
    width: 35rem;
    height: 30rem;
    padding: 2rem;
  }
`;
const ImageContainer2 = styled.div`
  width: 56.8rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const ImageContainer3 = styled.div`
  width: 41.9rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2.8rem;
`;
const LargeImage = styled.img`
  height: 56.8rem;
  background: orange;
  border-radius: 2rem;
`;
const SmallContainer = styled.div`
  height: 27rem;
  display: flex;
  justify-content: space-between;
  gap: 2.8rem;
`;
const SmallImage = styled.img`
  width: 27rem;
  height: 100%;
  background: purple;
  border-radius: 2rem;
`;
const MediumImage = styled.img`
  height: 41.9rem;
  background: green;
  border-radius: 2rem;
`;
const MemberBox = styled.div`
  height: 73rem;
  border-radius: 2.1rem;
  background: var(--gray-bg-color);
  padding: 3rem 2.4rem;
  margin: 1.8rem 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 5rem;
  overflow: auto;
  @media screen and (max-width: 767px) {
    height: 21rem;
    gap: 1rem;
    padding: 1rem;
  }
`;
const MemberContainer2 = styled.div`
  display: flex;
  gap: 2.3rem;
  align-items: center;
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
  @media screen and (max-width: 767px) {
    width: 5rem;
    height: 5rem;
  }
`;
const Name = styled.div`
  color: #433d3a;
  font-family: 'Pretendard-Medium';
  font-size: 2.6rem;
  margin: 0 0 0.6rem 0;
  @media screen and (max-width: 767px) {
    font-size: 1.8rem;
  }
`;
const Empty = styled.div`
  margin: auto;
  font-size: 3rem;
  text-align: center;
  word-break: keep-all;
`;
const BigImage = styled.img`
  width: 99rem;
  height: 86.7rem;
  border-radius: 2.1rem;
  @media screen and (max-width: 767px) {
    width: 30rem;
    height: 30rem;
    justify-content: center;
  }
`;

export default Family;
