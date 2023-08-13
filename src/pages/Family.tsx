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

function Family() {
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const familyKey = useSelector((state: RootState) => state.user.familyKey);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  type EmotionInfoDtoListProps = {
    id: number;
    codeDetailName: string;
  };
  type PostPreviewDtoListProps = {
    id: number;
    thumbnailUrl: string;
  };
  type Props = {
    emotionInfoDtoList: EmotionInfoDtoListProps[];
    postPreviewDtoList: PostPreviewDtoListProps[];
  };
  const [data, setData] = useState<Props>();

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/patient/family-stories/${familyKey}`,
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
    //   emotionInfoDtoList: [{ id: 0, codeDetailName: '12' }],
    //   postPreviewDtoList: [
    //     { id: 0, thumbnailUrl: '' },
    //     { id: 0, thumbnailUrl: '' },
    //     { id: 0, thumbnailUrl: '' },
    //     { id: 0, thumbnailUrl: '' },
    //     { id: 0, thumbnailUrl: '' },
    //   ],
    // });
  }, []);

  const toPostRead = (postId: number) => {
    navigate('/familyPostRead', { state: { postId } });
  };

  if (loading) return <Splash />;
  return (
    <Container>
      <LeftTapBar />
      <Container2>
        <ImageContainer>
          {data?.postPreviewDtoList.length &&
          data.postPreviewDtoList.length >= 5 ? (
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
            <Empty>아직 게시물이 없어요.</Empty>
          )}
        </ImageContainer>
        <MemberContainer>
          <Label>가족 구성원</Label>
          <MemberBox>
            <MemberContainer2>
              <ProfileImage alt="" src="/assets/images/profile-default.svg" />
              <Align>
                <Name>닉네임</Name>
                <Sub>접속중</Sub>
              </Align>
            </MemberContainer2>
            <MemberContainer2>
              <ProfileImage alt="" src="/assets/images/profile-default.svg" />
              <Align>
                <Name>닉네임</Name>
                <Sub>접속중</Sub>
              </Align>
            </MemberContainer2>
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
    padding: 0;
    gap: 1rem;
    align-content: center;
  }
`;
const ImageContainer = styled.div`
  width: 99rem;
  height: 86.7rem;
  border-radius: 2.1rem;
  display: flex;
  justify-content: space-between;
  gap: 2.8rem;
`;
const MemberContainer = styled.div`
  width: 35rem;
  height: 86.7rem;
  border-radius: 2.1rem;
  background: #fff;
  box-shadow: 1.5rem 1.3rem 2.8rem 0 rgba(0, 0, 0, 0.06);
  padding: 4.2rem 3rem;
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
  // position: relative;
  // &::before {
  //   content: '';
  //   width: 1.3rem;
  //   height: 1.3rem;
  //   border-radius: 50%;
  //   background: #ff4242;
  //   position: absolute;
  //   top: 0;
  //   right: 0;
  //   transform: translate(50%, -50%);
  // }
`;
const Name = styled.div`
  color: #433d3a;
  font-family: 'Pretendard-Medium';
  font-size: 2.6rem;
  margin: 0 0 0.6rem 0;
`;
const Sub = styled.div`
  color: var(--main-color);
  font-family: 'Pretendard-Medium';
  font-size: 2.6rem;
`;
const Empty = styled.div`
  margin: auto;
  font-size: 3rem;
`;

export default Family;
