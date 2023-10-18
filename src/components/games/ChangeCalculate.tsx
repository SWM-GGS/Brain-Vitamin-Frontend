import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;
const Text = styled.span`
  font-size: 4rem;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 3rem;
  }
  @media screen and (max-width: 768px) {
    font-size: 1.6rem;
  }
`;
const Image = styled.img`
  width: 400px;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 200px;
  }
  @media screen and (max-width: 768px) {
    width: 150px;
  }
`;

interface Props {
  $imgUrl: string;
}

function Presented({ $imgUrl }: Readonly<Props>) {
  return (
    <Container>
      <Text>지불한 금액 : </Text>
      <Image alt="" src={$imgUrl} />
    </Container>
  );
}

export default Presented;
