import LeftTapBar from '../components/common/LeftTabBar';
import BottomTapBar from '../components/common/BottomTabBar';
import { styled } from 'styled-components';
import Button from '../components/common/Button';
import { useModal } from '../hooks/useModal';
import VitaminWrite from './VitaminWrite';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';

function VitaminAlbum() {
  const { accessToken } = useSelector((state: RootState) => state.user);
  const { isModalOpen, openModal, closeModal } = useModal();
  const [data, setData] = useState([]);

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
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  return (
    <Container>
      <LeftTapBar />
      <Container2>
        {/* <ImageContainer>{renderImages()}</ImageContainer> */}
        <Button
          style={{ alignSelf: 'flex-end' }}
          onClick={() => openModal('사진 등록')}>
          사진 등록하기
        </Button>
      </Container2>
      <BottomTapBar />
      {isModalOpen && <VitaminWrite closeModal={closeModal} />}
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

export default VitaminAlbum;
