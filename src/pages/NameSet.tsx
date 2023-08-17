import { useLocation, useNavigate } from 'react-router';
import { styled } from 'styled-components';
import Label from '../components/common/Label';
import { useState } from 'react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import axios from 'axios';
import { useAppDispatch } from '../store';
import userSlice from '../slices/user';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import Header from '../components/common/Header';

function NameSet() {
  const { state } = useLocation();
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const fontSize = useSelector((state: RootState) => state.user.fontSize);
  const [isCheckedPrivacy, setIsCheckedPrivacy] = useState(false);

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.trim());
  };

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value.trim());
  };

  const signUp = async () => {
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
        alert(data.message);
        return;
      }
      dispatch(
        userSlice.actions.setUser({
          name,
          nickname,
          fontSize,
          phoneNumber: state.phoneNumber,
          familyKey: data.result.patientDetailDto.familyKey,
          accessToken: data.result.tokenDto.accessTokenDto.accessToken,
        }),
      );
      await localStorage.setItem(
        'refreshToken',
        data.result.tokenDto.refreshTokenDto.refreshToken,
      );
      await localStorage.setItem(
        'accessToken',
        data.result.tokenDto.accessTokenDto.accessToken,
      );
      alert('회원가입에 성공하였습니다.');
      navigate('/home');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
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
          <CheckContainer>
            <CheckboxLabel htmlFor="privacy">
              <CheckboxInput
                id="privacy"
                type="checkbox"
                checked={isCheckedPrivacy}
                onChange={() => setIsCheckedPrivacy((prev) => !prev)}
              />
              회원가입 및 이용약관에 동의합니다.
            </CheckboxLabel>
            <span onClick={() => navigate('/privacy')}>
              * 이용약관 확인하기
            </span>
          </CheckContainer>
        </Wrapper>
        <Button
          disabled={!name || !nickname || !isCheckedPrivacy}
          onClick={signUp}>
          회원가입
        </Button>
      </Box>
    </Container>
  );
}

const Container = styled.div`
  max-width: 192rem;
  display: flex;
  justify-content: center;
  padding: 1.6rem;
  height: 100vh;
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
  @media screen and (max-width: 767px) {
    font-size: 1.8rem;
    margin: 0 0 1rem 0;
  }
`;
const CheckContainer = styled.div`
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  width: 41.2rem;
  margin: 0 auto;
  @media screen and (max-width: 767px) {
    width: 100%;
    font-size: 1.6rem;
  }
`;
const CheckboxLabel = styled.label`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin: 0 0 1rem 0;
  @media screen and (max-width: 767px) {
    gap: 0.5rem;
  }
`;
const CheckboxInput = styled.input`
  width: 2rem;
  height: 2rem;
  border: 0.1rem solid #1f1411;
  position: relative;
  &:checked {
    &::before {
      content: '\\2713';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 3.5rem;
      color: var(--main-color);
    }
  }
`;

export default NameSet;
