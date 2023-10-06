import { styled } from 'styled-components';
import Label from '../components/common/Label';
import Input from '../components/common/Input';
import ShortInput from '../components/common/ShortInput';
import Button from '../components/common/Button';
import axios from 'axios';
import BottomTapBar from '../components/common/BottomTabBar';
import LeftTapBar from '../components/common/LeftTabBar';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import { useAppDispatch } from '../store';
import userSlice from '../slices/user';
import LayerPopup from '../components/common/LayerPopup';
import { useModal } from '../hooks/useModal';
import { usePhoneNumber } from '../hooks/usePhoneNumber';

function PhoneNumberEdit() {
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const dispatch = useAppDispatch();
  const { isModalOpen, modalText, openModal, closeModal } = useModal();
  const {
    phoneNumber,
    code,
    onChangePhoneNumber,
    onChangeCode,
    sendCode,
    checkCodeCorrect,
  } = usePhoneNumber(openModal);

  const handleSave = async () => {
    if (!checkCodeCorrect()) return;
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/patient/phone-number`,
        {
          phoneNumber,
        },
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
      );
      dispatch(userSlice.actions.setPhoneNumber(phoneNumber));
      openModal(data.result, '/setting');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <LeftTapBar />
      <Container2>
        <Container3>
          <Box>
            <Wrapper>
              <Label style={{ textAlign: 'center' }}>전화번호 변경하기</Label>
              <Margin1 />
              <ShortInput
                label="전화번호"
                desc="010 1234 5678"
                value={phoneNumber}
                callbackFn={onChangePhoneNumber}
                buttonText="인증하기"
                onClickButton={sendCode}
              />
              <Margin2 />
              <Input
                label="인증번호"
                desc="인증번호를 입력해주세요"
                value={code}
                callbackFn={onChangeCode}
              />
            </Wrapper>
            <Button disabled={!phoneNumber || !code} onClick={handleSave}>
              저장
            </Button>
          </Box>
        </Container3>
      </Container2>
      <BottomTapBar />
      {isModalOpen && (
        <LayerPopup
          label={modalText}
          centerButtonText="확인"
          onClickCenterButton={closeModal}
        />
      )}
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
    flex-direction: column;
    width: 140rem;
  }
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 80rem;
  }
  @media screen and (max-width: 767px) {
    flex-wrap: wrap;
    padding: 3rem 1.6rem;
    gap: 1rem;
    align-content: flex-start;
  }
`;
const Container3 = styled.div`
  max-width: 192rem;
  display: flex;
  justify-content: center;
  padding: 1.6rem;
  align-items: center;
`;

const Box = styled.div`
  width: 86.8rem;
  height: 71.9rem;
  border-radius: 16px;
  background: #fff;
  box-shadow: 15px 13px 28px 0px rgba(0, 0, 0, 0.06);
  padding: 7.2rem 0 4.6rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 60rem;
    height: 40rem;
    padding: 2rem;
  }
  @media screen and (max-width: 767px) {
    width: 25rem;
    height: 35rem;
    padding: 1.6rem;
  }
`;

const Wrapper = styled.div``;

const Margin1 = styled.div`
  margin: 8.2rem 0 0 0;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    margin: 4rem 0 0 0;
  }
  @media screen and (max-width: 767px) {
    margin: 4rem 0 0 0;
  }
`;

const Margin2 = styled.div`
  margin: 0 0 1.6rem 0;
  @media screen and (max-width: 767px) {
    margin: 0 0 0.8rem 0;
  }
`;

export default PhoneNumberEdit;
