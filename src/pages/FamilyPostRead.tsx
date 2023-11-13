import LeftTapBar from '../components/common/LeftTabBar';
import BottomTapBar from '../components/common/BottomTabBar';
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import Splash from './Splash';
import { styled } from 'styled-components';
import { useLocation, useParams } from 'react-router';
import { EmotionInfoDtoListProps } from './Family';
import LayerPopup from '../components/common/LayerPopup';
import { useModal } from '../hooks/useModal';

function FamilyPostRead() {
  const { accessToken, familyKey, nickname } = useSelector(
    (state: RootState) => state.user,
  );
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<string[]>([]);
  const [parentComments, setParentComments] = useState<CommentDtoListProps[]>(
    [],
  );
  const [currentEmotionType, setCurrentEmotionType] = useState('');
  const { postId } = useParams();
  const {
    state: { emotionInfoDtoList },
  } = useLocation();
  const [listVisible, setListVisible] = useState(false);
  const { isModalOpen, modalText, openModal, closeModal } = useModal();

  type PostImgDtoListProps = {
    id: number;
    imgUrl: string;
    description: string;
  };
  type ViewerDtoListProps = {};
  type EmotionDtoListProps = {
    id: number;
    userName: string;
    profileImgUrl: string;
    emotionType: string;
  };
  type CommentDtoListProps = {
    id: number;
    contents: string;
    postId: number;
    parentsId: number;
    createdAt: string;
    userId: number;
    userName: string;
    profileImgUrl: string;
  };
  type Props = {
    id: number;
    contents: string;
    postImgDtoList: PostImgDtoListProps[];
    createdAt: string;
    userId: number;
    userName: string;
    relationship: string;
    profileImgUrl: string;
    viewersCount: number;
    viewerDtoList: ViewerDtoListProps[];
    emotionsCount: number;
    emotionDtoList: EmotionDtoListProps[];
    commentsCount: number;
    commentDtoList: CommentDtoListProps[];
  };
  const [data, setData] = useState<Props>();
  const EMOTIONS = {
    행복: 'happiness',
    폭소: 'laughter',
    슬픔: 'sadness',
    놀람: 'surprised',
    화남: 'aggro',
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/patient/family-stories/${familyKey}/${postId}`,
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
        setImages(
          data.result.postImgDtoList.map((v: PostImgDtoListProps) => v.imgUrl),
        );
        setParentComments(
          data.result.commentDtoList.filter(
            (v: CommentDtoListProps) => v.id === v.parentsId,
          ),
        );
        setCurrentEmotionType(
          data.result.emotionDtoList.find(
            (v: EmotionDtoListProps) => v.userName === nickname,
          )?.emotionType || '',
        );
      } catch (error) {
        console.error(error);
        const axiosError = error as AxiosError;
        openModal(
          `[일시적인 오류 발생]
          이용에 불편을 드려 죄송합니다.
          status: ${axiosError.response?.status}
          statusText: ${axiosError.response?.statusText}`,
        );
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  };

  const onClickEmotion = async (type: string) => {
    const id = emotionInfoDtoList.find(
      (v: EmotionInfoDtoListProps) => v.codeDetailName === type,
    ).id;
    const isSelectedNewEmotion = currentEmotionType !== type;
    try {
      const { data } = await axios.delete(
        `${
          import.meta.env.VITE_API_URL
        }/patient/family-stories/${familyKey}/${postId}/emotion`,
        {
          data: { id },
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (!data.isSuccess) {
        openModal(data.message);
        return;
      }
      setCurrentEmotionType('');
    } catch (error) {
      console.error(error);
      const axiosError = error as AxiosError;
      openModal(
        `[일시적인 오류 발생]
          이용에 불편을 드려 죄송합니다.
          status: ${axiosError.response?.status}
          statusText: ${axiosError.response?.statusText}`,
      );
    }
    if (isSelectedNewEmotion) {
      try {
        const { data } = await axios.post(
          `${
            import.meta.env.VITE_API_URL
          }/patient/family-stories/${familyKey}/${postId}/emotion`,
          {
            id,
          },
          { headers: { authorization: `Bearer ${accessToken}` } },
        );
        if (!data.isSuccess) {
          openModal(data.message);
          return;
        }
        setCurrentEmotionType(type);
      } catch (error) {
        console.error(error);
        const axiosError = error as AxiosError;
        openModal(
          `[일시적인 오류 발생]
          이용에 불편을 드려 죄송합니다.
          status: ${axiosError.response?.status}
          statusText: ${axiosError.response?.statusText}`,
        );
      }
    }
  };

  if (loading || !data) return <Splash />;
  return (
    <Container>
      <LeftTapBar />
      <Container2>
        <ImageContainer>
          <CarouselContainer>
            <Carousel>
              <LeftArrowButton onClick={goToPrevSlide}>
                <ArrowImage alt="이전" src="/assets/images/arrow-left.svg" />
              </LeftArrowButton>
              <Image alt={`Slide ${currentIndex}`} src={images[currentIndex]} />
              <RightArrowButton onClick={goToNextSlide}>
                <ArrowImage alt="다음" src="/assets/images/arrow-right.svg" />
              </RightArrowButton>
            </Carousel>
          </CarouselContainer>
          <SubImagesContainer>
            {images.map((v, i) => (
              <SubImage
                style={{
                  border:
                    i === currentIndex
                      ? '0.2rem solid var(--main-color)'
                      : '0.2rem solid var(--gray-bg-color)',
                }}
                key={v}
                alt={`Sub Image ${i}`}
                src={v}
                onClick={() => setCurrentIndex(i)}
              />
            ))}
          </SubImagesContainer>
        </ImageContainer>
        <ContentsContainer>
          <ProfileContainer>
            <Profile>
              {data.profileImgUrl ? (
                <ProfileImage alt="" src={data.profileImgUrl} />
              ) : (
                <ProfileImage alt="" src="/assets/images/profile-default.svg" />
              )}
              <Align>
                <PostDate>{data.createdAt}</PostDate>
                <Name>
                  {data.userName}({data.relationship})
                </Name>
              </Align>
            </Profile>
          </ProfileContainer>
          <Contents>{data.contents}</Contents>
          <PostInfoContainer>
            <SubInfoBox
              style={{ position: 'relative' }}
              onClick={() => setListVisible((prev) => !prev)}>
              <img alt="" src="/assets/images/emotion.svg" />
              <SubInfoText>표정</SubInfoText>
              <SubInfoText>{data.emotionsCount}</SubInfoText>
              <ToggleList $visible={listVisible}>
                {data.emotionDtoList.map((v) => (
                  <ToggleListItem key={v.userName}>
                    {v.profileImgUrl ? (
                      <CommentProfileImage alt="" src={v.profileImgUrl} />
                    ) : (
                      <CommentProfileImage
                        alt=""
                        src="/assets/images/profile-default.svg"
                      />
                    )}
                    <span>{v.userName}</span>
                    <ToggleImage
                      alt={v.emotionType}
                      src={`/assets/images/${
                        (EMOTIONS as any)[v.emotionType]
                      }.svg`}
                    />
                  </ToggleListItem>
                ))}
              </ToggleList>
            </SubInfoBox>
            <SubInfoBox>
              <img alt="" src="/assets/images/comment.svg" />
              <SubInfoText>댓글</SubInfoText>
              <SubInfoText>{data.commentsCount}</SubInfoText>
            </SubInfoBox>
            <SubInfoBox>
              <SubInfoText>조회수</SubInfoText>
              <SubInfoText>{data.viewersCount}</SubInfoText>
            </SubInfoBox>
          </PostInfoContainer>
          <EmotionBox>
            {Object.entries(EMOTIONS).map(([k, v]) => (
              <Button key={v} onClick={() => onClickEmotion(k)}>
                <EmotionImage
                  style={{
                    border:
                      currentEmotionType === k
                        ? '0.5rem solid var(--main-color)'
                        : 'none',
                    borderRadius: '50%',
                  }}
                  alt={k}
                  src={`/assets/images/${v}.svg`}
                />
              </Button>
            ))}
          </EmotionBox>
          <Intro>댓글({data.commentsCount})</Intro>
          <CommentContainer>
            {parentComments.map((parentComment) => (
              <CommentSection key={parentComment.id}>
                <CommentProfileContainer>
                  {parentComment.profileImgUrl ? (
                    <CommentProfileImage
                      alt=""
                      src={parentComment.profileImgUrl}
                    />
                  ) : (
                    <CommentProfileImage
                      alt=""
                      src="/assets/images/profile-default.svg"
                    />
                  )}
                  <CommentProfileAlign>
                    <CommentWriterName>
                      {parentComment.userName}
                    </CommentWriterName>
                    <CommentDate>{parentComment.createdAt}</CommentDate>
                  </CommentProfileAlign>
                </CommentProfileContainer>
                <CommentContentsContainer>
                  <CommentContents>{parentComment.contents}</CommentContents>
                  {data.commentDtoList.map(
                    (v) =>
                      parentComment.id !== v.id &&
                      parentComment.id === v.parentsId && (
                        <ReplySection key={v.id}>
                          <CommentProfileContainer>
                            {v.profileImgUrl ? (
                              <CommentProfileImage
                                alt=""
                                src={v.profileImgUrl}
                              />
                            ) : (
                              <CommentProfileImage
                                alt=""
                                src="/assets/images/profile-default.svg"
                              />
                            )}
                            <CommentProfileAlign>
                              <CommentWriterName>
                                {v.userName}
                              </CommentWriterName>
                              <CommentDate>{v.createdAt}</CommentDate>
                            </CommentProfileAlign>
                          </CommentProfileContainer>
                          <CommentContentsContainer>
                            <CommentContents>{v.contents}</CommentContents>
                          </CommentContentsContainer>
                        </ReplySection>
                      ),
                  )}
                </CommentContentsContainer>
              </CommentSection>
            ))}
          </CommentContainer>
        </ContentsContainer>
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
  gap: 2.8rem;
  justify-content: center;
  height: calc(var(--vh, 1vh) * 100);
  @media screen and (min-width: 768px) {
    align-items: center;
  }
  @media screen and (max-width: 767px) {
    flex-wrap: wrap;
    padding: 0;
    gap: 1rem;
    align-content: flex-start;
  }
`;
const ImageContainer = styled.div`
  width: 74rem;
  height: 86.7rem;
  border-radius: 2.1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.9rem;
  @media screen and (max-width: 767px) {
    padding: 0;
    gap: 1rem;
    width: 30rem;
    height: 36rem;
  }
`;
const ContentsContainer = styled.div`
  width: 54rem;
  height: 86.7rem;
  border-radius: 2.1rem;
  background: #fff;
  box-shadow: 1.5rem 1.3rem 2.8rem 0 rgba(0, 0, 0, 0.06);
  padding: 4.2rem 3rem;
  overflow-y: auto;
  @media screen and (max-width: 767px) {
    width: 30rem;
    padding: 1.6rem 1.6rem 8rem 1.6rem;
  }
`;
const CarouselContainer = styled.div`
  width: 100%;
  height: 74rem;
  @media screen and (max-width: 767px) {
    height: 30rem;
  }
`;
const Carousel = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 2.1rem;
  @media screen and (max-width: 767px) {
    border-radius: 1rem;
  }
`;
const LeftArrowButton = styled.button`
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.22);
  width: 6rem;
  height: 6rem;
  padding: 1rem;
  color: white;
  position: absolute;
  left: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 767px) {
    width: 3rem;
    height: 3rem;
  }
