import { useLocation } from 'react-router';
import { styled } from 'styled-components';
import Label from '../components/common/Label';
import { useState } from 'react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import axios, { AxiosError } from 'axios';
import { useAppDispatch } from '../store';
import userSlice from '../slices/user';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import Header from '../components/common/Header';
import LayerPopup from '../components/common/LayerPopup';
import { useModal } from '../hooks/useModal';
import { WidthContainer } from '../components/common/Container';
import { getErrorMessage } from '../utils/getErrorMessage';

function NameSet() {
  const { state } = useLocation();
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const dispatch = useAppDispatch();
  const fontSize = useSelector((state: RootState) => state.user.fontSize);
  const { isModalOpen, modalText, openModal, closeModal } = useModal();
  const [submitLoading, setSubmitLoading] = useState(false);

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.trim());
  };

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value.trim());
  };

  const signUp = async () => {
    setSubmitLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/patient/signup`,
        {
          name,
          nickname,
          fontSize,
          phoneNumber: state.phoneNumber,
        },
      );
      if (!data.isSuccess) {
        openModal(data.message);
        return;
      }
      const { id, familyKey, familyId } = data.result.patientDetailDto;
      dispatch(
        userSlice.actions.setUser({
          id,
          name,
          nickname,
          fontSize,
          phoneNumber: state.phoneNumber,
          familyKey,
          familyId,
          accessToken: data.result.tokenDto.accessTokenDto.accessToken,
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
      openModal('회원가입에 성공하였습니다.', '/home');
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
    <WidthContainer>
      <Header label="회원가입" />
      <Box>
        <Wrapper>
          <Label style={{ textAlign: 'center' }}>회원 정보 입력</Label>
          <InputWrapper>
            <Section>
              <Intro>이름을 입력해주세요</Intro>
              <Input
                label="이름"
                desc="이름을 입력해주세요"
                value={name}
                callbackFn={onChangeName}
              />
            </Section>
            <Section>
              <Intro>별명을 입력해주세요</Intro>
              <Input
                label="별명"
                desc="별명을 입력해주세요"
                value={nickname}
                callbackFn={onChangeNickname}
              />
            </Section>
          </InputWrapper>
        </Wrapper>
        <Button
          text="회원가입"
          disabled={!name || !nickname}
          onClick={signUp}
          loading={submitLoading}
        />
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
    height: 43rem;
    padding: 2rem;
  }
  @media screen and (max-width: 767px) {
    width: 35rem;
    height: 50rem;
    padding: 1.6rem;
  }
`;

const Wrapper = styled.div`
  width: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 8.2rem 0 0 0;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    margin: 2rem 0 0 0;
  }
  @media screen and (max-width: 767px) {
    margin: 4rem 0 0 0;
  }
`;

const Section = styled.div`
  margin: 0 0 2.9rem 0;
  @media screen and (max-width: 767px) {
    width: 100%;
    margin: 0 0 1.4rem 0;
  }
`;

const Intro = styled.p`
  font-family: 'Pretendard-Medium';
  font-size: 2.2rem;
  margin: 0 0 2.4rem 0;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    margin: 0 0 1rem 0;
  }
  @media screen and (max-width: 767px) {
    font-size: 1.8rem;
    margin: 0 0 1rem 0;
  }
`;

export default NameSet;
