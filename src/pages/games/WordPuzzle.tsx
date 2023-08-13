import { useEffect, useRef, useState } from 'react';
import {
  Container,
  DropBox,
  DropBoxWrapper,
  Img,
  Wrapper,
  Letter,
} from '../../components/games/WordPuzzle.tsx';
import { GameProps } from '../../routes/gameRouter.tsx';
import {
  AnswerFeedback,
  Correct,
} from '../../components/common/AnswerFeedback.tsx';
import { styled } from 'styled-components';

export default function WordPuzzle({
  gameData,
  onGameEnd,
  saveGameResult,
  isNextButtonClicked,
}: GameProps) {
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
  const containerRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<Date | null>(new Date());
  const endTimeRef = useRef<Date | null>(null);
  let duration = useRef(0);
  const [answerState, setAnswerState] = useState('');

  // 글자가 처음 흩뿌려질 위치 조정
  const calculateRandomPosition = () => {
    if (containerRef.current && dropRefs.current[dropRefs.current.length - 1]) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const lastDropRef = dropRefs.current[dropRefs.current.length - 1];
      if (lastDropRef) {
        const dropRefRect = lastDropRef.getBoundingClientRect();
        const randomTop =
          Math.floor(
            Math.random() * (containerRect.bottom - dropRefRect.bottom) +
              dropRefRect.bottom,
          ) - 10;
        const randomLeft =
          Math.floor(
            Math.random() * (containerRect.right - containerRect.left) +
              containerRect.left,
          ) - 40;
        return { top: randomTop, left: randomLeft };
      }
    }
    return { top: 0, left: 0 };
  };

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

  const checkAnswer = async () => {
    // 방법 1: 드래그한 요소와 박스를 매칭할 수 있는 속성 부여 -> 이 방법으로 구현
    // 방법 2: 요소를 드래그한 후 드롭했을 때 박스의 터치 감지
    for (let i = 0; i < letters.length; i++) {
      let el = dropRefs.current[i];
      let letter = el?.getAttribute('letter');
      if (!letter || letter !== letters[i]) {
        // 오답
        setAnswerState('incorrect');
        saveGameResult(gameData.problemId, duration.current, 'FAIL', 0);
        await new Promise<void>((resolve) => {
          setTimeout(() => {
            setAnswerState('');
            resolve();
          }, 2000);
        });
        onGameEnd();
        return;
      }
    }
    // 정답
    setAnswerState('correct');
    saveGameResult(gameData.problemId, duration.current, 'SUCCESS', 10);
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        setAnswerState('');
        resolve();
      }, 2000);
    });
    onGameEnd();
  };

  useEffect(() => {
    if (isNextButtonClicked) {
      endTimeRef.current = new Date();
      if (startTimeRef.current && endTimeRef.current) {
        duration.current =
          (endTimeRef.current.getTime() - startTimeRef.current.getTime()) /
          1000;
      }
      checkAnswer();
    }
  }, [isNextButtonClicked]);

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

  // onDragStart : Item을 잡기 시작했을 때 발생
  // onDrag : onDragStart 직후부터 onDragEnd 직전까지 계속 발생
  // onDragEnd : 잡은 Item을 놓았을 때 발생
  // onDragEnter : 잡은 Item이 다른 Item이랑 겹쳐졌을 때 발생
  // onDragOver : 잡은 Item이 다른 Item과 겹쳐졌을 때 milli sec마다 발생 -> prevent로 발생 막기
  // onDragLeave : 잡은 Item이 다른 Item에 겹쳐졌다가 떠났을 때 발생
  const dragStartHandler = (
    e: React.DragEvent<HTMLElement> | React.TouchEvent<HTMLElement>,
  ) => {
    const [clientX, clientY] = getClientXY(e);

    posX = clientX;
    posY = clientY;
  };

  const dragHandler = (
    e: React.DragEvent<HTMLElement> | React.TouchEvent<HTMLElement>,
  ) => {
    const [clientX, clientY] = getClientXY(e);

    (e.target as HTMLElement).style.left = `${
      (e.target as HTMLElement).offsetLeft + clientX - posX
    }px`;
    (e.target as HTMLElement).style.top = `${
      (e.target as HTMLElement).offsetTop + clientY - posY
    }px`;

    posY = clientY;
    posX = clientX;
  };

  const dragEndHandler = (
    e: React.DragEvent<HTMLElement> | React.TouchEvent<HTMLElement>,
  ) => {
    let [clientX, clientY] = [0, 0];

    if ('touches' in e && e.changedTouches.length > 0) {
      // 터치 이벤트일 경우
      const lastTouch = e.changedTouches[e.changedTouches.length - 1];
      clientX = lastTouch.clientX;
      clientY = lastTouch.clientY;
    } else if ('clientX' in e) {
      // 드래그 이벤트일 경우
      clientX = e.clientX;
      clientY = e.clientY;
    }

    for (let i = 0; i < letters.length; i++) {
      const box = boxs[i];
      // 드래그한 글자가 박스에 안착했을 경우
      if (
        box.left < clientX &&
        clientX < box.right &&
        box.top < clientY &&
        clientY < box.bottom
      ) {
        (e.target as HTMLElement).style.left = `${
          (box.left + box.right) / 2
        }px`;
        (e.target as HTMLElement).style.top = `${(box.top + box.bottom) / 2}px`;
        (e.target as HTMLElement).style.transform = 'translate(-50%, -50%)';

        dropRefs.current[i]?.setAttribute(
          'letter',
          (e.target as HTMLElement).innerText,
        );
        return;
      }
    }
    // 박스를 벗어났을 경우
    (e.target as HTMLElement).style.left = `${
      (e.target as HTMLElement).offsetLeft + clientX - posX
    }px`;
    (e.target as HTMLElement).style.top = `${
      (e.target as HTMLElement).offsetTop + clientY - posY
    }px`;
  };

  const dragOverHandler = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <Container ref={containerRef}>
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
              <Letter
                style={{
                  position: 'absolute',
                  ...calculateRandomPosition(),
                  touchAction: 'none',
                }}
                key={`${index}^_^${i}`}
                ref={(el) => (dragRefs.current[index] = el)}
                draggable
                onDragStart={dragStartHandler}
                onDragEnd={dragEndHandler}
                onDrag={dragHandler}
                onDragOver={dragOverHandler}
                onTouchStart={dragStartHandler}
                onTouchMove={dragHandler}
                onTouchEnd={dragEndHandler}>
                {letter}
              </Letter>
            )),
          )}
        </ul>
      </Container>
      <AnswerFeedback>
        {answerState === 'correct' ? (
          <Correct />
        ) : answerState === 'incorrect' ? (
          <ShowAnswer>
            <p>
              정답은 [
              {answers.map((v, i) => {
                if (i === answers.length - 1) return v.contents;
                return `${v.contents}, `;
              })}
              ]입니다.
            </p>
          </ShowAnswer>
        ) : null}
      </AnswerFeedback>
    </>
  );
}

const ShowAnswer = styled.div`
  font-size: 5rem;
  width: 50rem;
  height: 50rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--main-bg-color);
  border-radius: 1.3rem;
  box-shadow: 15px 13px 28px 0px rgba(0, 0, 0, 0.06);
  padding: 4rem;
  word-break: keep-all;
  text-align: center;
  @media screen and (max-width: 767px) {
    font-size: 2rem;
    width: 20rem;
    height: 20rem;
    padding: 2rem;
  }
`;
