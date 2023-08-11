import { useLocation, useNavigate } from 'react-router';
import { styled } from 'styled-components';
import Label from '../components/common/Label';
import { useState } from 'react';
import Button from '../components/common/Button';
import axios from 'axios';

function EducationSet() {
  const { state } = useLocation();
  const [education, setEducation] = useState('');
  const navigate = useNavigate();

  const goNext = () => {
    const postUserDetails = async () => {
      try {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/patient/vitamins/user-details`,
          {
            education,
            birthDate: state.birthDate,
            gender: state.gender,
          },
        );
      } catch (error) {
        console.error(error);
      }
    };
    postUserDetails();
    navigate(`/${state.nextToDo}`);
  };

  return (
    <Container>
      <Box>
        <Wrapper>
          <Label style={{ textAlign: 'center' }}>최종학력</Label>
          <ButtonWrapper>
            <EduButton
              style={{
                background:
                  education === '무학' ? 'var(--main-bg-color)' : 'white',
                border:
                  education === '무학'
                    ? '0.2rem solid var(--main-color)'
                    : '0.2rem solid #E8E8E8',
                color: education === '무학' ? 'var(--main-color)' : '#433D3A',
              }}
              onClick={() => setEducation('무학')}>
              무학
            </EduButton>
            <EduButton
              style={{
                background:
                  education === '초졸' ? 'var(--main-bg-color)' : 'white',
                border:
                  education === '초졸'
                    ? '0.2rem solid var(--main-color)'
                    : '0.2rem solid #E8E8E8',
                color: education === '초졸' ? 'var(--main-color)' : '#433D3A',
              }}
              onClick={() => setEducation('초졸')}>
              초졸
            </EduButton>
            <EduButton
              style={{
                background:
                  education === '중졸' ? 'var(--main-bg-color)' : 'white',
                border:
                  education === '중졸'
                    ? '0.2rem solid var(--main-color)'
                    : '0.2rem solid #E8E8E8',
                color: education === '중졸' ? 'var(--main-color)' : '#433D3A',
              }}
              onClick={() => setEducation('중졸')}>
              중졸
            </EduButton>
            <EduButton
              style={{
                background:
                  education === '고졸' ? 'var(--main-bg-color)' : 'white',
                border:
                  education === '고졸'
                    ? '0.2rem solid var(--main-color)'
                    : '0.2rem solid #E8E8E8',
                color: education === '고졸' ? 'var(--main-color)' : '#433D3A',
              }}
              onClick={() => setEducation('고졸')}>
              고졸
            </EduButton>
            <EduButton
              style={{
                background:
                  education === '대졸' ? 'var(--main-bg-color)' : 'white',
                border:
                  education === '대졸'
                    ? '0.2rem solid var(--main-color)'
                    : '0.2rem solid #E8E8E8',
                color: education === '대졸' ? 'var(--main-color)' : '#433D3A',
              }}
              onClick={() => setEducation('대졸')}>
              대졸
            </EduButton>
          </ButtonWrapper>
        </Wrapper>
        <Button disabled={!education} onClick={goNext}>
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
    height: 60rem;
    padding: 1.6rem;
  }
`;

const Wrapper = styled.div`
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

const ButtonWrapper = styled.div`
  width: 41.2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 5.3rem 0 0 0;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

const EduButton = styled.button`
  width: 100%;
  height: 5.7rem;
  border-radius: 8px;
  font-family: 'Pretendard-Medium';
  font-size: 2.2rem;
`;

export default EducationSet;
