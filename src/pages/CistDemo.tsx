import { useEffect, useRef } from 'react';
import cist1Sound from '/assets/sounds/cist1.mp3';
import cist2Sound from '/assets/sounds/cist2.mp3';
import cist3Sound from '/assets/sounds/cist3.mp3';
import { useModal } from '../hooks/useModal';
import LayerPopup from '../components/common/LayerPopup';
import correctSound from '/assets/sounds/correct.mp3';

function CistDemo() {
  const { isModalOpen, modalText, openModal, closeModal } = useModal();
  const img1ref = useRef<HTMLImageElement | null>(null);
  const img2ref = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    openModal('인지선별검사를 시작합니다.');
  }, []);

  const goNext = (id: number) => {
    if (img1ref.current && img2ref.current) {
      if (id === 1) {
        img2ref.current.style.display = 'block';
        img1ref.current.style.display = 'none';
        const audio = new Audio(cist3Sound);
        audio.play();
        setTimeout(() => {
          const audio = new Audio(correctSound);
          audio.play();
        }, 7000);
      }
    }
  };

  const handleModal = () => {
    closeModal();
    const audio = new Audio(cist2Sound);
    audio.play();
    setTimeout(() => {
      const audio = new Audio(correctSound);
      audio.play();
    }, 16000);
  };

  return (
    <div>
      <img
        ref={img1ref}
        style={{ width: '100%' }}
        alt=""
        src="/assets/images/cist1.png"
        onClick={() => goNext(1)}
      />
      <img
        ref={img2ref}
        style={{ width: '100%', display: 'none' }}
        alt=""
        src="/assets/images/cist2.png"
        onClick={() => goNext(2)}
      />
      {isModalOpen && (
        <LayerPopup
          label={modalText}
          centerButtonText="확인"
          onClickCenterButton={handleModal}
          sound={cist1Sound}
        />
      )}
    </div>
  );
}

export default CistDemo;
