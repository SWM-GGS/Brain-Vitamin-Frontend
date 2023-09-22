import styled from 'styled-components';
import {
  ItemsProps,
  useConnectLineMatcher,
} from '../../hooks/useConnectLineMatcher';

const Container = styled.div`
  padding: 1.6rem;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 5.5rem;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    gap: 1rem;
    padding: 0;
  }
  @media screen and (max-width: 767px) {
    gap: 0;
    padding: 0;
  }
`;
const FlagContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  @media screen and (max-width: 767px) {
    gap: 1rem;
  }
`;
const FlagImage = styled.img`
  width: 300px;
  border: 0.2rem solid var(--black-color);
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 150px;
  }
  @media screen and (max-width: 767px) {
    width: 100px;
  }
`;
const Letter = styled.span`
  font-size: 5rem;
  font-family: 'Pretendard-Bold';
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 3rem;
  }
  @media screen and (max-width: 767px) {
    font-size: 2rem;
  }
`;
function PresentedFlag({
  $imgUrl,
  $letter,
}: {
  $imgUrl: string;
  $letter: string;
}) {
  return (
    <FlagContainer>
      <FlagImage alt="" src={$imgUrl} />
      <Letter>{$letter}</Letter>
    </FlagContainer>
  );
}

const StyledMatchContainer = styled.div<{ $isLayoutUpAndDown: boolean }>`
  display: flex;
  ${(props) =>
    props.$isLayoutUpAndDown && `flex-direction: column; height: 100%;`}
  justify-content: space-between;
`;
const SourceContainer = styled.div<{
  $itemCount: number;
  $isLayoutUpAndDown: boolean;
}>`
  display: grid;
  gap: 1rem;
  ${(props) =>
    props.$isLayoutUpAndDown
      ? `grid-template-columns: repeat(${props.$itemCount}, 1fr); align-items: end;`
      : `grid-template-rows: repeat(${props.$itemCount}, 1fr); justify-items: end;`}
`;
const TargetContainer = styled.div<{
  $itemCount: number;
  $isLayoutUpAndDown: boolean;
}>`
  display: grid;
  gap: 1rem;
  ${(props) =>
    props.$isLayoutUpAndDown
      ? `grid-template-columns: repeat(${props.$itemCount}, 1fr);`
      : `grid-template-rows: repeat(${props.$itemCount}, 1fr);`}
`;
const ItemContainer = styled.div<{ $isLayoutUpAndDown: boolean }>`
  display: flex;
  ${(props) => props.$isLayoutUpAndDown && `flex-direction: column;`}
  align-items: center;
  gap: 1rem;
`;
const Dot = styled.div`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background-color: var(--main-color);
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 30px;
    height: 30px;
  }
  @media screen and (max-width: 767px) {
    width: 22px;
    height: 22px;
  }
`;
type MatchContainerProps = {
  items: ItemsProps[];
  isLayoutUpAndDown?: boolean;
  setIsCorrectMatch?: React.Dispatch<React.SetStateAction<boolean>>;
};
function MatchContainer({
  items,
  isLayoutUpAndDown,
  setIsCorrectMatch,
}: MatchContainerProps) {
  const {
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
  } = useConnectLineMatcher(items, setIsCorrectMatch);

  return (
    <StyledMatchContainer $isLayoutUpAndDown={isLayoutUpAndDown || false}>
      <SourceContainer
        $itemCount={itemCount}
        $isLayoutUpAndDown={isLayoutUpAndDown || false}>
        {sources.map((v) => (
          <ItemContainer
            key={v.id}
            ref={(el) => (sourceRefs.current[sourceRefs.current.length] = el)}
            id={`source-${v.id}`}
            draggable
            onDragStart={dragStartHandler}
            onDragEnd={dragEndHandler}
            onDrag={dragHandler}
            onDragOver={dragOverHandler}
            onTouchStart={dragStartHandler}
            onTouchMove={dragHandler}
            onTouchEnd={dragEndHandler}
            $isLayoutUpAndDown={isLayoutUpAndDown || false}>
            <FlagImage
              style={{ pointerEvents: 'none' }}
              alt=""
              src={v.imageURL}
            />
            <Dot
              style={{ pointerEvents: 'none' }}
              ref={(el) =>
                (sourceDotRefs.current[sourceDotRefs.current.length] = el)
              }
              id={`source-${v.id}`}
            />
          </ItemContainer>
        ))}
      </SourceContainer>
      <TargetContainer
        $itemCount={itemCount}
        $isLayoutUpAndDown={isLayoutUpAndDown || false}>
        {targets.map((v) => (
          <ItemContainer
            key={v.id}
            ref={(el) => (targetRefs.current[targetRefs.current.length] = el)}
            id={`target-${v.id}`}
            draggable
            onDragStart={dragStartHandler}
            onDragEnd={dragEndHandler}
            onDrag={dragHandler}
            onDragOver={dragOverHandler}
            onTouchStart={dragStartHandler}
            onTouchMove={dragHandler}
            onTouchEnd={dragEndHandler}
            $isLayoutUpAndDown={isLayoutUpAndDown || false}>
            <Dot
              style={{ pointerEvents: 'none' }}
              ref={(el) =>
                (targetDotRefs.current[targetDotRefs.current.length] = el)
              }
              id={`target-${v.id}`}
            />
            <Letter style={{ pointerEvents: 'none' }}>{v.text}</Letter>
          </ItemContainer>
        ))}
      </TargetContainer>
      {lines.map(
        (line) =>
          line.startCoord &&
          line.endCoord && (
            <svg
              key={`(${line.startCoord.x},${line.startCoord.y})`}
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
              }}>
              {line.startCoord && line.endCoord && (
                <line
                  x1={line.startCoord.x}
                  y1={line.startCoord.y}
                  x2={line.endCoord.x}
                  y2={line.endCoord.y}
                  stroke="var(--main-color)"
                  strokeWidth="10"
                />
              )}
            </svg>
          ),
      )}
    </StyledMatchContainer>
  );
}

export { Container, PresentedFlag, MatchContainer };
