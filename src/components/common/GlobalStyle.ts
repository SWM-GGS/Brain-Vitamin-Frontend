import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle<{ fontSize: string }>`
  html {
    font-size: ${(props) =>
      props.fontSize === 'small'
        ? '62.5%'
        : props.fontSize === 'medium'
        ? '70.3125%'
        : '78.125%'};
  }
`;

export default GlobalStyle;
