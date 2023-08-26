import LeftTapBar from '../components/common/LeftTapBar';
import BottomTapBar from '../components/common/BottomTapBar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import Splash from './Splash';
import { styled } from 'styled-components';
import Label from '../components/common/Label';
import { useNavigate } from 'react-router';

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
      } finally {
        setLoading(false);
      }
    };
    getData();
    // setData({
    //   emotionInfoDtoList: [
    //     {
    //       id: 5,
    //       codeDetail: 'EMOT01',
    //       codeDetailName: '행복',
    //       commonCode: {
    //         id: 2,
    //         code: 'EMOT',
    //         codeName: '감정표현',
    //       },
    //     },
    //     {
    //       id: 6,
    //       codeDetail: 'EMOT02',
    //       codeDetailName: '폭소',
    //       commonCode: {
    //         id: 2,
    //         code: 'EMOT',
    //         codeName: '감정표현',
    //       },
    //     },
    //     {
    //       id: 7,
    //       codeDetail: 'EMOT03',
    //       codeDetailName: '슬픔',
    //       commonCode: {
    //         id: 2,
    //         code: 'EMOT',
    //         codeName: '감정표현',
    //       },
    //     },
    //     {
    //       id: 8,
    //       codeDetail: 'EMOT04',
    //       codeDetailName: '놀람',
    //       commonCode: {
    //         id: 2,
    //         code: 'EMOT',
    //         codeName: '감정표현',
    //       },
    //     },
    //     {
    //       id: 9,
    //       codeDetail: 'EMOT05',
    //       codeDetailName: '화남',
    //       commonCode: {
    //         id: 2,
    //         code: 'EMOT',
    //         codeName: '감정표현',
    //       },
    //     },
    //   ],
    //   postPreviewDtoList: [
    //     { id: 0, thumbnailUrl: '' },
    //     { id: 0, thumbnailUrl: '' },
    //     { id: 0, thumbnailUrl: '' },
    //     { id: 0, thumbnailUrl: '' },
    //     { id: 0, thumbnailUrl: '' },
    //   ],
    //   familyMemberDtoList: [
    //     { name: '봉지수', relationship: '딸', profileImgUrl: '' },
    //     { name: '봉봉봉', relationship: '큰 딸', profileImgUrl: '' },
    //     { name: '봉봉봉', relationship: '큰 딸', profileImgUrl: '' },
    //     { name: '봉봉봉', relationship: '큰 딸', profileImgUrl: '' },
    //     { name: '봉봉봉', relationship: '큰 딸', profileImgUrl: '' },
    //     { name: '봉봉봉', relationship: '큰 딸', profileImgUrl: '' },
    //     { name: '봉봉봉', relationship: '큰 딸', profileImgUrl: '' },
    //     { name: '봉봉봉', relationship: '큰 딸', profileImgUrl: '' },
    //   ],
    // });
    // setLoading(false);
  }, []);

  const toPostRead = (postId: number) => {
    navigate(`/familyPostRead/${postId}`, {
      state: { emotionInfoDtoList: data?.emotionInfoDtoList },
    });
  };

  if (loading || !data) return <Splash />;
  return (
    <Container>
      <LeftTapBar />
      <Container2>
        <ImageContainer>
          {!data.postPreviewDtoList || data.postPreviewDtoList.length === 0 ? (
            <Empty>아직 게시물이 없어요.</Empty>
          ) : !isMobile && data.postPreviewDtoList.length >= 5 ? (
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
          ) : (
            <BigImage
              alt=""
              src={data.postPreviewDtoList[0].thumbnailUrl}
              onClick={() => toPostRead(data.postPreviewDtoList[0].id)}
            />
          )}
        </ImageContainer>
        <MemberContainer>
          <Label>가족 구성원</Label>
          <MemberBox>
            {data.familyMemberDtoList.length === 0 ? (
              <Empty>아직 구성원이 없어요.</Empty>
            ) : (
              data.familyMemberDtoList.map((v, i) => (
                <MemberContainer2 key={i}>
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
// const Sub = styled.div`
//   color: var(--main-color);
//   font-family: 'Pretendard-Medium';
//   font-size: 2.6rem;
// `;
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
