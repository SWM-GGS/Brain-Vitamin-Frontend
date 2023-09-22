import { useEffect, useMemo, useRef, useState } from 'react';
import { getRandomFloat } from '../utils/random';

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
};
type ContentProps = {
  imageURL?: string;
  text?: string;
};
export type ItemsProps = {
  source: ContentProps;
  target: ContentProps;
};

export const useConnectLineMatcher = (
  items: ItemsProps[],
  setIsCorrectMatch?: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const sourceRefs = useRef<HTMLDivElement[] | null[]>([]);
  const targetRefs = useRef<HTMLDivElement[] | null[]>([]);
  const sourceDotRefs = useRef<HTMLDivElement[] | null[]>([]);
  const targetDotRefs = useRef<HTMLDivElement[] | null[]>([]);
  const [boxs, setBoxs] = useState<CoordInfo[]>([]);
  const [dots, setDots] = useState<CoordInfo[]>([]);
  const [lines, setLines] = useState<LineInfo[]>([]);
  const itemCount = items.length;
  const sources = useMemo(
    () =>
      items
        .map((v, i) => {
          return { ...v.source, id: i };
        })
        .sort(() => getRandomFloat() - 0.5),
    [],
  );
  const targets = useMemo(
    () =>
      items
        .map((v, i) => {
          return { ...v.target, id: i };
        })
        .sort(() => getRandomFloat() - 0.5),
    [],
  );

  const isCorrect = () => {
    if (
      lines.length !== itemCount ||
      lines.some(
        (line) => line.startItem.split('-')[1] !== line.endItem?.split('-')[1],
      )
    ) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (setIsCorrectMatch) {
      setIsCorrectMatch(isCorrect());
    }
  }, [lines]);

  useEffect(() => {
    const setPosition = (
      refs: React.MutableRefObject<HTMLDivElement[] | null[]>,
      setState: React.Dispatch<React.SetStateAction<CoordInfo[]>>,
    ) => {
      for (let i = 0; i < itemCount; i++) {
        const ref = refs?.current[i];
        const rect = refs?.current[i]?.getBoundingClientRect();

        if (ref && rect && typeof rect.top === 'number') {
          setState((prev) => [
            ...prev,
            {
              top: rect.top,
              left: rect.left,
              bottom: rect.top + rect.height,
              right: rect.left + rect.width,
              id: ref.id,
            },
          ]);
        }
      }
    };

    setPosition(sourceRefs, setBoxs);
    setPosition(targetRefs, setBoxs);
    setPosition(sourceDotRefs, setDots);
    setPosition(targetDotRefs, setDots);
  }, []);

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
    };
    const existingStartLineIndex = lines.findIndex(
      (line) => line.startItem === startItem,
    );
    const existingEndLineIndex = lines.findIndex(
      (line) => line.endItem === startItem,
    );

    if (existingStartLineIndex !== -1) {
      deleteLine(startItem);
    }
    if (existingEndLineIndex !== -1) {
      const item = lines[existingEndLineIndex].startItem;

      if (item) {
        deleteLine(item);
      }
    }
    setLines((lines) => [...lines, newLine]);
  };

  const updateLine = (
    startItem: string,
    endCoord: { x: number; y: number },
    endItem?: string,
  ) => {
    const updatedLines = [...lines];
    const index = updatedLines.findIndex(
      (line) => line.startItem === startItem,
    );

    updatedLines[index] = {
      ...updatedLines[index],
      endCoord,
      endItem: endItem === undefined ? null : endItem,
    };
    setLines(updatedLines);
  };

  const deleteLine = (startItem: string) => {
    setLines((lines) => lines.filter((line) => line.startItem !== startItem));
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

  const getCenterCoord = (coord: CoordInfo) => {
    return {
      x: (coord.left + coord.right) / 2,
      y: (coord.top + coord.bottom) / 2,
    };
  };

  const findDot = (dots: CoordInfo[], id: string) => {
    return dots.find((dot) => dot.id === id);
  };

  const getDotCoord = (id: string) => {
    const dot = findDot(dots, id);

    if (dot) {
      return getCenterCoord(dot);
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

  const dragEndHandler = (
    e: React.DragEvent<HTMLElement> | React.TouchEvent<HTMLElement>,
  ) => {
    let [clientX, clientY] = [0, 0];

    if ('touches' in e && e.changedTouches.length > 0) {
      const lastTouch = e.changedTouches[e.changedTouches.length - 1];

      clientX = lastTouch.clientX;
      clientY = lastTouch.clientY;
    } else if ('clientX' in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const id = (e.target as HTMLElement).id;
    const [str] = (e.target as HTMLElement).id.split('-');

    for (const box of boxs) {
      const isInBox =
        box.left < clientX &&
        clientX < box.right &&
        box.top < clientY &&
        clientY < box.bottom;

      if (isInBox) {
        const boxId = box.id;
        const [boxStr] = boxId.split('-');
        const isSameSourceAndTarget =
          (str === 'source' && boxStr === 'source') ||
          (str === 'target' && boxStr === 'target');

        if (!isSameSourceAndTarget) {
          const endCoord = getDotCoord(boxId);

          if (endCoord) {
            updateLine(id, endCoord, boxId);
          }
          return;
        }
        break;
      }
    }
    deleteLine(id);
  };

  const dragOverHandler = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
  };

  return {
    itemCount,
    sources,
    targets,
    lines,
    sourceRefs,
    targetRefs,
    sourceDotRefs,
    targetDotRefs,
    dragStartHandler,
    dragHandler,
    dragEndHandler,
    dragOverHandler,
  };
};
