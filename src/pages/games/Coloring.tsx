import { useRef, useState } from 'react';
import {
  Container,
  CellWrapper,
  Cell,
  Palette,
} from '../../components/games/Coloring';

const COLOR = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
const answer = [
  'blue',
  'red',
  'blue',
  'purple',
  'green',
  'purple',
  'green',
  'yellow',
  'green',
  'orange',
  'blue',
  'yellow',
  'purple',
  'green',
  'orange',
  'red',
  'yellow',
  'red',
];

export default function Coloring() {
  const [nowColor, setNowColor] = useState('');
  const cellRefs = useRef<null[] | HTMLDivElement[]>([]);

  const checkAnswer = () => {
    for (let i = 0; i < cellRefs.current.length; i++) {
      let el = cellRefs.current[i];
      if (el?.getAttribute('color') !== answer[i]) return;
    }
    setTimeout(
      () => alert('축하드립니다! 정확한 위치에 모두 색칠하셨습니다!'),
      50,
    );
  };

  const changeCellColor = (el: HTMLElement) => {
    el.setAttribute('color', nowColor);
    el.style.background = nowColor;
    checkAnswer();
  };

  return (
    <>
      <Container>
        {answer.map((color, index) => (
          <CellWrapper key={index}>
            <Cell color={color} />
          </CellWrapper>
        ))}
      </Container>
      {COLOR.map((color, index) => (
        <Palette key={index} color={color} onClick={() => setNowColor(color)} />
      ))}
      <Container>
        {answer.map((_, index) => (
          <CellWrapper key={index}>
            <Cell
              onClick={(e) => changeCellColor(e.target as HTMLElement)}
              ref={(el) => (cellRefs.current[index] = el)}
            />
          </CellWrapper>
        ))}
      </Container>
    </>
  );
}