`;
const RightArrowButton = styled.button`
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.22);
  width: 6rem;
  height: 6rem;
  padding: 1rem;
  color: white;
  position: absolute;
  right: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 767px) {
    width: 3rem;
    height: 3rem;
  }
`;
const SubImagesContainer = styled.div`
  height: 10rem;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  @media screen and (max-width: 767px) {
    height: 5rem;
  }
`;
const SubImage = styled.img`
  display: inline-block;
  width: 10rem;
  height: 10rem;
  border-radius: 2.1rem;
  background: blue;
  margin: 0 1rem 0 0;
  @media screen and (max-width: 767px) {
    width: 5rem;
    height: 5rem;
    border-radius: 1rem;
  }
`;
const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Profile = styled.div`
  display: flex;
  gap: 1.8rem;
  align-items: center;
  @media screen and (max-width: 767px) {
    gap: 1rem;
  }
`;
const ProfileImage = styled.img`
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  @media screen and (max-width: 767px) {
    width: 5rem;
    height: 5rem;
  }
`;
const Align = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const PostDate = styled.div`
  color: #433d3a;
  font-size: 1.6rem;
`;
const Name = styled.div`
  color: #433d3a;
  font-family: 'Pretendard-Bold';
  font-size: 2.6rem;
  margin: 0 0 0.6rem 0;
  @media screen and (max-width: 767px) {
    font-size: 1.8rem;
  }
