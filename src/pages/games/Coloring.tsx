import { useMemo, useRef, useState } from 'react';
import {
  Container,
  PaperWrapper,
  Paper,
  CellWrapper,
  Cell,
  PaletteWrapper,
  Palette,
} from '../../components/games/Coloring';
import { GameProps } from '../../routes/gameRouter.tsx';
import { getRandomFloat } from '../../utils/random.ts';
import { useGameLogic } from '../../hooks/useGameLogic.ts';

/**
 * 난도별 색칠해야 할 칸의 개수 상이
 * 하 : 8
 * 중 : 13
 * 상 : 18
 */
export default function Coloring({
  gameData,
  onGameEnd,
  saveGameResult,
  isNextButtonClicked,
  setAnswerState,
  answerState,
}: Readonly<GameProps>) {
  const [nowColor, setNowColor] = useState('red');
  const cellRefs = useRef<null[] | HTMLDivElement[]>([]);
  const difficulty = gameData.difficulty;
  const totalCellCnt = 18;
  const cellCnt = 8 + (difficulty - 1) * 5;
  const COLOR = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'white'];
  type colorsProps = {
    idx: number;
    color: string;
  };
  const colors: colorsProps[] = [];
  if (cellCnt) {
    for (let i = 0; i < cellCnt; i++) {
      const randomIndex = Math.floor(getRandomFloat() * (COLOR.length - 1));
      colors.push({ idx: colors.length, color: COLOR[randomIndex] });
    }
    for (let i = 0; i < totalCellCnt - cellCnt; i++) {
      colors.push({ idx: colors.length, color: 'white' });
    }
  }
  const answer = useMemo(
    () => [...colors].sort(() => 0.5 - getRandomFloat()),
    [],
  );
  const isCorrect = () => {
    for (let i = 0; i < cellRefs.current.length; i++) {
      let el = cellRefs.current[i];
      if (el?.getAttribute('color') !== answer[i].color) {
        return false;
      }
    }
    return true;
  };
  useGameLogic<number>(
    {
      gameData,
      onGameEnd,
      saveGameResult,
      isNextButtonClicked,
      setAnswerState,
      answerState,
    },
    isCorrect(),
  );

  // 흰색인 것은 초기에 색칠되어 있도록 함
  answer.forEach((v, i) => {
    if (v.color === 'white') {
      cellRefs.current[i]?.setAttribute('color', 'white');
    }
  });

  const changeCellColor = (el: HTMLElement) => {
    el.setAttribute('color', nowColor);
    el.style.background = nowColor;
  };

  return (
    <Container>
      <PaletteWrapper>
        {COLOR.map((color) => (
          <Palette
            key={color}
            color={color}
            $nowColor={nowColor}
            onClick={() => setNowColor(color)}
          />
        ))}
      </PaletteWrapper>
      <PaperWrapper>
        <Paper>
          {answer.map((v) => (
            <CellWrapper key={v.idx}>
              <Cell color={v.color} />
            </CellWrapper>
          ))}
        </Paper>
        <Paper>
          {answer.map((v, index) => (
            <CellWrapper key={v.idx}>
              <Cell
                onClick={(e) => changeCellColor(e.target as HTMLElement)}
                ref={(el) => (cellRefs.current[index] = el)}
              />
            </CellWrapper>
          ))}
        </Paper>
      </PaperWrapper>
    </Container>
  );
}
