import LeftTapBar from '../components/common/LeftTabBar';
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
import Header from '../components/common/Header';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function VitaminAlbum() {
  const { accessToken } = useSelector((state: RootState) => state.user);
  const { isModalOpen, modalText, openModal, closeModal } = useModal();
  type ImageProp = {
    pictureId: number;
    imgUrl: string;
  };
  const [images, setImages] = useState<ImageProp[]>([]);
  const [loading, setLoading] = useState(true);

  const settings = {
    arrow: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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
      <Header label="추억 보러 가기" />
      <Container2>
        <ImageContainer>
          <StyledSlider {...settings}>
            {images.length === 0 ? (
              <Empty>아직 만들어진 비타민이 없어요.</Empty>
            ) : (
              images.map((v) => <img key={v.pictureId} alt="" src={v.imgUrl} />)
            )}
          </StyledSlider>
        </ImageContainer>
        <Button
          text="사진 등록하기"
          style={{ alignSelf: 'flex-end' }}
          onClick={() => openModal('사진 등록')}
        />
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
    padding: 5rem 1.6rem 1.6rem 1.6rem;
    gap: 2rem;
    justify-content: flex-start;
  }
`;
const ImageContainer = styled.div`
  width: 1400px;
  height: 900px;
  border-radius: 2.1rem;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 750px;
    height: 550px;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    height: 550px;
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
const StyledSlider = styled(Slider)`
  height: 100%;
  .slick-list {
    height: 100%;
    object-fit: cover;
    display: flex;
    align-items: center; // 이미지가 정방향이 아닐 경우 가운데 위치
    border-radius: 2rem;
  }
  .slick-track {
    display: flex;
    align-items: center;
  }
  .slick-prev {
    left: 6px;
    z-index: 999;
    &::before {
      font-size: 6rem;
      @media screen and (min-width: 768px) and (max-height: 1079px) {
        font-size: 4rem;
      }
      @media screen and (max-width: 767px) {
        font-size: 2rem;
      }
    }
  }
  .slick-next {
    right: 60px;
    z-index: 999;
    @media screen and (min-width: 768px) and (max-height: 1079px) {
      right: 35px;
    }
    @media screen and (max-width: 767px) {
      right: 10px;
    }
    &::before {
      font-size: 6rem;
      @media screen and (min-width: 768px) and (max-height: 1079px) {
        font-size: 4rem;
      }
      @media screen and (max-width: 767px) {
        font-size: 2rem;
      }
    }
  }
`;

export default VitaminAlbum;
