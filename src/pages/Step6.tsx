import { useCallback, useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';

type CoordInfo = {
  top: number;
  left: number;
  bottom: number;
  right: number;
  id: string;
};
type LineInfo = {
  startCoord: { x: number; y: number };
  startItem: string;
  endCoord: { x: number; y: number };
  endItem: string | null;
  isConnected: boolean;
};

function Step6() {
  const refs = useRef<HTMLDivElement[] | null[]>([]);
  const [boxs, setBoxs] = useState<CoordInfo[]>([]);
  const [lines, setLines] = useState<LineInfo[]>([]);
  const itemCount = 25;

  const setPosition = useCallback(
    (
      refs: React.MutableRefObject<HTMLDivElement[] | null[]>,
      setState: React.Dispatch<React.SetStateAction<CoordInfo[]>>,
    ) => {
      for (let i = 0; i < itemCount; i++) {
        const ref = refs?.current[i];
        const rect = ref?.getBoundingClientRect();

        if (ref && rect && typeof rect.top === 'number') {
          setState((prev) => [
            ...prev,
            {
              top: rect.top,
              left: rect.left,
              bottom: rect.bottom,
              right: rect.right,
              id: ref.id,
            },
          ]);
        }
      }
    },
    [itemCount],
  );

  useEffect(() => {
    setPosition(refs, setBoxs);
  }, [itemCount, setPosition]);

  const createLine = (
    startCoord: { x: number; y: number },
    startItem: string,
    endCoord: { x: number; y: number },
  ) => {
    const newLine: LineInfo = {
      startCoord,
      startItem,
      endCoord,
      endItem: null,
      isConnected: false,
    };

    setLines((lines) => [...lines, newLine]);
  };

  const updateLine = (
    startItem: string,
    endCoord: { x: number; y: number },
    endItem?: string,
  ) => {
    const updatedLines = [...lines];
    const index = updatedLines.findIndex(
      (line) => line.startItem === startItem && !line.isConnected,
    );

    updatedLines[index] = {
      ...updatedLines[index],
      endCoord,
      endItem: endItem ?? null,
      isConnected: !!endItem,
    };
    setLines(updatedLines);
  };

  const deleteLine = (startItem: string) => {
    setLines((lines) =>
      lines.filter((line) => line.startItem !== startItem || line.isConnected),
    );
  };

  const getClientXY = (
    e: React.DragEvent<HTMLElement> | React.TouchEvent<HTMLElement>,
  ) => {
    let [clientX, clientY] = [0, 0];

    if ('touches' in e && e.touches.length > 0) {
      // 터치 이벤트일 경우
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      // 드래그 이벤트일 경우
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return [clientX, clientY];
  };

  const findBox = (boxs: CoordInfo[], id: string) => {
    return boxs.find((box) => box.id === id);
  };

  const getDotCoord = (id: string) => {
    const box = findBox(boxs, id);

    if (box) {
      return {
        x: (box.left + box.right) / 2,
        y: (box.top + box.bottom) / 2,
      };
    }
  };

  const dragStartHandler = (
    e: React.DragEvent<HTMLElement> | React.TouchEvent<HTMLElement>,
  ) => {
    const [clientX, clientY] = getClientXY(e);
    const id = (e.target as HTMLElement).id;
    const startCoord = getDotCoord(id);
    const endCoord = { x: clientX, y: clientY };

    if (startCoord) {
      createLine(startCoord, id, endCoord);
    }
  };

  const dragHandler = (
    e: React.DragEvent<HTMLElement> | React.TouchEvent<HTMLElement>,
  ) => {
    const [clientX, clientY] = getClientXY(e);
    const id = (e.target as HTMLElement).id;

    updateLine(id, { x: clientX, y: clientY });
  };

  const isInBox = (box: CoordInfo, x: number, y: number) => {
    return box.left < x && x < box.right && box.top < y && y < box.bottom;
  };

  const dragEndHandler = (
    e: React.DragEvent<HTMLElement> | React.TouchEvent<HTMLElement>,
  ) => {
    let [clientX, clientY] = [0, 0];
    const id = (e.target as HTMLElement).id;

    if ('touches' in e && e.changedTouches.length > 0) {
      const lastTouch = e.changedTouches[e.changedTouches.length - 1];

      clientX = lastTouch.clientX;
      clientY = lastTouch.clientY;
    } else if ('clientX' in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    for (const box of boxs) {
      if (isInBox(box, clientX, clientY)) {
        const boxId = box.id;
        const endCoord = getDotCoord(boxId);

        if (endCoord) {
          updateLine(id, endCoord, boxId);
        }
        return;
      }
    }
    deleteLine(id);
  };

  const dragOverHandler = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
  };

  console.log(lines.map((v) => +v.startItem));
  console.log(lines.map((v) => (v.endItem ? +v.endItem : null)));

  return (
    <Container>
      <Board>
        {Array.from({ length: 25 }, (_, i) => i + 1).map((v) => (
          <Dot
            key={v}
            ref={(el) => (refs.current[refs.current.length] = el)}
            id={`${v}`}
            draggable
            onDragStart={dragStartHandler}
            onDragEnd={dragEndHandler}
            onDrag={dragHandler}
            onDragOver={dragOverHandler}
            onTouchStart={dragStartHandler}
            onTouchMove={dragHandler}
            onTouchEnd={dragEndHandler}
          />
        ))}
      </Board>
      {lines.map(
        (line) =>
          line.startCoord &&
          line.endCoord && (
            <svg
              key={`(${line.startCoord.x},${line.startCoord.y})-(${line.startItem},${line.endItem})`}
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
              }}>
              {line.startCoord && line.endCoord && (
                <line
                  x1={line.startCoord.x}
                  y1={line.startCoord.y}
                  x2={line.endCoord.x}
                  y2={line.endCoord.y}
                  stroke="black"
                  strokeWidth={10}
                />
              )}
            </svg>
          ),
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(var(--vh, 1vh) * 100);
`;
const Board = styled.div`
  width: 500px;
  height: 500px;
  border: 3px solid black;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  justify-items: center;
  align-items: center;
`;
const Dot = styled.div`
  padding: 7px;
  background: black;
  border-radius: 50%;
`;

export default Step6;
