import styled from 'styled-components';

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

export { Container, PresentedFlag };
