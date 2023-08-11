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
        navigate('/logIn');
        return;
      }
      dispatch(
        userSlice.actions.setUser({
          name,
          nickname,
          fontSize,
          phoneNumber: state.phoneNumber,
          familyKey: data.result.familyKey,
          accessToken: data.result.accessTokenDto.accessToken,
        }),
      );
      await localStorage.setItem(
        'refreshToken',
        data.result.refreshTokenDto.refreshToken,
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
                style={{ margin: '0 0 2.9rem 0' }}
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
        <Button disabled={!name || !nickname} onClick={signUp}>
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
    height: 60rem;
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
`;

const Section = styled.div`
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

const Intro = styled.p`
  font-family: 'Pretendard-Medium';
  font-size: 2.2rem;
  margin: 0 0 2.4rem 0;
  @media screen and (max-width: 767px) {
    font-size: 2rem;
  }
`;

export default NameSet;
