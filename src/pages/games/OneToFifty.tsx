import { useState } from 'react';
import { Board, StartBtn } from '../../components/games/OneToFifty.tsx';
import { getRandomFloat } from '../../utils/random.ts';

const array: number[] = [];
for (let i = 1; i <= 25; i++) {
  array.push(i);
}

const shuffleArray = (array: number[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(getRandomFloat() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

function OneToFifty() {
  const [numbers, setNumbers] = useState(array);
  const [gameFlag, setGameFlag] = useState(false);
  const [current, setCurrent] = useState(1);

  const startGame = () => {
    setNumbers(shuffleArray(array));
    setCurrent(1);
    setGameFlag(true);
  };

  const endGame = () => {
    setGameFlag(false);
  };

  const handleClick = (num: number) => {
    console.log(num);
    if (num === current) {
      if (num === 50) {
        endGame();
      }
      const index = numbers.indexOf(num);
      setNumbers((numbers) => [
        ...numbers.slice(0, index),
        num < 26 ? num + 25 : 0,
        ...numbers.slice(index + 1),
      ]);
      setCurrent((current) => current + 1);
    }
  };

  return (
    <>
      <Board numbers={numbers} handleClick={handleClick} $gameFlag={gameFlag} />
      {gameFlag && <StartBtn onClick={startGame}>시작하기</StartBtn>}
    </>
  );
}

export default OneToFifty;
