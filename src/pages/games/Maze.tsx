import { Container, MazeBox, Target } from '../../components/games/Maze';
import { GameProps } from '../../routes/gameRouter';

export default function Maze({ gameData, onGameEnd }: GameProps) {
  type Props = {
    x: number;
    y: number;
    answer: boolean;
    imgUrl: string;
  };
  const problemPool: Props[] = gameData.problemPool;
  const answerCnt = problemPool.filter((item) => item.answer).length;
  let cnt = 0;

  const checkAnswer = (el: HTMLElement, index: number) => {
    if (!problemPool[index].answer) {
      console.log('틀렸습니다. 다시 선택해주세요.');
      return;
    }
    console.log('정답입니다!');
    el.style.display = 'none';
    cnt++;

    if (cnt === answerCnt) {
      onGameEnd();
    }
  };

  return (
    <Container>
      <MazeBox $imgUrl={problemPool[0].imgUrl}>
        {problemPool.map((item, index) => (
          <Target
            key={index}
            x={item.x}
            y={item.y}
            $bgColor={'#' + Math.floor(Math.random() * 0xffffff).toString(16)}
            onClick={(e) => checkAnswer(e.target as HTMLElement, index)}
          />
        ))}
      </MazeBox>
    </Container>
  );
}
