import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle<{ fontSize: number }>`
  html {
    font-size: ${(props) =>
      props.fontSize === 1
        ? '62.5%'
        : props.fontSize === 2
        ? '70.3125%'
        : '78.125%'};
  }
`;

export default GlobalStyle;
