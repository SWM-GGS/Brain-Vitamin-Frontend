import { useEffect, useRef } from 'react';
import { styled } from 'styled-components';

type Props = {
  label: string;
  desc?: string;
  leftButtonText?: string;
  onClickLeftButton?: () => void;
  rightButtonText?: string;
  onClickRightButton?: () => void;
  centerButtonText?: string;
  onClickCenterButton?: () => void;
  sound?: string;
  closeModal?: () => void;
};
function LayerPopup({
  label,
  desc,
  leftButtonText,
  onClickLeftButton,
  rightButtonText,
  onClickRightButton,
  centerButtonText,
  onClickCenterButton,
  sound,
  closeModal,
}: Props) {
  const layerPopupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sound) {
      const audio = new Audio(sound);
      audio.play();

      return () => {
        audio.pause();
        audio.currentTime = 0;
      };
    }
  }, []);

  return (
    <Container ref={layerPopupRef} onClick={closeModal}>
      <Popup role="dialog" onClick={(e) => e.stopPropagation()}>
        <Label>{label}</Label>
        <Desc>{desc}</Desc>
        <ButtonWrapper>
          {leftButtonText && (
            <LeftButton onClick={onClickLeftButton}>
              {leftButtonText}
            </LeftButton>
          )}
          {centerButtonText && (
            <RightButton onClick={onClickCenterButton}>
              {centerButtonText}
            </RightButton>
          )}
          {rightButtonText && (
            <RightButton onClick={onClickRightButton}>
              {rightButtonText}
            </RightButton>
          )}
        </ButtonWrapper>
      </Popup>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Popup = styled.div`
  width: 87rem;
  min-height: 46rem;
  border-radius: 1.6rem;
  background: #fff;
  box-shadow: 1.5rem 1.3rem 2.8rem 0 rgba(0, 0, 0, 0.06);
  padding: 10rem 6rem;
  word-break: keep-all;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  overflow: auto;
  max-height: 80rem;
  white-space: pre-line;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 50rem;
    min-height: 25rem;
    padding: 3rem;
    max-height: 55rem;
  }
  @media screen and (max-width: 767px) {
    width: 25rem;
    min-height: 20rem;
    padding: 3rem;
    max-height: 45rem;
  }
`;

const Label = styled.div`
  font-family: 'Pretendard-Bold';
  font-size: 5rem;
  text-align: center;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 2.4rem;
  }
  @media screen and (max-width: 767px) {
    font-size: 2rem;
  }
`;

const Desc = styled.div`
  font-family: 'Pretendard-Bold';
  font-size: 2.8rem;
  text-align: center;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 2rem;
  }
  @media screen and (max-width: 767px) {
    font-size: 1.6rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 2.9rem;
`;

const LeftButton = styled.button`
  width: 22.6rem;
  height: 6.7rem;
  color: var(--main-color);
  background: var(--main-bg-color);
  border-radius: 1.1rem;
  font-family: 'Pretendard-Medium';
  font-size: 2.2rem;
  @media screen and (max-width: 767px) {
    font-size: 1.8rem;
  }
`;

const RightButton = styled.button`
  width: 22.6rem;
  height: 6.7rem;
  color: white;
  background: var(--main-color);
  border-radius: 1.1rem;
  font-family: 'Pretendard-Medium';
  font-size: 2.2rem;
  @media screen and (max-width: 767px) {
    font-size: 1.6rem;
  }
`;

export default LayerPopup;
