import { useNavigate } from 'react-router';
import { styled } from 'styled-components';
import Label from '../components/common/Label';
import { useState } from 'react';
import Input from '../components/common/Input';
import ShortInput from '../components/common/ShortInput';
import Button from '../components/common/Button';
import Header from '../components/common/Header';
import LayerPopup from '../components/common/LayerPopup';
import { useModal } from '../hooks/useModal';
import { usePhoneNumber } from '../hooks/usePhoneNumber';
import { privacyText, termsText } from '../modules/privacyContents';
import { WidthContainer } from '../components/common/Container';

function PhoneNumberSet() {
  const navigate = useNavigate();
  const { isModalOpen, modalText, openModal, closeModal } = useModal();
  const {
    phoneNumber,
    code,
    onChangePhoneNumber,
    onChangeCode,
    sendCode,
    checkCodeCorrect,
  } = usePhoneNumber(openModal);
  const [allChecked, setAllChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [descText, setDescText] = useState('');

  const handleAllCheck = () => {
    setAllChecked(!allChecked);
    setTermsChecked(!allChecked);
    setPrivacyChecked(!allChecked);
  };

  const handleTermsButtonClick = () => {
    openModal('이용약관');
    setDescText(termsText);
  };

  const handlePrivacyButtonClick = () => {
    openModal('개인정보처리방침');
    setDescText(privacyText);
  };

  const goNext = () => {
    if (!checkCodeCorrect()) return;
    navigate('/nameSet', {
      state: { phoneNumber },
    });
  };

  return (
    <WidthContainer>
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
            <CheckboxLabel>
              <CheckboxInput
                type="checkbox"
                checked={allChecked}
                onChange={handleAllCheck}
              />
              전체 동의하기
            </CheckboxLabel>
            <Hr />
            <CheckButtonContainer>
              <CheckboxLabel>
                <CheckboxInput
                  type="checkbox"
                  checked={termsChecked}
                  onChange={() => setTermsChecked((prev) => !prev)}
                />
                (필수)이용약관 동의
              </CheckboxLabel>
              <PrivacyButton onClick={handleTermsButtonClick}>
                내용보기
              </PrivacyButton>
            </CheckButtonContainer>
            <CheckButtonContainer>
              <CheckboxLabel>
                <CheckboxInput
                  type="checkbox"
                  checked={privacyChecked}
                  onChange={() => setPrivacyChecked((prev) => !prev)}
                />
                (필수)개인정보처리방침 동의
              </CheckboxLabel>
              <PrivacyButton onClick={handlePrivacyButtonClick}>
                내용보기
              </PrivacyButton>
            </CheckButtonContainer>
          </CheckContainer>
        </Wrapper>
        <Button
          text="다음"
          disabled={!phoneNumber || !code || !termsChecked || !privacyChecked}
          onClick={goNext}
        />
      </Box>
      {isModalOpen && (
        <LayerPopup
          label={modalText}
          desc={descText}
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

const Wrapper = styled.div``;

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
const CheckContainer = styled.div`
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  width: 41.2rem;
  margin: 3rem auto;
  gap: 1rem;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 1.6rem;
    margin: 1rem auto;
    gap: 0.5rem;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    font-size: 1.3rem;
  }
`;
const CheckboxLabel = styled.label`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin: 1rem 0;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    margin: 0.3rem 0;
  }
  @media screen and (max-width: 767px) {
    gap: 0.5rem;
    margin: 0.5rem 0;
  }
`;
const CheckboxInput = styled.input`
  width: 2rem;
  height: 2rem;
  border: 0.1rem solid #1f1411;
  border-radius: 0.2rem;
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
  background: white;
  color: var(--main-color);
  border: 0.2rem solid var(--main-color);
  border-radius: 5rem;
  font-size: 2rem;
  padding: 0.5rem 1.5rem;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 1.4rem;
  }
  @media screen and (max-width: 767px) {
    font-size: 1.2rem;
    padding: 0 0.8rem;
  }
`;
const Hr = styled.hr`
  background: lightgray;
  height: 1px;
  width: 100%;
  border: 0;
`;
const CheckButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default PhoneNumberSet;
