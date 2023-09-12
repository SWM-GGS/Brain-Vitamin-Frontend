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
  const [candidates, setCandidates] = useState<number[]>([]);
  const [number1, setNumber1] = useState<number | null>(null);
  const [number2, setNumber2] = useState<number | null>(null);
  const [number3, setNumber3] = useState<number | null>(null);
  const [number4, setNumber4] = useState<number | null>(null);
  const [operation1, setOperation1] = useState('');
  const [operation2, setOperation2] = useState('');
  const getValue1 = () => Math.floor(getRandomFloat() * 200);
  const getValue2 = () => Math.floor(getRandomFloat() * 19 + 1);

  const setNumber = (
    answerPosition: number,
    n1: number,
    n2: number,
    n3?: number,
  ) => {
    if (answerPosition === 1) {
      setNumber2(n1);
      setNumber3(n2);
      if (n3) {
        setNumber4(n3);
      }
    } else if (answerPosition === 2) {
      setNumber1(n1);
      setNumber3(n2);
      if (n3) {
        setNumber4(n3);
      }
    } else if (answerPosition === 3) {
      setNumber1(n1);
      setNumber2(n2);
      if (n3) {
        setNumber4(n3);
      }
    } else {
      setNumber1(n1);
      setNumber2(n2);
      if (n3) {
        setNumber3(n3);
      }
    }
  };

  const makeProblem1 = () => {
    const operation = getRandomFloat() < 0.5 ? '+' : '-';
    const answerPosition = Math.floor(getRandomFloat() * 2 + 1);
    const x = getValue1();
    const y = getValue1();
    let answer: number;

    if (operation === '+') {
      setOperation1('+');
      if (answerPosition === 1 || answerPosition === 2) {
        // ? + x = y
        // x + ? = y
        answer = y - x;
      } else {
        // x + y = ?
        answer = x + y;
      }
    } else {
      setOperation1('-');
      if (answerPosition === 1) {
        // ? - x = y
        answer = x + y;
      } else {
        // x - ? = y
        // x - y = ?
        answer = x - y;
      }
    }
    setAnswer(answer);
    setNumber(answerPosition, x, y);
    setCandidates(
      [answer, getRandomFloat() < 0.5 ? answer + 2 : answer - 2].sort(
        () => getRandomFloat() - 0.5,
      ),
    );
  };

  const makeProblem2 = () => {
    const operation = getRandomFloat() < 0.5 ? 'x' : '÷';
    const answerPosition = Math.floor(getRandomFloat() * 2 + 1);
    const x = getValue2();
    const y = getValue2();
    let answer: number;

    if (operation === 'x') {
      setOperation1('x');
      if (answerPosition === 1) {
        // ? * x = y
        answer = getValue2();
        setNumber(answerPosition, x, answer * x);
      } else if (answerPosition === 2) {
        // x * ? = y
        answer = getValue2();
        setNumber(answerPosition, x, answer * x);
      } else {
        // x * y = ?
        answer = x * y;
        setNumber(answerPosition, x, y);
      }
    } else {
      setOperation1('÷');
      if (answerPosition === 1) {
        // ? / x = y
        answer = x * y;
        setNumber(answerPosition, x, y);
      } else if (answerPosition === 2) {
        // x / ? = y
        answer = getValue2();
        setNumber(answerPosition, answer * y, y);
      } else {
        // x / y = ?
        answer = getValue2();
        setNumber(answerPosition, answer * y, y);
      }
    }
    setAnswer(answer);
    setCandidates(
      [answer, getRandomFloat() < 0.5 ? answer + 2 : answer - 2].sort(
        () => getRandomFloat() - 0.5,
      ),
    );
  };

  const makeProblem3 = () => {
    const random1 = getRandomFloat();
    const random2 = getRandomFloat();
    const answerPosition = Math.floor(getRandomFloat() * 3 + 1);
    let answer = 0;
    const oper1 = random1 < 0.5 ? '+' : '-';
    let oper2: string;
    if (random2 < 0.25) {
      oper2 = '+';
    } else if (random2 < 0.5) {
      oper2 = '-';
    } else if (random2 < 0.75) {
      oper2 = 'x';
    } else {
      oper2 = '÷';
    }

    if (oper1 === '+') {
      setOperation1('+');
      if (oper2 === '+') {
        setOperation2('+');
        const x = getValue1();
        const y = getValue1();
        const z = getValue1();
        if (answerPosition === 4) {
          // x + y + z = ?
          answer = x + y + z;
        } else {
          // ? + x + y = z
          // x + ? + y = z
          // x + y + ? = z
          answer = z - y - x;
        }
        setNumber(answerPosition, x, y, z);
      } else if (oper2 === '-') {
        setOperation2('-');
        const x = getValue1();
        const y = getValue1();
        const z = getValue1();
        if (answerPosition === 1 || answerPosition === 2) {
          // ? + x - y = z
          // x + ? - y = z
          answer = z + y - x;
        } else {
          answer = x + y - z;
        }
        setNumber(answerPosition, x, y, z);
      } else if (oper2 === 'x') {
        setOperation1('x');
        const y = getValue2();
        if (answerPosition === 1) {
          // ? + x * y = z
          const x = getValue2();
          const z = getValue1();
          answer = z - x * y;
          setNumber(answerPosition, x, y, z);
        } else if (answerPosition === 2 || answerPosition === 3) {
          // x + ? * y = z
          // x + y * ? = z
          answer = getValue2();
          const x = getValue1();
          setNumber(answerPosition, x, y, x + answer * y);
        } else {
          // x + y * z = ?
          const x = getValue1();
          const z = getValue2();
          answer = x + y * z;
          setNumber(answerPosition, x, y, z);
        }
      } else {
        setOperation2('÷');
        const y = getValue2();
        if (answerPosition === 1) {
          // ? + x / y = z
          answer = getValue1();
          const z = getValue1();
          setNumber(answerPosition, (z - answer) * y, y, z);
        } else if (answerPosition === 2) {
          // x + ? / y = z
          const z = getValue1();
          const x = getValue1();
          answer = (z - x) * y;
          setNumber(answerPosition, x, y, z);
        } else if (answerPosition === 3) {
          // x + y / ? = z
          answer = getValue2();
          const z = getValue1();
          const x = getValue2();
          setNumber(answerPosition, x, (z - x) * answer, z);
        } else {
          // x + y / z = ?
          answer = getValue1();
          const x = getValue1();
          const z = getValue2();
          setNumber(answerPosition, x, (answer - x) * z, z);
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
          answer = z + x - y;
        } else if (answerPosition === 2) {
          // x - ? + y = z
          answer = x + y - z;
        } else if (answerPosition === 3) {
          // x - y + ? = z
          answer = z - x + y;
        } else {
          // x - y + z = ?
          answer = x - y + z;
        }
        setNumber(answerPosition, x, y, z);
      } else if (oper2 === '-') {
        setOperation2('-');
        const x = getValue1();
        const y = getValue1();
        const z = getValue1();

        if (answerPosition === 1) {
          // ? - x - y = z
          answer = z + x + y;
        } else {
          // x - ? - y = z
          // x - y - ? = z
          // x - y - z = ?
          answer = x - y - z;
        }
        setNumber(answerPosition, x, y, z);
      } else if (oper2 === 'x') {
        setOperation1('x');
        const z = getValue1();
        const y = getValue2();
        if (answerPosition === 1) {
          // ? - x * y = z
          const x = getValue2();
          answer = z + x * y;
          setNumber(answerPosition, x, y, z);
        } else if (answerPosition === 2 || answerPosition === 3) {
          // x - ? * y = z
          // x - y * ? = z
          answer = getValue2();
          setNumber(answerPosition, z + answer * y, y, z);
        } else {
          // x - y * z = ?
          const x = getValue1();
          answer = x - y * z;
          setNumber(answerPosition, x, y, z);
        }
      } else {
        setOperation2('÷');
        const x = getValue1();
        const y = getValue2();
        if (answerPosition === 1) {
          // ? - x / y = z
          answer = getValue1();
          const z = getValue1();
          setNumber(answerPosition, (answer - z) * y, y, z);
        } else if (answerPosition === 2) {
          // x - ? / y = z
          const z = getValue1();
          answer = (x - z) * y;
          setNumber(answerPosition, x, y, z);
        } else if (answerPosition === 3) {
          // x - y / ? = z
          answer = getValue2();
          const z = getValue1();
          setNumber(answerPosition, x, (x - z) * answer, z);
        } else {
          // x - y / z = ?
          answer = getValue1();
          const z = getValue2();
          setNumber(answerPosition, x, (x - answer) * z, z);
        }
      }
    } else if (oper1 === 'x') {
      setOperation1('x');
      if (oper2 === '+') {
        setOperation2('+');
        const z = getValue1();
        const x = getValue2();
        if (answerPosition === 1 || answerPosition === 2) {
          // ? * x + y = z
          answer = getValue2();
          const y = getValue1();
          setNumber(answerPosition, x, y, answer * x + y);
        } else if (answerPosition === 3) {
          // x * y + ? = z
          const y = getValue2();
          answer = z - x * y;
          setNumber(answerPosition, x, y, z);
        } else {
          // x * y + z = ?
          const y = getValue2();
          answer = x * y + z;
          setNumber(answerPosition, x, y, z);
        }
      } else if (oper2 === '-') {
        setOperation1('-');
        const z = getValue1();
        const x = getValue2();
        if (answerPosition === 1 || answerPosition === 2) {
          // ? * x - y = z
          // x * ? - y = z
          answer = getValue2();
          const y = getValue1();
          setNumber(answerPosition, x, y, answer * x - y);
        } else {
          // x * y - ? = z
          // x * y - z = ?
          const y = getValue2();
          answer = x + y - z;
          setNumber(answerPosition, x, y, z);
        }
      }
    } else {
      setOperation1('÷');
      if (oper2 === '+') {
        setOperation2('+');
        const x = getValue2();
        const z = getValue1();
        if (answerPosition === 1) {
          // ? / x + y = z
          const y = getValue1();
          answer = (z - y) * x;
          setNumber(answerPosition, x, y, z);
        } else if (answerPosition === 2) {
          // x / ? + y = z
          answer = getValue2();
          const y = getValue1();
          setNumber(answerPosition, (z - y) * answer, y, z);
        } else if (answerPosition === 3) {
          // x / y + ? = z
          answer = getValue1();
          const y = getValue2();
          setNumber(answerPosition, (z - answer) * y, y, z);
        } else {
          // x / y + z = ?
          answer = getValue1();
          const y = getValue2();
          setNumber(answerPosition, (answer - z) * y, y, z);
        }
      } else if (oper2 === '-') {
        setOperation2('-');
        const x = getValue2();
        const z = getValue1();
        if (answerPosition === 1) {
          // ? / x - y = z
          const y = getValue1();
          answer = (z + y) * x;
          setNumber(answerPosition, x, y, z);
        } else if (answerPosition === 2) {
          // x / ? - y = z
          answer = getValue2();
          const y = getValue1();
          setNumber(answerPosition, (z + y) * answer, y, z);
        } else if (answerPosition === 3) {
          // x / y - ? = z
          answer = getValue1();
          const y = getValue2();
          setNumber(answerPosition, (z + answer) * y, y, z);
        } else {
          // x / y - z = ?
          answer = getValue2();
          const y = getValue2();
          setNumber(answerPosition, (answer + z) * y, y, z);
        }
      }
    }
    setAnswer(answer);
    setCandidates(
      [answer, getRandomFloat() < 0.5 ? answer + 2 : answer - 2].sort(
        () => getRandomFloat() - 0.5,
      ),
    );
  };

  useEffect(() => {
    if (difficulty === 1) {
      makeProblem1();
    } else if (difficulty === 2) {
      makeProblem2();
    } else {
      makeProblem3();
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
      <ButtonContainer>
        {candidates.map((v) => (
          <Button
            key={v}
            ref={(el) => (buttonRefs.current[buttonRefs.current.length] = el)}
            onClick={(e) => onClickButton(v, e.target as HTMLButtonElement)}>
            {v}
          </Button>
        ))}
      </ButtonContainer>
    </Container>
  );
}

export default BasicCalculate;