`;
const Contents = styled.div`
  padding: 1.8rem 2.4rem;
  border-radius: 2.5rem;
  background: var(--gray-bg-color);
  font-size: 2rem;
  margin: 2.8rem 0 1.6rem 0;
  @media screen and (max-width: 767px) {
    font-size: 1.6rem;
    padding: 1.6rem 1.8rem;
  }
`;
const PostInfoContainer = styled.div`
  display: flex;
  gap: 1.2rem;
  @media screen and (max-width: 767px) {
    gap: 1rem;
  }
`;
const SubInfoBox = styled.div`
  padding: 1.2rem;
  border-radius: 8rem;
  border: 0.2rem solid #e8e8e8;
  display: flex;
  gap: 0.4rem;
  align-items: center;
  @media screen and (max-width: 767px) {
    gap: 0.2rem;
    border-radius: 4rem;
    padding: 0.8rem;
  }
`;
const SubInfoText = styled.span`
  font-size: 2rem;
  color: #6d6b69;
  @media screen and (max-width: 767px) {
    font-size: 1.4rem;
  }
`;
const EmotionBox = styled.div`
  margin: 2.8rem 0;
  padding: 1.5rem 2.5rem;
  display: flex;
  gap: 2.6rem;
  border-radius: 2.1rem;
  border: 0.2rem solid #e8e8e8;
  justify-content: center;
  @media screen and (max-width: 767px) {
    gap: 1rem;
  }
