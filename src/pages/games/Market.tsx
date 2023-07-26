import axios from 'axios';
import { useEffect, useState } from 'react';
import { Memo, Container, Img, Button } from '../../components/games/Market';

export default function Market() {
  type ListProps = {
    category: string;
    count: number;
    elementName: string;
    imgUrl: string;
    price: number;
  };
  const [list, setList] = useState<ListProps[]>([]);

  const getData = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/vitamins/market`,
      );
      setList(data.result);
    } catch (error) {
      if (axios.isAxiosError<{ message: string }>(error)) {
        alert(error.response?.data.message);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const checkAnswer = (el: HTMLElement) => {
    if (+el.innerText === answer) {
      alert('정답입니다!');
    } else {
      alert('틀렸습니다 ㅜ.ㅜ');
    }
  };

  const answer = list.reduce((p, c) => p + c.price * c.count, 0);

  return (
    <>
      <h1>
        시장에서 장을 보기 위해, 구매할 품목을 메모지에 적어놓았습니다.
        <br />총 얼마를 지불해야 할까요?
      </h1>
      <Memo>
        {list.map((v, i) => (
          <span key={i}>
            {v.elementName} {v.count}개
          </span>
        ))}
      </Memo>
      {list.map((item, index) => (
        <Container key={index}>
          <Img src={item.imgUrl} />
          <div>
            <p>{item.elementName}</p>
            <p>{item.price}원</p>
          </div>
        </Container>
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <Button key={i} onClick={(e) => checkAnswer(e.target as HTMLElement)}>
          {answer + i * 1000}
        </Button>
      ))}
    </>
  );
}
