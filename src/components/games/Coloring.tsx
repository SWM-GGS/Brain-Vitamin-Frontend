import { styled } from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(6, 1fr);
  border-top: 2px solid #aaa;
  border-left: 2px solid #aaa;
`;

const CellWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
`;

const Cell = styled.div<{ color?: string }>`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: ${(props) => props.color};
  border-right: 0.2rem solid #aaa;
  border-bottom: 0.2rem solid #aaa;
`;

const Palette = styled.button<{ color: string }>`
  width: 10rem;
  height: 10rem;
  background: ${(props) => props.color};
`;

export { Container, CellWrapper, Cell, Palette };
