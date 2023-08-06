import { useLocation, useNavigate } from 'react-router';
import { styled } from 'styled-components';
import Label from '../components/common/Label';
import { useState } from 'react';
import Input from '../components/common/Input';
import ShortInput from '../components/common/ShortInput';
import Button from '../components/common/Button';

function PhoneNumberSet() {
  const { state } = useLocation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const onChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const onChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const goNext = () => {
    navigate('/nameSet', {
      state: { fontSize: state.fontSize, phoneNumber },
    });
  };

  return (
    <Container>
      <Box>
        <Wrapper>
          <Label style={{ textAlign: 'center' }}>전화번호 인증</Label>
          <ShortInput
            style={{ margin: '8.2rem 0 1.6rem 0' }}
            label="전화번호"
            desc="010 1234 5678"
            value={phoneNumber}
            callbackFn={onChangePhoneNumber}
            buttonText="인증하기"
          />
          <Input
            label="인증번호"
            desc="인증번호를 입력해주세요"
            value={code}
            callbackFn={onChangeCode}
          />
        </Wrapper>
        <Button disabled={!phoneNumber || !code} onClick={goNext}>
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
  margin: 16rem 0 0 0;
  @media screen and (max-width: 767px) {
    margin: 3rem 0 0 0;
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
  @media screen and (max-width: 767px) {
    width: 35rem;
    height: 60rem;
    padding: 1.6rem;
  }
`;

const Wrapper = styled.div``;

export default PhoneNumberSet;
