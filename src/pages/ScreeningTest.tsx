import { useEffect, useState } from 'react';
import Button from '../components/common/Button';
import { styled } from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import { useNavigate } from 'react-router';

function ScreeningTest() {
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  type Props = {
    idx: number;
    description: string;
  };
  const [questions, setQuestions] = useState<Props[][]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [choices, setChoices] = useState<number[]>([]);
  const stepCnt = 5;
  const chunkSize = 3;
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/patient/vitamins/screening-test`,
          {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          },
        );
        let questionArr: Props[] = [];
        for (let i = 0; i < data.result.length; i++) {
          questionArr.push({
            idx: i + 1,
            description: data.result[i].description,
          });
        }
        let chunkedQuestions = [];
        for (let i = 0; i < questionArr.length; i += chunkSize) {
          chunkedQuestions.push(questionArr.slice(i, i + chunkSize));
        }
        setQuestions(chunkedQuestions);
        setChoices(Array(questionArr.length + 1).fill(-1));
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  const handleNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onClickChoice = (questionIndex: number, choice: number) => {
    const newChoices = [...choices];
    newChoices[questionIndex] = choice;
    setChoices(newChoices);
  };

  const onSubmit = async () => {
    const submittedChoices = choices.slice(1);
    if (submittedChoices.includes(-1)) {
      alert('체크하지 않은 문항이 있습니다. 다시 확인해주세요.');
      return;
    }
    const totalScore = submittedChoices.reduce((p, c) => p + c, 0);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/patient/vitamins/screening-test`,
        { score: totalScore },
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
      );
      navigate('/screeningTestResult', {
        state: { cogLevel: data.result.cogLevel, totalScore },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Wrapper>
        <ProgressBarWrapper>
          {Array.from({ length: stepCnt }).map((_, i) => (
            <Circle
              style={{
                background:
                  i + 1 <= currentStep ? 'var(--main-color)' : '#E1E1E1',
              }}
              key={i}
              $step={i + 1}
              $currentStep={currentStep}>
              <span>{i + 1}</span>
            </Circle>
          ))}
        </ProgressBarWrapper>
        <Box>
          <Desc>
            <ChoiceLabel>아니다(0)</ChoiceLabel>
            <ChoiceLabel>가끔 그렇다(1)</ChoiceLabel>
            <ChoiceLabel>자주 그렇다(2)</ChoiceLabel>
          </Desc>
          {questions.length
            ? questions[currentStep - 1].map((question) => (
                <QuestionWrapper key={question.idx}>
                  <Question>
                    {question.idx}. {question.description}
                  </Question>
                  <ChoiceWrapper>
                    <ChoiceButton
                      style={{
                        background:
                          choices[question.idx] === 0
                            ? 'var(--main-bg-color)'
                            : '#C6C6C6',
                        border:
                          choices[question.idx] === 0
                            ? '0.2rem solid var(--main-color)'
                            : 'none',
                        color:
                          choices[question.idx] === 0
                            ? 'var(--main-color)'
                            : 'var(--black-color)',
                      }}
                      onClick={() => onClickChoice(question.idx, 0)}>
                      0
                    </ChoiceButton>
                    <ChoiceButton
                      style={{
                        background:
                          choices[question.idx] === 1
                            ? 'var(--main-bg-color)'
                            : '#C6C6C6',
                        border:
                          choices[question.idx] === 1
                            ? '0.2rem solid var(--main-color)'
                            : 'none',
                        color:
                          choices[question.idx] === 1
                            ? 'var(--main-color)'
                            : 'var(--black-color)',
                      }}
                      onClick={() => onClickChoice(question.idx, 1)}>
                      1
                    </ChoiceButton>
                    <ChoiceButton
                      style={{
                        background:
                          choices[question.idx] === 2
                            ? 'var(--main-bg-color)'
                            : '#C6C6C6',
                        border:
                          choices[question.idx] === 2
                            ? '0.2rem solid var(--main-color)'
                            : 'none',
                        color:
                          choices[question.idx] === 2
                            ? 'var(--main-color)'
                            : 'var(--black-color)',
                      }}
                      onClick={() => onClickChoice(question.idx, 2)}>
                      2
                    </ChoiceButton>
                  </ChoiceWrapper>
                </QuestionWrapper>
              ))
            : null}
        </Box>
        <ButtonWrapper>
          <Button onClick={handlePrevStep} disabled={currentStep === 1}>
            이전
          </Button>
          {currentStep === stepCnt ? (
            <Button onClick={onSubmit}>제출</Button>
          ) : (
            <Button onClick={handleNextStep}>다음</Button>
          )}
        </ButtonWrapper>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  padding: 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Wrapper = styled.div``;

const Box = styled.div`
  width: 146.3rem;
  height: 75rem;
  border-radius: 1.6rem;
  background: #fff;
  box-shadow: 1.5rem 1.3rem 2.8rem 0 rgba(0, 0, 0, 0.06);
  padding: 3rem;
  margin: 2.55rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media screen and (max-width: 767px) {
    width: 30rem;
    height: 36rem;
    padding: 1.6rem;
    margin: 1.3rem 0;
  }
`;

const ProgressBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  @media screen and (max-width: 767px) {
    gap: 1rem;
  }
`;

const Circle = styled.div<{ $step: number; $currentStep: number }>`
  width: 12.5rem;
  height: 12.5rem;
  color: white;
  border: 0.5rem solid white;
  border-radius: 50%;
  font-size: 7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  @media screen and (max-width: 767px) {
    width: 4rem;
    height: 4rem;
    font-size: 2rem;
    border: 0.2rem solid white;
  }
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: -50%;
    width: 6rem;
    height: 1rem;
    background: ${(props) =>
      props.$step <= props.$currentStep
        ? 'linear-gradient(90deg, #FF9432 0%, #FFD4AD 100%)'
        : '#e1e1e1'};
    transform: translateY(-50%);
    z-index: -1;
    @media screen and (max-width: 767px) {
      width: 3rem;
      height: 0.5rem;
    }
  }
  &:first-child::before {
    content: none;
  }
`;

const QuestionWrapper = styled.div`
  display: flex;
  display: flex;
  justify-content: space-between;
  width: 130rem;
  margin: 0 auto;
  align-items: center;
  border-bottom: 0.2rem solid #c6c6c6;
  padding: 4rem 0;
  &:last-child {
    border: none;
  }
  @media screen and (max-width: 767px) {
    width: 26rem;
    flex-wrap: wrap;
    justify-content: center;
    padding: 1rem 0;
  }
`;

const ChoiceWrapper = styled.div`
  display: flex;
  gap: 11rem;
  @media screen and (max-width: 767px) {
    gap: 2rem;
  }
`;

const ChoiceButton = styled.button`
  border-radius: 0.8rem;
  font-size: 4rem;
  padding: 2rem 2.5rem;
  @media screen and (max-width: 767px) {
    font-size: 1.4rem;
    padding: 1rem 1.5rem;
  }
`;

const Question = styled.p`
  font-size: 4rem;
  word-break: keep-all;
  font-family: 'Pretendard-Medium';
  @media screen and (max-width: 767px) {
    font-size: 1.6rem;
    margin: 0 0 1rem 0;
    text-align: center;
  }
`;

const Desc = styled.div`
  width: 135rem;
  margin: 0 auto;
  text-align: end;
  font-size: 2.8rem;
  @media screen and (max-width: 767px) {
    width: 27rem;
    font-size: 1.4rem;
    display: flex;
    justify-content: space-between;
  }
`;

const ChoiceLabel = styled.span`
  margin: 0 0 0 2rem;
  @media screen and (max-width: 767px) {
    margin: 0;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
`;

export default ScreeningTest;
