import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Timer from '../../modules/Timer.tsx';

export default function WordPuzzle() {
  const navigate = useNavigate();
  const location = useLocation();
  const gameData = location.state.gameData;
  const gameIndex = location.state.gameIndex;
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameEnded, setIsGameEnded] = useState(false);

  type Props = {
    contents: string;
    answer: boolean;
    imgUrl: string;
  };
  const [problemPool, setProblemPool] = useState<Props[]>(
    gameData[gameIndex].problemPool,
  );
  const dragRefs = useRef<null[] | HTMLLIElement[]>([]);
  const dropRefs = useRef<null[] | HTMLDivElement[]>([]);
  type BoxProps = {
    top: number;
    left: number;
    bottom: number;
    right: number;
  };
  const [boxs, setBoxs] = useState<BoxProps[]>([]);

  // 드래그하던 요소를 드랍했을 때 원래 위치로 돌려놓기 위한 초기 위치값
  let originalX = 0;
  let originalY = 0;

  // 드래그 시 요소를 실제로 이동시키기 위해 필요
  let posX = 0;
  let posY = 0;

  const word = '단어퍼즐';
  const letters = word.split('');

  useEffect(() => {
    for (let i = 0; i < letters.length; i++) {
      const box = dropRefs?.current[i]?.getBoundingClientRect();
      if (typeof box?.top === 'number') {
        setBoxs((prev) => [
          ...prev,
          {
            top: box?.top,
            left: box?.left,
            bottom: box?.top + box?.height,
            right: box?.left + box?.width,
          },
        ]);
      }
    }
  }, []);

  const checkWord = () => {
    // 방법 1: 드래그한 요소와 box id를 매칭할 수 있는 속성 부여 -> 이 방법으로 구현
    // 방법 2: 요소를 드래그한 후 드롭했을 때 박스의 터치 감지
    for (let i = 0; i < dragRefs.current.length; i++) {
      let el = dragRefs.current[i];
      let boxId = el?.getAttribute('boxId');
      if (!boxId || el?.innerText !== letters[+boxId]) {
        return;
      }
    }
    setIsGameEnded(true);
  };

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
    for (let i = 0; i < letters.length; i++) {
      const box = boxs[i];
      // 드래그한 글자가 박스에 안착했을 경우
      if (
        box.left < e.clientX &&
        e.clientX < box.right &&
        box.top < e.clientY &&
        e.clientY < box.bottom
      ) {
        (e.target as HTMLElement).style.left = `${
          (box.left + box.right) / 2
        }px`;
        (e.target as HTMLElement).style.top = `${(box.top + box.bottom) / 2}px`;

        (e.target as HTMLElement).setAttribute('boxId', `${i}`);
        checkWord();
        return;
      }
    }
    // 박스를 벗어났을 경우
    (e.target as HTMLElement).style.left = `${
      (e.target as HTMLElement).offsetLeft + e.clientX - posX
    }px`;
    (e.target as HTMLElement).style.top = `${
      (e.target as HTMLElement).offsetTop + e.clientY - posY
    }px`;
    (e.target as HTMLElement).setAttribute('boxId', 'null');
  };

  const dragOverHandler = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (isGameEnded) {
      alert('게임이 종료되었습니다.');
      const nextGamePath = gameData[gameIndex + 1].pathUri;
      if (nextGamePath) {
        navigate(nextGamePath, {
          state: { gameData, gameIndex: gameIndex + 1 },
        });
      } else {
        // navigate('/cogTraining');
        navigate('/market', {
          state: { gameData, gameIndex: gameIndex + 1 },
        });
      }
    }
  }, [isGameEnded, gameData, navigate]);

  const handleTimeUp = () => {
    setIsGameEnded(true);
  };

  return (
    <>
      {isGameStarted ? (
        <>
          <Timer
            timeLimit={gameData[gameIndex].timeLimit}
            onTimeUp={handleTimeUp}
          />
          <ul>
            {letters.map((letter, index) => (
              <li
                style={{
                  position: 'absolute',
                  top: Math.ceil(Math.random() * 500),
                  left: Math.ceil(Math.random() * 500),
                }}
                key={index}
                ref={(el) => (dragRefs.current[index] = el)}
                draggable
                onDragStart={dragStartHandler}
                onDragEnd={dragEndHandler}
                onDrag={dragHandler}
                onDragOver={dragOverHandler}>
                {letter}
              </li>
            ))}
          </ul>
          <div style={{ display: 'flex' }}>
            {letters.map((_, index) => (
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  border: '1px solid black',
                }}
                key={index}
                ref={(el) => (dropRefs.current[index] = el)}></div>
            ))}
          </div>
        </>
      ) : (
        <button onClick={() => setIsGameStarted(true)}>Start Game</button>
      )}
    </>
  );
}
