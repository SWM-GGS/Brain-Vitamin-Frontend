import { useRef } from 'react';
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
}: Props) {
  const layerPopupRef = useRef<HTMLDivElement>(null);

  return (
    <Container ref={layerPopupRef}>
      <Popup role="dialog">
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
`;

const Popup = styled.div`
  width: 87rem;
  min-height: 46rem;
  border-radius: 1.6rem;
  background: #fff;
  box-shadow: 1.5rem 1.3rem 2.8rem 0 rgba(0, 0, 0, 0.06);
  padding: 12.8rem 6rem;
  word-break: keep-all;
  @media screen and (max-width: 767px) {
    width: 25rem;
    min-height: 20rem;
    padding: 3rem;
  }
`;

const Label = styled.div`
  font-family: 'Pretendard-Bold';
  font-size: 3.2rem;
  text-align: center;
  margin: 0 0 3rem 0;
  @media screen and (max-width: 767px) {
    font-size: 2rem;
    margin: 0 0 1.5rem 0;
  }
`;

const Desc = styled.div`
  font-family: 'Pretendard-Bold';
  font-size: 2.8rem;
  text-align: center;
  @media screen and (max-width: 767px) {
    font-size: 1.6rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 2.9rem;
  margin: 6rem 0 0 0;
  @media screen and (max-width: 767px) {
    margin: 3rem 0 0 0;
  }
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
