import { useEffect, useRef, useState } from 'react';
import { GameProps } from '../../routes/gameRouter';
import { getRandomFloat } from '../../utils/random';
import {
  Container,
  Expression,
  Num,
} from '../../components/games/BasicCalculate';
import { Button, ButtonContainer } from '../../components/common/GameButton';

function BasicCalculate({
  gameData,
  onGameEnd,
  saveGameResult,
  isNextButtonClicked,
  setAnswerState,
  answerState,
}: GameProps) {
  const difficulty = gameData.difficulty;
  const startTimeRef = useRef<Date | null>(new Date());
  const endTimeRef = useRef<Date | null>(null);
  const duration = useRef(0);
  const clickedNum = useRef(10000);
  const buttonRefs = useRef<HTMLButtonElement[] | null[]>([]);
  const [answer, setAnswer] = useState<number>();
  const [number1, setNumber1] = useState<number | null>(null);
  const [number2, setNumber2] = useState<number | null>(null);
  const [number3, setNumber3] = useState<number | null>(null);
  const [number4, setNumber4] = useState<number | null>(null);
  const [operation1, setOperation1] = useState('');
  const [operation2, setOperation2] = useState('');
  const getValue1 = () => Math.floor(getRandomFloat() * 200);
  const getValue2 = () => Math.floor(getRandomFloat() * 19 + 1);

  useEffect(() => {
    if (difficulty === 1) {
      const operation = getRandomFloat() < 0.5 ? '+' : '-';
      const answerPosition = Math.floor(getRandomFloat() * 2 + 1);
      const x = getValue1();
      const y = getValue1();

      if (operation === '+') {
        setOperation1('+');
        if (answerPosition === 1) {
          // ? + x = y
          const answer = y - x;
          setAnswer(answer);
          setNumber2(x);
          setNumber3(y);
        } else if (answerPosition === 2) {
          // x + ? = y
          const answer = y - x;
          setAnswer(answer);
          setNumber1(x);
          setNumber3(y);
        } else {
          // x + y = ?
          const answer = x + y;
          setAnswer(answer);
          setNumber1(x);
          setNumber2(y);
        }
      } else {
        setOperation1('-');
        if (answerPosition === 1) {
          // ? - x = y
          const answer = x + y;
          setAnswer(answer);
          setNumber2(x);
          setNumber3(y);
        } else if (answerPosition === 2) {
          // x - ? = y
          const answer = x - y;
          setAnswer(answer);
          setNumber1(x);
          setNumber3(y);
        } else {
          // x - y = ?
          const answer = x - y;
          setAnswer(answer);
          setNumber1(x);
          setNumber2(y);
        }
      }
    } else if (difficulty === 2) {
      const operation = getRandomFloat() < 0.5 ? 'x' : '÷';
      const answerPosition = Math.floor(getRandomFloat() * 2 + 1);

      if (operation === 'x') {
        setOperation1('x');
        if (answerPosition === 1) {
          // ? * x = y
          const answer = getValue2();
          const x = getValue2();
          setAnswer(answer);
          setNumber2(x);
          setNumber3(answer * x);
        } else if (answerPosition === 2) {
          // x * ? = y
          const answer = getValue2();
          const x = getValue2();
          setAnswer(answer);
          setNumber1(x);
          setNumber3(answer * x);
        } else {
          // x * y = ?
          const x = getValue2();
          const y = getValue2();
          setAnswer(x * y);
          setNumber1(x);
          setNumber2(y);
        }
      } else {
        setOperation1('÷');
        if (answerPosition === 1) {
          // ? / x = y
          const x = getValue2();
          const y = getValue2();
          setAnswer(x * y);
          setNumber2(x);
          setNumber3(y);
        } else if (answerPosition === 2) {
          // x / ? = y
          const answer = getValue2();
          const y = getValue2();
          setAnswer(answer);
          setNumber1(answer * y);
          setNumber3(y);
        } else {
          // x / y = ?
          const answer = getValue2();
          const y = getValue2();
          setAnswer(answer);
          setNumber1(answer * y);
          setNumber2(y);
        }
      }
    } else {
      const random1 = getRandomFloat();
      const random2 = getRandomFloat();
      let oper1: string;
      let oper2: string;
      if (random1 < 0.5) {
        oper1 = '+';
      } else {
        oper1 = '-';
      }
      if (random2 < 0.25) {
        oper2 = '+';
      } else if (random2 < 0.5) {
        oper2 = '-';
      } else if (random2 < 0.75) {
        oper2 = 'x';
      } else {
        oper2 = '÷';
      }
      const answerPosition = Math.floor(getRandomFloat() * 3 + 1);

      if (oper1 === '+') {
        setOperation1('+');
        if (oper2 === '+') {
          setOperation2('+');
          const x = getValue1();
          const y = getValue1();
          const z = getValue1();
          if (answerPosition === 1) {
            // ? + x + y = z
            setAnswer(z - y - x);
            setNumber2(x);
            setNumber3(y);
            setNumber4(z);
          } else if (answerPosition === 2) {
            // x + ? + y = z
            setAnswer(z - y - x);
            setNumber1(x);
            setNumber3(y);
            setNumber4(z);
          } else if (answerPosition === 3) {
            // x + y + ? = z
            setAnswer(z - y - x);
            setNumber1(x);
            setNumber2(y);
            setNumber4(z);
          } else {
            // x + y + z = ?
            setAnswer(x + y + z);
            setNumber1(x);
            setNumber2(y);
            setNumber3(z);
          }
        } else if (oper2 === '-') {
          setOperation2('-');
          const x = getValue1();
          const y = getValue1();
          const z = getValue1();

          if (answerPosition === 1) {
            // ? + x - y = z
            setAnswer(z + y - x);
            setNumber2(x);
            setNumber3(y);
            setNumber4(z);
          } else if (answerPosition === 2) {
            // x + ? - y = z
            setAnswer(z + y - x);
            setNumber1(x);
            setNumber3(y);
            setNumber4(z);
          } else if (answerPosition === 3) {
            // x + y - ? = z
            setAnswer(x + y - z);
            setNumber1(x);
            setNumber2(y);
            setNumber4(z);
          } else {
            // x + y - z = ?
            setAnswer(x + y - z);
            setNumber1(x);
            setNumber2(y);
            setNumber3(z);
          }
        } else if (oper2 === 'x') {
          setOperation1('x');
          if (answerPosition === 1) {
            // ? + x * y = z
            const x = getValue2();
            const y = getValue2();
            const z = getValue1();
            setAnswer(z - x * y);
            setNumber2(x);
            setNumber3(y);
            setNumber4(z);
          } else if (answerPosition === 2) {
            // x + ? * y = z
            const answer = getValue2();
            const y = getValue2();
            const x = getValue1();
            setAnswer(answer);
            setNumber1(x);
            setNumber3(y);
            setNumber4(x + answer * y);
          } else if (answerPosition === 3) {
            // x + y * ? = z
            const answer = getValue2();
            const y = getValue2();
            const x = getValue1();
            setAnswer(answer);
            setNumber1(x);
            setNumber2(y);
            setNumber4(x + answer * y);
          } else {
            // x + y * z = ?
          }
        } else {
          setOperation2('÷');
          if (answerPosition === 1) {
            // ? + x / y = z
            const answer = getValue1();
            const y = getValue2();
            const z = getValue1();
            setAnswer(answer);
            setNumber2((z - answer) * y);
            setNumber3(y);
            setNumber4(z);
          } else if (answerPosition === 2) {
            // x + ? / y = z
            const z = getValue1();
            const x = getValue1();
            const y = getValue2();
            setAnswer((z - x) * y);
            setNumber1(x);
            setNumber3(y);
            setNumber4(z);
          } else if (answerPosition === 3) {
            // x + y / ? = z
            const answer = getValue2();
            const z = getValue1();
            const x = getValue2();
            setAnswer(answer);
            setNumber1(x);
            setNumber2((z - x) * answer);
            setNumber4(z);
          } else {
            // x + y / z = ?
            const answer = getValue1();
            const x = getValue1();
            const z = getValue2();
            setAnswer(answer);
            setNumber1(x);
            setNumber2((answer - x) * z);
            setNumber3(z);
          }
        }
      } else if (oper1 === '-') {
        setOperation1('-');
        if (oper2 === '+') {
          setOperation2('+');
          const x = getValue1();
          const y = getValue1();
          const z = getValue1();

          if (answerPosition === 1) {
            // ? - x + y = z
            setAnswer(z + x - y);
            setNumber2(x);
            setNumber3(y);
            setNumber4(z);
          } else if (answerPosition === 2) {
            // x - ? + y = z
            setAnswer(x + y - z);
            setNumber1(x);
            setNumber3(y);
            setNumber4(z);
          } else if (answerPosition === 3) {
            // x - y + ? = z
            setAnswer(z - x + y);
            setNumber1(x);
            setNumber3(y);
            setNumber4(z);
          } else {
            // x - y + z = ?
            setAnswer(x - y + z);
            setNumber1(x);
            setNumber2(y);
            setNumber3(z);
          }
        } else if (oper2 === '-') {
          setOperation2('-');
          const x = getValue1();
          const y = getValue1();
          const z = getValue1();

          if (answerPosition === 1) {
            // ? - x - y = z
            setAnswer(z + x + y);
            setNumber2(x);
            setNumber3(y);
            setNumber4(z);
          } else if (answerPosition === 2) {
            // x - ? - y = z
            setAnswer(x - y - z);
            setNumber1(x);
            setNumber3(y);
            setNumber4(z);
          } else if (answerPosition === 3) {
            // x - y - ? = z
            setAnswer(x - y - z);
            setNumber1(x);
            setNumber2(y);
            setNumber4(z);
          } else {
            // x - y - z = ?
            setAnswer(x - y - z);
            setNumber1(x);
            setNumber2(y);
            setNumber3(z);
          }
        } else if (oper2 === 'x') {
          setOperation1('x');
          if (answerPosition === 1) {
            // ? - x * y = z
            const z = getValue1();
            const x = getValue2();
            const y = getValue2();
            setAnswer(z + x * y);
            setNumber2(x);
            setNumber3(y);
            setNumber4(z);
          } else if (answerPosition === 2) {
            // x - ? * y = z
            const answer = getValue2();
            const y = getValue2();
            const z = getValue1();
            setAnswer(answer);
            setNumber1(z + answer * y);
            setNumber3(y);
            setNumber4(z);
          } else if (answerPosition === 3) {
            // x - y * ? = z
            const answer = getValue2();
            const y = getValue2();
            const z = getValue1();
            setAnswer(answer);
            setNumber1(z + answer * y);
            setNumber2(y);
            setNumber4(z);
          } else {
            // x - y * z = ?
            const x = getValue1();
            const y = getValue2();
            const z = getValue1();
            setAnswer(x - y * z);
            setNumber1(x);
            setNumber2(y);
            setNumber3(z);
          }
        } else {
          setOperation2('÷');
          if (answerPosition === 1) {
            // ? - x / y = z
            const answer = getValue1();
            const z = getValue1();
            const y = getValue2();
            setAnswer(answer);
            setNumber2((answer - z) * y);
            setNumber3(y);
            setNumber4(z);
          } else if (answerPosition === 2) {
            // x - ? / y = z
            const z = getValue1();
            const x = getValue1();
            const y = getValue2();
            setAnswer((x - z) * y);
            setNumber1(x);
            setNumber3(y);
            setNumber4(z);
          } else if (answerPosition === 3) {
            // x - y / ? = z
            const answer = getValue2();
            const x = getValue1();
            const z = getValue1();
            setAnswer(answer);
            setNumber1(x);
            setNumber2((x - z) * answer);
            setNumber4(z);
          } else {
            // x - y / z = ?
            const answer = getValue1();
            const x = getValue1();
            const z = getValue2();
            setAnswer(answer);
            setNumber1(x);
            setNumber2((x - answer) * z);
            setNumber3(z);
          }
        }
      } else if (oper1 === 'x') {
        setOperation1('x');
        if (oper2 === '+') {
          setOperation2('+');
          if (answerPosition === 1) {
            // ? * x + y = z
            const answer = getValue2();
            const x = getValue2();
            const y = getValue1();
            setAnswer(answer);
            setNumber2(x);
            setNumber3(y);
            setNumber4(answer * x + y);
          } else if (answerPosition === 2) {
            // x * ? + y = z
            const answer = getValue2();
            const x = getValue2();
            const y = getValue1();
            setAnswer(answer);
            setNumber1(x);
            setNumber3(y);
            setNumber4(answer * x + y);
          } else if (answerPosition === 3) {
            // x * y + ? = z
            const z = getValue1();
            const x = getValue2();
            const y = getValue2();
            setAnswer(z - x * y);
            setNumber1(x);
            setNumber2(y);
            setNumber4(z);
          } else {
            // x * y + z = ?
            const z = getValue1();
            const x = getValue2();
            const y = getValue2();
            setAnswer(x * y + z);
            setNumber1(x);
            setNumber2(y);
            setNumber3(z);
          }
        } else if (oper2 === '-') {
          setOperation1('-');
          if (answerPosition === 1) {
            // ? * x - y = z
            const answer = getValue2();
            const x = getValue2();
            const y = getValue1();
            setAnswer(answer);
            setNumber2(x);
            setNumber3(y);
            setNumber4(answer * x - y);
          } else if (answerPosition === 2) {
            // x * ? - y = z
            const answer = getValue2();
            const x = getValue2();
            const y = getValue1();
            setAnswer(answer);
            setNumber1(x);
            setNumber3(y);
            setNumber4(answer * x - y);
          } else if (answerPosition === 3) {
            // x * y - ? = z
            const z = getValue1();
            const x = getValue2();
            const y = getValue2();
            setAnswer(x + y - z);
            setNumber1(x);
            setNumber2(y);
            setNumber4(z);
          } else {
            // x * y - z = ?
            const z = getValue1();
            const x = getValue2();
            const y = getValue2();
            setAnswer(x + y - z);
            setNumber1(x);
            setNumber2(y);
            setNumber3(z);
          }
        }
      } else {
        setOperation1('÷');
        if (oper2 === '+') {
          setOperation2('+');
          if (answerPosition === 1) {
            // ? / x + y = z
            const z = getValue1();
            const y = getValue1();
            const x = getValue2();
            setAnswer((z - y) * x);
            setNumber2(x);
            setNumber3(y);
            setNumber4(z);
          } else if (answerPosition === 2) {
            // x / ? + y = z
            const answer = getValue2();
            const z = getValue1();
            const y = getValue1();
            setAnswer(answer);
            setNumber1((z - y) * answer);
            setNumber3(y);
            setNumber4(z);
          } else if (answerPosition === 3) {
            // x / y + ? = z
            const answer = getValue1();
            const z = getValue1();
            const y = getValue2();
            setAnswer(answer);
            setNumber1((z - answer) * y);
            setNumber2(y);
            setNumber4(z);
          } else {
            // x / y + z = ?
            const answer = getValue1();
            const y = getValue2();
            const z = getValue1();
            setAnswer(answer);
            setNumber1((answer - z) * y);
            setNumber2(y);
            setNumber3(z);
          }
        } else if (oper2 === '-') {
          setOperation2('-');
          if (answerPosition === 1) {
            // ? / x - y = z
            const z = getValue1();
            const y = getValue1();
            const x = getValue2();
            setAnswer((z + y) * x);
            setNumber2(x);
            setNumber3(y);
            setNumber4(z);
          } else if (answerPosition === 2) {
            // x / ? - y = z
            const answer = getValue2();
            const z = getValue1();
            const y = getValue1();
            setAnswer(answer);
            setNumber1((z + y) * answer);
            setNumber3(y);
            setNumber4(z);
          } else if (answerPosition === 3) {
            // x / y - ? = z
            const answer = getValue1();
            const z = getValue1();
            const y = getValue2();
            setAnswer(answer);
            setNumber1((z + answer) * y);
            setNumber2(y);
            setNumber4(z);
          } else {
            // x / y - z = ?
            const answer = getValue2();
            const z = getValue1();
            const y = getValue2();
            setAnswer(answer);
            setNumber1((answer + z) * y);
            setNumber2(y);
            setNumber3(z);
          }
        }
      }
    }
  }, []);

  const checkAnswer = async () => {
    if (clickedNum.current === answer) {
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
        onGameEnd();
      };
      handleIncorrect();
    }
  }, [answerState]);

  useEffect(() => {
    if (isNextButtonClicked) {
      endTimeRef.current = new Date(); // 게임 종료시간 계산
      if (startTimeRef.current && endTimeRef.current) {
        duration.current =
          (endTimeRef.current.getTime() - startTimeRef.current.getTime()) /
          1000; // 소요시간 계산
      }
      checkAnswer();
    }
  }, [isNextButtonClicked]);

  const onClickButton = (num: number, el: HTMLElement) => {
    if (clickedNum.current === num) {
      el.style.background = 'var(--button-bg-color)';
      el.style.border = '0.2rem solid var(--gray-bg-color)';
      el.style.color = 'white';
      clickedNum.current = 10000;
    } else {
      for (const buttonRef of buttonRefs.current) {
        if (buttonRef?.style.background === 'var(--main-bg-color)') {
          buttonRef.style.background = 'var(--button-bg-color)';
          buttonRef.style.border = '0.2rem solid var(--gray-bg-color)';
          buttonRef.style.color = 'white';
          break;
        }
      }
      el.style.background = 'var(--main-bg-color)';
      el.style.border = '0.2rem solid var(--main-color)';
      el.style.color = 'var(--main-color)';
      clickedNum.current = num;
    }
  };

  return (
    <Container>
      <Expression>
        {difficulty === 3 ? (
          <>
            <Num $num={number1} />
            <div>{operation1}</div>
            <Num $num={number2} />
            <div>{operation2}</div>
            <Num $num={number3} />
            <div>=</div>
            <Num $num={number4} />
          </>
        ) : (
          <>
            <Num $num={number1} />
            <div>{operation1}</div>
            <Num $num={number2} />
            <div>=</div>
            <div>{number3}</div>
          </>
        )}
      </Expression>
      {answer && (
        <ButtonContainer>
          {getRandomFloat() < 0.5 ? (
            <>
              <Button
                ref={(el) => (buttonRefs.current[0] = el)}
                onClick={(e) =>
                  onClickButton(answer, e.target as HTMLButtonElement)
                }>
                {answer}
              </Button>
              <Button
                ref={(el) => (buttonRefs.current[1] = el)}
                onClick={(e) =>
                  onClickButton(answer + 1, e.target as HTMLButtonElement)
                }>
                {answer + 1}
              </Button>
            </>
          ) : (
            <>
              <Button
                ref={(el) => (buttonRefs.current[0] = el)}
                onClick={(e) =>
                  onClickButton(answer + 1, e.target as HTMLButtonElement)
                }>
                {answer + 1}
              </Button>
              <Button
                ref={(el) => (buttonRefs.current[1] = el)}
                onClick={(e) =>
                  onClickButton(answer, e.target as HTMLButtonElement)
                }>
                {answer}
              </Button>
            </>
          )}
        </ButtonContainer>
      )}
    </Container>
  );
}

export default BasicCalculate;
