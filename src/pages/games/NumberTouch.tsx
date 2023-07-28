import { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Num } from '../../components/games/NumberTouch';

export default function NumberTouch() {
  const [boxSize, setBoxSize] = useState({ width: 100, height: 100 });
  const boxRef = useRef<HTMLDivElement>(null);
  const maxNum = 30;
  const numbers = useMemo(
    () => Array.from({ length: maxNum }, (_, i) => i + 1),
    [],
  );
  let difficulty = 2;
  let current = 1;

  useEffect(() => {
    const fullSize = {
      width: window.innerWidth || document.body.clientWidth,
      height: window.innerHeight || document.body.clientHeight,
    };

    if (boxRef.current?.clientWidth) {
      setBoxSize({
        width: (fullSize.width * (3 + difficulty)) / 8,
        height: (fullSize.height * (3 + difficulty)) / 8,
      });
    }
  }, []);

  const clickNum = (el: HTMLElement, num: number) => {
    if (num === current) {
      if (num === maxNum) {
        alert('축하합니다! 모두 맞추셨습니다!');
        return;
      }
      current++;
      el.style.display = 'none';
    }
  };

  return (
    <>
      <h1>1부터 {maxNum}까지 순서대로 숫자를 찾아 터치해주세요.</h1>
      <Box ref={boxRef} $width={boxSize.width} $height={boxSize.height}>
        {numbers.map((num) => (
          <Num
            key={num}
            onClick={(e) => clickNum(e.target as HTMLElement, num)}
            $zIndex={100 - num}
            style={{
              position: 'absolute',
              top: Math.ceil(Math.random() * boxSize.height),
              left: Math.ceil(Math.random() * boxSize.width),
            }}>
            {num}
          </Num>
        ))}
      </Box>
    </>
  );
}
