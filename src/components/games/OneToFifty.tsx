import styled from 'styled-components';

const CellWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
`;

const Container1 = styled.div<{ $gameFlag: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: 0.1rem solid red;
  pointer-events: ${(props) => (!props.$gameFlag ? 'none' : 'auto')};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
`;

type CellProps = {
  num: number;
  handleClick: (num: number) => void;
  $gameFlag: boolean;
};

function Cell({ num, handleClick, $gameFlag }: Readonly<CellProps>) {
  return (
    <Container1 onClick={() => handleClick(num)} $gameFlag={$gameFlag}>
      <span>{num}</span>
    </Container1>
  );
}

const Container2 = styled.div`
  max-width: 100rem;
  max-height: 100rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  margin: 0 auto;
`;

type BoardProps = {
  numbers: number[];
  handleClick: (num: number) => void;
  $gameFlag: boolean;
};

function Board({ numbers, handleClick, $gameFlag }: Readonly<BoardProps>) {
  return (
    <Container2>
      {numbers.map((num) => (
        <CellWrapper key={num}>
          <Cell num={num} handleClick={handleClick} $gameFlag={$gameFlag} />
        </CellWrapper>
      ))}
    </Container2>
  );
}

const StartBtn = styled.button`
  font-size: 4rem;
  padding: 2rem;
  margin: 2rem 0 0 0;
`;

export { Board, StartBtn };
