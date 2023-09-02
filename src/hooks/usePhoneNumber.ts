import { useState } from 'react';
import axios from 'axios';

export const usePhoneNumber = (
  openModal: (text: string, path?: string) => void,
) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [authNum, setAuthNum] = useState('');
  const phoneNumberRegex = /^01(0|1|[6-9])\d{3,4}\d{4}$/;

  const onChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value.trim());
  };

  const onChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value.trim());
  };

  const sendCode = async () => {
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
      setAuthNum(data.result.authNum);
    } catch (error) {
      console.error(error);
    }
  };

  const checkCodeCorrect = () => {
    if (code !== authNum) {
      openModal('인증번호가 올바르지 않습니다. 다시 입력해주세요.');
      return false;
    }
    return true;
  };

  return {
    phoneNumber,
    code,
    onChangePhoneNumber,
    onChangeCode,
    sendCode,
    checkCodeCorrect,
  };
};
