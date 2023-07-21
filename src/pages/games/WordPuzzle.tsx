import { useEffect, useRef, useState } from 'react';

// 드래그하던 요소를 드랍했을 때 원래 위치로 돌려놓기 위한 초기 위치값
let originalX = 0;
let originalY = 0;

// 드래그 시 요소를 실제로 이동시키기 위해 필요
let posX = 0;
let posY = 0;

const targetsState = [
  { id: 1, letter: '단' },
  { id: 2, letter: '어' },
  { id: 3, letter: '퍼' },
  { id: 4, letter: '즐' },
];

export default function WordPuzzle() {
  const dropContainer = useRef<HTMLDivElement>(null);
  const [targets, setTargets] = useState(targetsState);
  const [box, setBox] = useState({ top: 0, left: 0, bottom: 0, right: 0 });

  useEffect(() => {
    const box = dropContainer?.current?.getBoundingClientRect();
    if (typeof box?.top === 'number') {
      setBox({
        top: box?.top,
        left: box?.left,
        bottom: box?.top + box?.height,
        right: box?.left + box?.width,
      });
    }
  }, []);

  // onDragStart : Item을 잡기 시작했을 때 발생
  // onDrag : onDragStart 직후부터 onDragEnd 직전까지 계속 발생
  // onDragEnd : 잡은 Item을 놓았을 때 발생
  // onDragEnter : 잡은 Item이 다른 Item이랑 겹쳐졌을 때 발생
  // onDragOver : 잡은 Item이 다른 Item과 겹쳐졌을 때 milli sec마다 발생 -> prevent로 발생 막기
  // onDragLeave : 잡은 Item이 다른 Item에 겹쳐졌다가 떠났을 때 발생
  const dragStartHandler = (e: React.DragEvent<HTMLElement>) => {
    posX = e.clientX;
    posY = e.clientY;

    originalX = (e.target as HTMLElement).offsetLeft;
    originalY = (e.target as HTMLElement).offsetTop;
  };

  const dragHandler = (e: React.DragEvent<HTMLElement>) => {
    (e.target as HTMLElement).style.left = `${
      (e.target as HTMLElement).offsetLeft + e.clientX - posX
    }px`;
    (e.target as HTMLElement).style.top = `${
      (e.target as HTMLElement).offsetTop + e.clientY - posY
    }px`;

    posY = e.clientY;
    posX = e.clientX;
  };

  const dragEndHandler = (e: React.DragEvent<HTMLElement>) => {
    if (
      box.left < e.clientX &&
      e.clientX < box.right &&
      box.top < e.clientY &&
      e.clientY < box.bottom
    ) {
      (e.target as HTMLElement).style.left = `${
        (e.target as HTMLElement).offsetLeft + e.clientX - posX
      }px`;
      (e.target as HTMLElement).style.top = `${
        (e.target as HTMLElement).offsetTop + e.clientY - posY
      }px`;
    } else {
      (e.target as HTMLElement).style.left = `${originalX}px`;
      (e.target as HTMLElement).style.top = `${originalY}px`;
    }
  };

  const dragOverHandler = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <ul>
        {targets.map((item) => (
          <li
            style={{
              position: 'absolute',
              top: Math.ceil(Math.random() * 500),
              left: Math.ceil(Math.random() * 500),
            }}
            key={item.id}
            draggable
            onDragStart={dragStartHandler}
            onDragEnd={dragEndHandler}
            onDrag={dragHandler}
            onDragOver={dragOverHandler}>
            {item.letter}
          </li>
        ))}
      </ul>
      <div
        ref={dropContainer}
        style={{
          width: '50px',
          height: '50px',
          border: '1px solid black',
        }}></div>
    </>
  );
}
