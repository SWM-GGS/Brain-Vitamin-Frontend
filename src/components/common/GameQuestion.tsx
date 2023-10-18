import styled from 'styled-components';

const Text = styled.p`
  font-size: 3.2rem;
  text-align: center;
  word-break: keep-all;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 2.4rem;
  }
  @media screen and (max-width: 767px) {
    font-size: 2rem;
  }
`;

interface Props {
  text: string;
}

export default function GameQuestion({ text }: Readonly<Props>) {
  return <Text>{text}</Text>;
}
