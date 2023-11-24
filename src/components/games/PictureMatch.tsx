import styled from 'styled-components';

const PresentedContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const ImageBox = styled.img`
  width: 220px;
  height: 220px;
  border: 0.2rem solid var(--black-color);
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 130px;
    height: 130px;
  }
  @media screen and (max-width: 767px) {
    width: 100px;
    height: 100px;
  }
`;
const Box = styled.div`
  width: 220px;
  height: 220px;
  border: 0.4rem dashed var(--main-color);
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 130px;
    height: 130px;
  }
  @media screen and (max-width: 767px) {
    width: 100px;
    height: 100px;
    border: 0.2rem dashed var(--main-color);
  }
`;
const Quiz = styled.span`
  color: var(--main-color);
`;
const PresentedImg = ({ $presented }: { $presented: string }) => {
  return (
    <PresentedContainer>
      <ImageBox alt="" src={$presented} />
      <Box>
        <Quiz>?</Quiz>
      </Box>
    </PresentedContainer>
  );
};

export { PresentedImg };
