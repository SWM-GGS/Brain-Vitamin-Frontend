import LeftTapBar from '../components/common/LeftTabBar';
import BottomTapBar from '../components/common/BottomTabBar';
import { styled } from 'styled-components';
import Button from '../components/common/Button';
import { useModal } from '../hooks/useModal';
import VitaminWrite from './VitaminWrite';
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import LayerPopup from '../components/common/LayerPopup';
import Splash from './Splash';
import { getErrorMessage } from '../utils/getErrorMessage';

function VitaminAlbum() {
  const { accessToken } = useSelector((state: RootState) => state.user);
  const { isModalOpen, modalText, openModal, closeModal } = useModal();
  type ImageProp = {
    pictureId: number;
    imgUrl: string;
  };
  const [images, setImages] = useState<ImageProp[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/patient/family-stories/pictures`,
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
        setImages(data.result);
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
  }, [isModalOpen]);

  if (loading) return <Splash />;
  return (
    <Container>
      <LeftTapBar />
      <Container2>
        <ImageContainer>
          {images.length === 0 ? (
            <Empty>아직 만들어진 비타민이 없어요.</Empty>
          ) : (
            images.map((v) => (
              <Image key={v.pictureId} alt="" src={v.imgUrl}></Image>
            ))
          )}
        </ImageContainer>
        <Button
          style={{ alignSelf: 'flex-end' }}
          onClick={() => openModal('사진 등록')}>
          사진 등록하기
        </Button>
      </Container2>
      {isModalOpen &&
        (modalText === '사진 등록' ? (
          <VitaminWrite closeModal={closeModal} />
        ) : (
          <LayerPopup
            label={modalText}
            centerButtonText="확인"
            onClickCenterButton={closeModal}
            closeModal={closeModal}
          />
        ))}
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
const ImageContainer = styled.div`
  width: 1400px;
  height: 900px;
  border-radius: 2.1rem;
  display: flex;
  justify-content: space-between;
  gap: 2.8rem;
  overflow: auto;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 750px;
    height: 460px;
    gap: 2rem;
  }
  @media screen and (max-width: 767px) {
    flex-direction: column;
    padding: 0;
    gap: 1rem;
    width: 100%;
    height: 620px;
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
const Image = styled.img`
  border-radius: 2rem;
  object-fit: cover;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

export default VitaminAlbum;
