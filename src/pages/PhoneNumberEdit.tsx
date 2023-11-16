import { styled } from 'styled-components';
import Label from '../components/common/Label';
import Input from '../components/common/Input';
import ShortInput from '../components/common/ShortInput';
import Button from '../components/common/Button';
import axios, { AxiosError } from 'axios';
import BottomTapBar from '../components/common/BottomTabBar';
import LeftTapBar from '../components/common/LeftTabBar';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import { useAppDispatch } from '../store';
import userSlice from '../slices/user';
import LayerPopup from '../components/common/LayerPopup';
import { useModal } from '../hooks/useModal';
import { usePhoneNumber } from '../hooks/usePhoneNumber';
import { SideContainer } from '../components/common/Container';
import { getErrorMessage } from '../utils/getErrorMessage';
import { useState } from 'react';

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
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleSave = async () => {
    if (!checkCodeCorrect()) return;
    setSubmitLoading(true);
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
      if (!data.isSuccess) {
        openModal(data.message);
        return;
      }
      dispatch(userSlice.actions.setPhoneNumber(phoneNumber));
      openModal(data.result, '/setting');
    } catch (error) {
      console.error(error);
      const axiosError = error as AxiosError;
      const errorMessage = getErrorMessage(axiosError);
      openModal(errorMessage);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <Container>
      <LeftTapBar />
      <SideContainer>
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
          <Button
            text="저장"
            disabled={!phoneNumber || !code}
            onClick={handleSave}
            loading={submitLoading}
          />
        </Box>
      </SideContainer>
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
    width: 100%;
    height: 440px;
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
