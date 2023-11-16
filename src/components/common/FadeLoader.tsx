import styled, { keyframes } from 'styled-components';

const fade = keyframes`
  0% {
    opacity: 0.2;
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const LoaderElement = styled.div`
  position: absolute;
  animation: ${fade} 1.2s infinite ease-in-out;
  transform-origin: center bottom;
`;

type Props = {
  color?: string;
  width?: number;
  height?: number;
  radius?: number;
  margin?: number;
};
function FadeLoader({ color, width, height, radius, margin }: Readonly<Props>) {
  const numElements = 8;
  const elements = [];

  for (let i = 0; i < numElements; i++) {
    const elementStyle = {
      transform: `translate(-50%, -50%) rotate(${45 * i}deg) translate(0, -${
        margin ?? 10
      }px)`,
      animationDelay: `${-1 * (numElements - i) * 0.15}s`,
      backgroundColor: color ?? 'white',
      width: `${width ?? 5}px`,
      height: `${height ?? 15}px`,
      borderRadius: `${radius ?? 2}px`,
    };
    elements.push(<LoaderElement style={elementStyle} />);
  }

  return <LoaderContainer>{elements}</LoaderContainer>;
}

export default FadeLoader;
