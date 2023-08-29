import { useNavigate } from 'react-router';
import { styled } from 'styled-components';
import Label from '../components/common/Label';
import { useState } from 'react';
import Input from '../components/common/Input';
import ShortInput from '../components/common/ShortInput';
import Button from '../components/common/Button';
import axios from 'axios';
import Header from '../components/common/Header';

export const phoneNumberRegex = /^01(0|1|[6-9])\d{3,4}\d{4}$/;

function PhoneNumberSet() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [authNum, setAuthNum] = useState('');
  const navigate = useNavigate();
  const [isCheckedPrivacy, setIsCheckedPrivacy] = useState(false);

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

  const goNext = () => {
    if (code !== authNum) {
      alert('인증번호가 올바르지 않습니다. 다시 입력해주세요.');
      return;
    }
    navigate('/nameSet', {
      state: { phoneNumber },
    });
  };

  return (
    <Container>
      <Header label="회원가입" />
      <Box>
        <Wrapper>
          <Label style={{ textAlign: 'center' }}>전화번호 인증</Label>
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
          <CheckContainer>
            <CheckboxLabel htmlFor="privacy">
              <CheckboxInput
                id="privacy"
                type="checkbox"
                checked={isCheckedPrivacy}
                onChange={() => setIsCheckedPrivacy((prev) => !prev)}
              />
              개인정보처리방침 및 이용약관에 동의합니다.
            </CheckboxLabel>
            <PrivacyButton
              onClick={() =>
                window.open(
                  'http://brain-vitamin-web-front-deploy.s3-website.ap-northeast-2.amazonaws.com/privacy',
                  '_blank',
                )
              }>
              <span>* 개인정보처리방침 보기</span>
              <span style={{ color: 'gray', fontWeight: 'bold' }}>{'>'}</span>
            </PrivacyButton>
          </CheckContainer>
        </Wrapper>
        <Button
          disabled={!phoneNumber || !code || !isCheckedPrivacy}
          onClick={goNext}>
          다음
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
  margin: 2rem 0;
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
const PrivacyButton = styled.button`
  display: flex;
  justify-content: space-between;
  background: var(--main-bg-color);
  padding: 1rem;
  border-radius: 1rem;
  font-size: 2rem;
  align-items: center;
`;

export default PhoneNumberSet;