`;
const Intro = styled.p`
  font-size: 2.2rem;
  font-family: 'Pretendard-Bold';
  @media screen and (max-width: 767px) {
    font-size: 1.8rem;
  }
`;
const CommentContainer = styled.div``;
const CommentSection = styled.div`
  padding: 2.8rem 0;
  border-bottom: 0.2rem solid #c6c6c6;
  &:last-child {
    border-bottom: none;
  }
  @media screen and (max-width: 767px) {
    padding: 1rem 0;
  }
`;
const CommentProfileContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
`;
const CommentProfileAlign = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;
const CommentWriterName = styled.span`
  font-size: 1.8rem;
  font-family: 'Pretendard-Bold';
  @media screen and (max-width: 767px) {
    font-size: 1.6rem;
  }
`;
const CommentDate = styled.span`
  color: #6d6b69;
  font-size: 1.6rem;
  @media screen and (max-width: 767px) {
    font-size: 1.4rem;
  }
`;
const CommentContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
const CommentContents = styled.div`
  width: 43.4rem;
  padding: 2rem 1rem;
  border-radius: 1.4rem;
  background: var(--gray-bg-color);
  font-size: 2rem;
  margin: 0.4rem 0 0.8rem 0;
  @media screen and (max-width: 767px) {
    width: 23rem;
    font-size: 1.6rem;
    padding: 1.5rem 1rem;
  }
`;
const CommentProfileImage = styled.img`
  width: 4.4rem;
  height: 4.4rem;
  @media screen and (max-width: 767px) {
    width: 3rem;
    height: 3rem;
  }
`;
const ReplySection = styled.div`
  width: 43.4rem;
  margin: 2rem 0 0 0;
  @media screen and (max-width: 767px) {
    width: 23rem;
    margin: 1rem 0 0 0;
  }
`;
const Button = styled.button`
  background: none;
`;
const ToggleList = styled.ul<{ $visible: boolean }>`
  display: ${(props) => (props.$visible ? 'block' : 'none')};
  list-style-type: none;
  padding: 0;
  position: absolute;
  top: 3rem;
  left: 0;
  font-size: 2rem;
  width: 20rem;
  box-shadow: 1.5rem 1.3rem 2.8rem 0 rgba(0, 0, 0, 0.06);
  background: white;
  border-radius: 1rem;
  border: 0.2rem solid #ccc;
  @media screen and (max-width: 767px) {
    font-size: 1.6rem;
  }
`;
const ToggleListItem = styled.li`
  padding: 0.5rem;
  border-bottom: 0.2rem solid #ccc;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: space-between;
  &:last-child {
    border: none;
  }
`;
const ToggleImage = styled.img`
  width: 3rem;
  height: 3rem;
`;
const EmotionImage = styled.img`
  @media screen and (max-width: 767px) {
    width: 3rem;
    height: 3rem;
  }
`;
const ArrowImage = styled.img`
  @media screen and (max-width: 767px) {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export default FamilyPostRead;
