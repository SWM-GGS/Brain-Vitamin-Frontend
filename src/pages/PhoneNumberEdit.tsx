import { useNavigate } from 'react-router';
import { styled } from 'styled-components';
import Label from '../components/common/Label';
import { useState } from 'react';
import Input from '../components/common/Input';
import ShortInput from '../components/common/ShortInput';
import Button from '../components/common/Button';
import axios from 'axios';
import BottomTapBar from '../components/common/BottomTapBar';
import LeftTapBar from '../components/common/LeftTapBar';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import { useAppDispatch } from '../store';
import userSlice from '../slices/user';
import { phoneNumberRegex } from './PhoneNumberSet';

function PhoneNumberEdit() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [authNum, setAuthNum] = useState('');
  const navigate = useNavigate();
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const dispatch = useAppDispatch();

  const onChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value.trim());
  };

  const onChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value.trim());
  };

  const sendCode = async () => {
    if (!phoneNumberRegex.test(phoneNumber)) {
      alert('전화번호를 올바르게 입력해주세요.');
      return;
    }
    alert('인증번호가 전송되었습니다.');
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/patient/sms`,
        {
          to: phoneNumber,
          content: '',
        },
      );
      setAuthNum(data.result.authNum);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    if (code !== authNum) {
      alert('인증번호가 올바르지 않습니다. 다시 입력해주세요.');
      return;
    }
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
      alert(data.result);
      navigate('/setting');
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
  height: 100vh;
  @media screen and (min-width: 768px) {
    align-items: center;
    flex-direction: column;
    width: 140rem;
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
  @media screen and (max-width: 767px) {
    width: 25rem;
    height: 35rem;
    padding: 1.6rem;
  }
`;

const Wrapper = styled.div``;

const Margin1 = styled.div`
  margin: 8.2rem 0 0 0;
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
