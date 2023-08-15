import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { CogTrainingProps } from '../../pages/CogTraining';
import { AnswerFeedback } from '../common/AnswerFeedback';

const DAY = ['일', '월', '화', '수', '목', '금', '토'];

type BodyProps = {
  totalDate: number[];
  today: number;
  gameData: CogTrainingProps;
  onGameEnd: () => void;
  saveGameResult: (
    problemId: number,
    duration: number,
    result: string,
    score: number,
  ) => void;
  isNextButtonClicked: boolean;
  setAnswerState: React.Dispatch<React.SetStateAction<string>>;
  answerState: string;
};

const Body = ({
  totalDate,
  today,
  gameData,
  onGameEnd,
  saveGameResult,
  isNextButtonClicked,
  setAnswerState,
  answerState,
}: BodyProps) => {
  // const lastDate = totalDate.indexOf(1);
  // const firstDate = totalDate.indexOf(1, 7);
  let clickedDate = useRef(0);
  const formRefs = useRef<HTMLButtonElement[] | null[]>([]);
  const startTimeRef = useRef<Date | null>(new Date());
  const endTimeRef = useRef<Date | null>(null);
  let duration = useRef(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const checkAnswer = async () => {
    if (clickedDate.current === today) {
      // 정답
      saveGameResult(gameData.problemId, duration.current, 'SUCCESS', 10);
      setAnswerState('correct');
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          setAnswerState('');
          resolve();
        }, 2000);
      });
      onGameEnd();
    } else {
      // 오답
      setAnswerState('incorrect');
    }
  };

  useEffect(() => {
    if (answerState === 'incorrect') {
      const handleIncorrect = async () => {
        saveGameResult(gameData.problemId, duration.current, 'FAIL', 0);
        await new Promise<void>((resolve) => {
          setTimeout(() => {
            setAnswerState('');
            resolve();
          }, 2000);
        });
        setShowAnswer(true);
        await new Promise<void>((resolve) => {
          setTimeout(() => {
            setShowAnswer(false);
            resolve();
          }, 2000);
        });
        onGameEnd();
      };
      handleIncorrect();
    }
  }, [answerState]);

  useEffect(() => {
    if (isNextButtonClicked) {
      endTimeRef.current = new Date();
      if (startTimeRef.current && endTimeRef.current) {
        duration.current =
          (endTimeRef.current.getTime() - startTimeRef.current.getTime()) /
          1000;
      }
      checkAnswer();
    }
  }, [isNextButtonClicked]);

  const onClickDate = (date: number, el: HTMLElement) => {
    if (clickedDate.current === date) {
      el.style.background = '#c6c6c6';
      el.style.border = '0.1rem solid #e4e3e6';
      el.style.color = 'var(--black-color)';
      clickedDate.current = 0;
    } else {
      for (let i = 0; i < formRefs.current.length; i++) {
        const formRef = formRefs.current[i];
        if (formRef?.style.background === 'var(--main-bg-color)') {
          formRef.style.background = '#c6c6c6';
          formRef.style.border = '0.1rem solid #e4e3e6';
          formRef.style.color = 'var(--black-color)';
          break;
        }
      }
      el.style.background = 'var(--main-bg-color)';
      el.style.border = '0.2rem solid var(--main-color)';
      el.style.color = 'var(--main-color)';
      clickedDate.current = date;
    }
  };

  const getWeek = (date: Date) => {
    const currentDate = date.getDate();
    const firstDay = new Date(date.setDate(1)).getDay();

    return Math.ceil((currentDate + firstDay) / 7);
  };

  const week = getWeek(new Date());
  // const quizDate = Math.floor(Math.random() * (30 - 1) + 1);

  // const checkAnswer2 = (index: number) => {
  //   if (totalDate.indexOf(quizDate, lastDate) % 7 === index) {
  //     alert('정답입니다!');
  //   } else {
  //     alert('틀렸습니다 ㅜ.ㅜ');
  //   }
  // };

  return (
    <>
      <Days>
        {DAY.map((item, index) => (
          <Day key={index}>{item}</Day>
        ))}
      </Days>
      <Wrapper>
        {totalDate.slice((week - 1) * 7, week * 7).map((date, idx) => (
          <Form
            ref={(el) => (formRefs.current[formRefs.current.length] = el)}
            key={idx}
            onClick={(e) => onClickDate(date, e.target as HTMLElement)}>
            {date}일
          </Form>
        ))}
      </Wrapper>
      {/* <h1>
        {new Date().getMonth() + 1}월 {quizDate}
        일은 무슨 요일일까요?
      </h1>
      {DAY.map((item, index) => (
        <Button key={index} onClick={() => checkAnswer2(index)}>
          {item}
        </Button>
      ))} */}
      {showAnswer && (
        <AnswerFeedback>
          <ShowAnswer>
            <p>오늘의 날짜는 [{today}일]입니다.</p>
          </ShowAnswer>
        </AnswerFeedback>
      )}
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

const Desc = styled.p`
  font-size: 3.2rem;
  text-align: center;
  margin: 0 0 10rem 0;
  word-break: keep-all;
  @media screen and (max-width: 767px) {
    font-size: 1.8rem;
    margin: 0 0 2rem 0;
  }
`;

const Days = styled.div`
  display: flex;
  margin: 1rem 0 0 0;
`;

const Day = styled.div`
  width: 100%;
  text-align: center;
  &:nth-child(7n + 1),
  &:nth-child(7n) {
    color: red;
  }
  font-size: 3rem;
  @media screen and (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const Form = styled.button`
  position: relative;
  padding: 0 0.6vw;
  width: calc(100% / 7);
  min-height: 9vw;
  text-align: center;
  border: 0.1rem solid #e4e3e6;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #c6c6c6;
  margin: 1rem 0 0 0;
  font-size: 4rem;
  font-family: 'Pretendard-Medium';
  @media screen and (max-width: 768px) {
    font-size: 1.6rem;
    padding: 1.5rem 0;
  }
`;

// const Button = styled.button`
//   padding: 1rem;
//   margin: 2rem;
//   font-size: 5rem;
// `;

const ShowAnswer = styled.div`
  font-size: 5rem;
  width: 50rem;
  height: 50rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--main-bg-color);
  border-radius: 1.3rem;
  box-shadow: 15px 13px 28px 0px rgba(0, 0, 0, 0.06);
  padding: 4rem;
  word-break: keep-all;
  text-align: center;
  @media screen and (max-width: 767px) {
    font-size: 2rem;
    width: 20rem;
    height: 20rem;
    padding: 2rem;
  }
`;

export { Container, Desc, Body };
