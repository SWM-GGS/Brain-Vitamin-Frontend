import { useNavigate } from 'react-router';
import { styled } from 'styled-components';
import Label from '../components/common/Label';
import { useState } from 'react';
import Input from '../components/common/Input';
import ShortInput from '../components/common/ShortInput';
import Button from '../components/common/Button';
import axios, { AxiosError } from 'axios';
import { useAppDispatch } from '../store';
import userSlice from '../slices/user';
import LayerPopup from '../components/common/LayerPopup';
import { useModal } from '../hooks/useModal';
import { WidthContainer } from '../components/common/Container';
import { getErrorMessage } from '../utils/getErrorMessage';

function LogIn() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [authNum, setAuthNum] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isModalOpen, modalText, openModal, closeModal } = useModal();
  const [submitLoading, setSubmitLoading] = useState(false);

  const onChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value.trim());
  };

  const onChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value.trim());
  };

  const sendCode = async () => {
    if (phoneNumber === '01012345678') {
      openModal(
        '해당 계정은 어드민 계정입니다. 인증번호 입력란에 제공된 비밀번호를 입력하고 로그인해주세요.',
      );
      return;
    }
    const phoneNumberRegex = /^01(0|1|[6-9])\d{3,4}\d{4}$/;
    if (!phoneNumberRegex.test(phoneNumber)) {
      openModal('전화번호를 올바르게 입력해주세요.');
      return;
    }
    openModal('인증번호가 전송되었습니다.');
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/patient/sms`,
        {
          to: phoneNumber,
          content: '',
        },
      );
      if (!data.isSuccess) {
        openModal(data.message);
        return;
      }
      setAuthNum(data.result.authNum);
    } catch (error) {
      console.error(error);
      const axiosError = error as AxiosError;
      const errorMessage = getErrorMessage(axiosError);
      openModal(errorMessage);
    }
  };

  const handleLogIn = () => {
    const logIn = async () => {
      setSubmitLoading(true);
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/patient/login`,
          {
            phoneNumber,
            status: 'ACTIVE',
            authorities: [
              {
                authority: 'PATIENT',
              },
            ],
          },
        );
        if (!data.isSuccess) {
          openModal(data.message);
          return;
        }
        const {
          id,
          name,
          nickname,
          familyKey,
          familyId,
          fontSize,
          profileImgUrl,
          education,
        } = data.result.patientDetailDto;
        dispatch(
          userSlice.actions.setUser({
            id,
            name,
            nickname,
            phoneNumber,
            familyKey,
            familyId,
            fontSize,
            accessToken: data.result.tokenDto.accessTokenDto.accessToken,
            profileImgUrl,
            education,
          }),
        );
        localStorage.setItem(
          'refreshToken',
          data.result.tokenDto.refreshTokenDto.refreshToken,
        );
        localStorage.setItem(
          'accessToken',
          data.result.tokenDto.accessTokenDto.accessToken,
        );
        navigate('/home');
      } catch (error) {
        console.error(error);
        const axiosError = error as AxiosError;
        const errorMessage = getErrorMessage(axiosError);
        openModal(errorMessage);
      } finally {
        setSubmitLoading(false);
      }
    };
    if (phoneNumber === '01012345678' && code === '123456') {
      logIn();
      return;
    }
    if (code !== authNum) {
      openModal('인증번호가 올바르지 않습니다. 다시 입력해주세요.');
      return;
    }
    logIn();
  };

  const toSignUp = () => {
    navigate('/phoneNumberSet');
  };

  return (
    <WidthContainer>
      <Box>
        <Wrapper>
          <Label style={{ textAlign: 'center' }}>로그인</Label>
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
          <Margin3 />
          <Button
            text="로그인"
            disabled={!phoneNumber || !code}
            onClick={handleLogIn}
            loading={submitLoading}
          />
        </Wrapper>
        <Button text="처음이신가요? 회원가입하기" onClick={toSignUp} />
      </Box>
      {isModalOpen && (
        <LayerPopup
          label={modalText}
          centerButtonText="확인"
          onClickCenterButton={closeModal}
          closeModal={closeModal}
        />
      )}
    </WidthContainer>
  );
}

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
    width: 800px;
    height: 550px;
    padding: 2rem;
  }
  @media screen and (max-width: 767px) {
    width: 35rem;
    height: 50rem;
    padding: 1.6rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Margin1 = styled.div`
  margin: 8.2rem 0 0 0;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    margin: 2rem 0 0 0;
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

const Margin3 = styled.div`
  margin: 3rem 0 0 0;
  @media screen and (max-width: 767px) {
    margin: 1.5rem 0 0 0;
  }
`;

export default LogIn;
