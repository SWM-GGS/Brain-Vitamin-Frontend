import { useEffect, useRef, useState } from 'react';
import {
  Container,
  DropBox,
  DropBoxWrapper,
  Img,
  Wrapper,
} from '../../components/games/WordPuzzle.tsx';
import { GameProps } from '../../routes/gameRouter.tsx';

export default function WordPuzzle({ gameData, onGameEnd }: GameProps) {
  type Props = {
    contents: string;
    answer: boolean;
    imgUrl: string;
  };
  const problemPool: Props[] = gameData.problemPool;
  const answers = problemPool.filter((v) => v.answer);
  const letters = problemPool
    .filter((v) => v.answer)
    .map((v) => v.contents)
    .join('')
    .split('');
  const dragRefs = useRef<null[] | HTMLLIElement[]>([]);
  const dropRefs = useRef<null[] | HTMLDivElement[]>([]);
  type BoxProps = {
    top: number;
    left: number;
    bottom: number;
    right: number;
  };
  const [boxs, setBoxs] = useState<BoxProps[]>([]);
  let [posX, posY] = [0, 0]; // 드래그 시 요소를 실제로 이동시키기 위해 필요
  type LetterPositionProps = {
    marginTop: number;
    height: number;
    width: number;
  };
  const [letterPosition, setLetterPosition] = useState<LetterPositionProps>({
    marginTop: 0,
    height: 0,
    width: 0,
  }); // 글자가 처음 흩뿌려질 때 위치 조정 위함

  useEffect(() => {
    if (dropRefs.current[0]) {
      setLetterPosition({
        marginTop: dropRefs.current[0].getBoundingClientRect().bottom,
        height: (window.innerHeight || document.body.clientHeight) - 40,
        width: (window.innerWidth || document.body.clientWidth) - 40,
      });
    }

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
    // 방법 1: 드래그한 요소와 박스를 매칭할 수 있는 속성 부여 -> 이 방법으로 구현
    // 방법 2: 요소를 드래그한 후 드롭했을 때 박스의 터치 감지
    for (let i = 0; i < letters.length; i++) {
      let el = dropRefs.current[i];
      let letter = el?.getAttribute('letter');
      if (!letter || letter !== letters[i]) {
        return;
      }
    }
    onGameEnd();
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
      console.log(
        i,
        box,
        e.clientX,
        e.clientY,
        box.left < e.clientX &&
          e.clientX < box.right &&
          box.top < e.clientY &&
          e.clientY < box.bottom,
        (box.left + box.right) / 2,
        (box.top + box.bottom) / 2,
      );
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

        dropRefs.current[i]?.setAttribute(
          'letter',
          (e.target as HTMLElement).innerText,
        );
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
  };

  const dragOverHandler = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <Container>
        <Wrapper>
          {answers.map((item, index) => (
            <div key={index}>
              <Img src={item.imgUrl} />
              <DropBoxWrapper key={index}>
                {item.contents.split('').map((_, i) => (
                  <DropBox
                    key={`${index}-${i}`}
                    ref={(el) =>
                      (dropRefs.current[dropRefs.current.length] = el)
                    }
                  />
                ))}
              </DropBoxWrapper>
            </div>
          ))}
        </Wrapper>
        <ul>
          {problemPool.map((item, index) =>
            item.contents.split('').map((letter, i) => (
              <li
                style={{
                  position: 'absolute',
                  top: Math.floor(
                    Math.random() *
                      (letterPosition.height - letterPosition.marginTop) +
                      letterPosition.marginTop,
                  ),
                  left: Math.floor(Math.random() * letterPosition.width),
                }}
                key={`${index}^_^${i}`}
                ref={(el) => (dragRefs.current[index] = el)}
                draggable
                onDragStart={dragStartHandler}
                onDragEnd={dragEndHandler}
                onDrag={dragHandler}
                onDragOver={dragOverHandler}>
                {letter}
              </li>
            )),
          )}
        </ul>
      </Container>
    </>
  );
}
