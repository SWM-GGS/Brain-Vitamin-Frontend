import axios from 'axios';
import { useEffect, useState } from 'react';
import { MazeBox, Target } from '../../components/games/Maze';

export default function Maze() {
  const [imgUrl, setImgUrl] = useState('');
  type mazeDetailDtoListProps = {
    x: number;
    y: number;
    answer: boolean;
  };
  const [mazeDetailDtoList, setMazeDetailDtoList] = useState<
    mazeDetailDtoListProps[]
  >([]);

  const getData = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/vitamins/maze`,
      );
      setImgUrl(data.result.imgUrl);
      setMazeDetailDtoList(data.result.mazeDetailDtoList);
    } catch (error) {
      if (axios.isAxiosError<{ message: string }>(error)) {
        alert(error.response?.data.message);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const answerCnt = mazeDetailDtoList.filter((item) => item.answer).length;
  let cnt = 0;

  const checkAnswer = (el: HTMLElement, index: number) => {
    if (!mazeDetailDtoList[index].answer) {
      console.log('틀렸습니다. 다시 선택해주세요.');
      return;
    }
    console.log('정답입니다!');
    el.style.display = 'none';
    cnt++;

    if (cnt === answerCnt) {
      alert('축하드립니다! 모두 맞추셨습니다!');
    }
  };

  return (
    <MazeBox $imgUrl={imgUrl}>
      {mazeDetailDtoList.map((item, index) => (
        <Target
          key={index}
          x={item.x}
          y={item.y}
          $bgColor={'#' + Math.floor(Math.random() * 0xffffff).toString(16)}
          onClick={(e) => checkAnswer(e.target as HTMLElement, index)}
        />
      ))}
    </MazeBox>
  );
}
