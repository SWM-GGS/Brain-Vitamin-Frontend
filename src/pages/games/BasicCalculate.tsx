import { useEffect, useState } from 'react';
import { GameProps } from '../../routes/gameRouter';
import { getRandomFloat } from '../../utils/random';
import {
  Container,
  Expression,
  Num,
} from '../../components/games/BasicCalculate';
import { Button, ButtonContainer } from '../../components/common/GameButton';
import { useGameLogic } from '../../hooks/useGameLogic';

function BasicCalculate({
  gameData,
  onGameEnd,
  saveGameResult,
  isNextButtonClicked,
  setAnswerState,
  answerState,
}: Readonly<GameProps>) {
  const difficulty = gameData.difficulty;
  const [candidates, setCandidates] = useState<number[]>([]);
  const { onClickButton, setAnswer, buttonRefs } = useGameLogic<number>({
    gameData,
    onGameEnd,
    saveGameResult,
    isNextButtonClicked,
    setAnswerState,
    answerState,
  });
  const [number1, setNumber1] = useState<number | null>(null);
  const [number2, setNumber2] = useState<number | null>(null);
  const [number3, setNumber3] = useState<number | null>(null);
  const [number4, setNumber4] = useState<number | null>(null);
  const [operation1, setOperation1] = useState('');
  const [operation2, setOperation2] = useState('');
  const getValue1 = () => Math.floor(getRandomFloat() * 99 + 1);
  const getValue1s = () => Math.floor(getRandomFloat() * 49 + 1);
  const getValue1l = () => Math.floor(getRandomFloat() * 50 + 50);
  const getValue2 = () => Math.floor(getRandomFloat() * 14 + 1);
  const getValue2s = () => Math.floor(getRandomFloat() * 6 + 1);

  useEffect(() => {
    if (difficulty === 1) {
      makeProblem1();
    } else if (difficulty === 2) {
      makeProblem2();
    } else {
      makeProblem3();
    }
  }, []);

  const makeProblem1 = () => {
    const operation = getRandomFloat() < 0.5 ? '+' : '-';
    const answerPosition = Math.floor(getRandomFloat() * 2 + 1);
    let x: number;
    let y: number;
    let answer: number;

    if (operation === '+') {
      if (answerPosition === 1 || answerPosition === 2) {
        // ? + x = y
        // x + ? = y
        x = getValue1s();
        y = getValue1l();
        answer = y - x;
      } else {
        // x + y = ?
        x = getValue1();
        y = getValue1();
        answer = x + y;
      }
    } else if (answerPosition === 1) {
      // ? - x = y
      x = getValue1();
      y = getValue1();
      answer = x + y;
    } else {
      // x - ? = y
      // x - y = ?
      x = getValue1l();
      y = getValue1s();
      answer = x - y;
    }

    setAnswer(answer);
    setNumber(answerPosition, x, y);
    setCandidates(
      [answer, getRandomFloat() < 0.5 ? answer + 2 : answer - 2].sort(
        () => getRandomFloat() - 0.5,
      ),
    );
    setOperation1(operation);
  };

  const makeProblem2 = () => {
    const operation = getRandomFloat() < 0.5 ? 'x' : '÷';
    const answerPosition = Math.floor(getRandomFloat() * 2 + 1);
    const x = getValue2();
    const y = getValue2();
    let answer: number;

    if (operation === 'x') {
      if (answerPosition === 1 || answerPosition === 2) {
        // ? * x = y
        // x * ? = y
        answer = getValue2();
        setNumber(answerPosition, x, answer * x);
      } else {
        // x * y = ?
        answer = x * y;
        setNumber(answerPosition, x, y);
      }
    } else if (answerPosition === 1) {
      // ? / x = y
      answer = x * y;
      setNumber(answerPosition, x, y);
    } else {
      // x / ? = y
      // x / y = ?
      answer = getValue2();
      setNumber(answerPosition, answer * y, y);
    }

    setAnswer(answer);
    setCandidates(
      [answer, getRandomFloat() < 0.5 ? answer + 2 : answer - 2].sort(
        () => getRandomFloat() - 0.5,
      ),
    );
    setOperation1(operation);
  };

  const makeProblem3 = () => {
    const answerPosition = Math.floor(getRandomFloat() * 3 + 1);
    let answer = 0;
    const oper1 = getRandomFloat() < 0.5 ? '+' : '-';
    const oper2 = getRandomOperation();

    if (oper1 === '+') {
      answer = handleP(answerPosition, oper2);
    } else if (oper1 === '-') {
      answer = handleM(answerPosition, oper2);
    } else if (oper1 === 'x') {
      answer = handleMul(answerPosition, oper2);
    } else {
      answer = handleD(answerPosition, oper2);
    }
    setAnswer(answer);
    setCandidates(
      [answer, getRandomFloat() < 0.5 ? answer + 2 : answer - 2].sort(
        () => getRandomFloat() - 0.5,
      ),
    );
    setOperation1(oper1);
    setOperation2(oper2);
  };

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

  const getRandomOperation = () => {
    let oper: string;
    const random = getRandomFloat();
    if (random < 0.25) {
      oper = '+';
    } else if (random < 0.5) {
      oper = '-';
    } else if (random < 0.75) {
      oper = 'x';
    } else {
      oper = '÷';
    }
    return oper;
  };

  const handlePP = (answerPosition: number) => {
    let answer: number;
    let x: number;
    let y: number;
    let z: number;
    if (answerPosition === 4) {
      // x + y + z = ?
      x = getValue1();
      y = getValue1();
      z = getValue1();
      answer = x + y + z;
    } else {
      // ? + x + y = z
      // x + ? + y = z
      // x + y + ? = z
      x = getValue1s();
      y = getValue1s();
      z = getValue1l();
      answer = z - y - x;
    }
    setNumber(answerPosition, x, y, z);
    return answer;
  };

  const handlePM = (answerPosition: number) => {
    let answer: number;
    let x: number;
    let y: number;
    let z: number;
    if (answerPosition === 1 || answerPosition === 2) {
      // ? + x - y = z
      // x + ? - y = z
      x = getValue1s();
      y = getValue1l();
      z = getValue1l();
      answer = z + y - x;
    } else {
      x = getValue1l();
      y = getValue1l();
      z = getValue1s();
      answer = x + y - z;
    }
    setNumber(answerPosition, x, y, z);
    return answer;
  };

  const handlePMul = (answerPosition: number) => {
    let answer: number;
    const y = getValue2s();
    if (answerPosition === 1) {
      // ? + x * y = z
      const x = getValue2s();
      const z = getValue1l();
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
    return answer;
  };

  const handlePD = (answerPosition: number) => {
    let answer: number;
    const y = getValue2();
    if (answerPosition === 1) {
      // ? + x / y = z
      answer = getValue1s();
      const z = getValue1l();
      setNumber(answerPosition, (z - answer) * y, y, z);
    } else if (answerPosition === 2) {
      // x + ? / y = z
      const z = getValue1l();
      const x = getValue1s();
      answer = (z - x) * y;
      setNumber(answerPosition, x, y, z);
    } else if (answerPosition === 3) {
      // x + y / ? = z
      answer = getValue2();
      const z = getValue1l();
      const x = getValue2s();
      setNumber(answerPosition, x, (z - x) * answer, z);
    } else {
      // x + y / z = ?
      answer = getValue1l();
      const x = getValue1s();
      const z = getValue2();
      setNumber(answerPosition, x, (answer - x) * z, z);
    }
    return answer;
  };

  const handleMP = (answerPosition: number) => {
    let answer: number;
    let x: number;
    let y: number;
    let z: number;
    if (answerPosition === 1) {
      // ? - x + y = z
      x = getValue1l();
      y = getValue1s();
      z = getValue1l();
      answer = z + x - y;
    } else if (answerPosition === 2) {
      // x - ? + y = z
      x = getValue1l();
      y = getValue1l();
      z = getValue1s();
      answer = x + y - z;
    } else if (answerPosition === 3) {
      // x - y + ? = z
      x = getValue1s();
      y = getValue1l();
      z = getValue1l();
      answer = z - x + y;
    } else {
      // x - y + z = ?
      x = getValue1l();
      y = getValue1s();
      z = getValue1l();
      answer = x - y + z;
    }
    setNumber(answerPosition, x, y, z);
    return answer;
  };

  const handleMM = (answerPosition: number) => {
    let answer: number;
    let x: number;
    let y: number;
    let z: number;

    if (answerPosition === 1) {
      // ? - x - y = z
      x = getValue1();
      y = getValue1();
      z = getValue1();
      answer = z + x + y;
    } else {
      // x - ? - y = z
      // x - y - ? = z
      // x - y - z = ?
      x = getValue1l();
      y = getValue1s();
      z = getValue1s();
      answer = x - y - z;
    }
    setNumber(answerPosition, x, y, z);
    return answer;
  };

  const handleMMul = (answerPosition: number) => {
    let answer: number;
    let y: number;
    let z: number;
    if (answerPosition === 1) {
      // ? - x * y = z
      const x = getValue2();
      y = getValue2();
      z = getValue1();
      answer = z + x * y;
      setNumber(answerPosition, x, y, z);
    } else if (answerPosition === 2 || answerPosition === 3) {
      // x - ? * y = z
      // x - y * ? = z
      y = getValue2();
      z = getValue1();
      answer = getValue2();
      setNumber(answerPosition, z + answer * y, y, z);
    } else {
      // x - y * z = ?
      const x = getValue1l();
      y = getValue1s();
      z = getValue2();
      answer = x - y * z;
      setNumber(answerPosition, x, y, z);
    }
    return answer;
  };

  const handleMD = (answerPosition: number) => {
    let answer: number;
    let x: number;
    const y = getValue2();
    if (answerPosition === 1) {
      // ? - x / y = z
      answer = getValue1l();
      const z = getValue1s();
      setNumber(answerPosition, (answer - z) * y, y, z);
    } else if (answerPosition === 2) {
      // x - ? / y = z
      x = getValue1l();
      const z = getValue1s();
      answer = (x - z) * y;
      setNumber(answerPosition, x, y, z);
    } else if (answerPosition === 3) {
      // x - y / ? = z
      x = getValue1l();
      answer = getValue2();
      const z = getValue1s();
      setNumber(answerPosition, x, (x - z) * answer, z);
    } else {
      // x - y / z = ?
      x = getValue1l();
      answer = getValue1s();
      const z = getValue2();
      setNumber(answerPosition, x, (x - answer) * z, z);
    }
    return answer;
  };

  const handleMulP = (answerPosition: number) => {
    let answer: number;
    let z: number;
    let x: number;
    if (answerPosition === 1 || answerPosition === 2) {
      // ? * x + y = z
      x = getValue2();
      answer = getValue2();
      const y = getValue1();
      setNumber(answerPosition, x, y, answer * x + y);
    } else if (answerPosition === 3) {
      // x * y + ? = z
      z = getValue1l();
      x = getValue2s();
      const y = getValue2s();
      answer = z - x * y;
      setNumber(answerPosition, x, y, z);
    } else {
      // x * y + z = ?
      z = getValue1();
      x = getValue2();
      const y = getValue2();
      answer = x * y + z;
      setNumber(answerPosition, x, y, z);
    }
    return answer;
  };

  const handleMulM = (answerPosition: number) => {
    let answer: number;
    const x = getValue2();
    const z = getValue1s();
    if (answerPosition === 1 || answerPosition === 2) {
      // ? * x - y = z
      // x * ? - y = z
      answer = getValue2();
      const y = getValue1s();
      setNumber(answerPosition, x, y, answer * x - y);
    } else {
      // x * y - ? = z
      // x * y - z = ?
      const y = getValue2();
      answer = x * y - z;
      setNumber(answerPosition, x, y, z);
    }
    return answer;
  };

  const handleDP = (answerPosition: number) => {
    let answer: number;
    const x = getValue2();
    let z: number;
    if (answerPosition === 1) {
      // ? / x + y = z
      z = getValue1l();
      const y = getValue1s();
      answer = (z - y) * x;
      setNumber(answerPosition, x, y, z);
    } else if (answerPosition === 2) {
      // x / ? + y = z
      z = getValue1l();
      answer = getValue2();
      const y = getValue1s();
      setNumber(answerPosition, (z - y) * answer, y, z);
    } else if (answerPosition === 3) {
      // x / y + ? = z
      z = getValue1l();
      answer = getValue1s();
      const y = getValue2();
      setNumber(answerPosition, (z - answer) * y, y, z);
    } else {
      // x / y + z = ?
      z = getValue1s();
      answer = getValue1l();
      const y = getValue2();
      setNumber(answerPosition, (answer - z) * y, y, z);
    }
    return answer;
  };

  const handleDM = (answerPosition: number) => {
    let answer: number;
    let x: number;
    const z = getValue1();
    if (answerPosition === 1) {
      // ? / x - y = z
      x = getValue2();
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
    return answer;
  };

  const handleP = (answerPosition: number, oper2: string) => {
    let answer: number;
    if (oper2 === '+') {
      answer = handlePP(answerPosition);
    } else if (oper2 === '-') {
      answer = handlePM(answerPosition);
    } else if (oper2 === 'x') {
      answer = handlePMul(answerPosition);
    } else {
      answer = handlePD(answerPosition);
    }
    return answer;
  };

  const handleM = (answerPosition: number, oper2: string) => {
    let answer: number;
    if (oper2 === '+') {
      answer = handleMP(answerPosition);
    } else if (oper2 === '-') {
      answer = handleMM(answerPosition);
    } else if (oper2 === 'x') {
      answer = handleMMul(answerPosition);
    } else {
      answer = handleMD(answerPosition);
    }
    return answer;
  };

  const handleMul = (answerPosition: number, oper2: string) => {
    let answer = 0;
    if (oper2 === '+') {
      answer = handleMulP(answerPosition);
    } else if (oper2 === '-') {
      answer = handleMulM(answerPosition);
    }
    return answer;
  };

  const handleD = (answerPosition: number, oper2: string) => {
    let answer = 0;
    if (oper2 === '+') {
      answer = handleDP(answerPosition);
    } else if (oper2 === '-') {
      answer = handleDM(answerPosition);
    }
    return answer;
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
