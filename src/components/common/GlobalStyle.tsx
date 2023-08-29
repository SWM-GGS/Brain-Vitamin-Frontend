import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle<{ fontSize: number }>`
  html {
    font-size: ${(props) => {
      if (props.fontSize === 1) {
        return '62.5%';
      }
      if (props.fontSize === 2) {
        return '70.3125%';
      }
      if (props.fontSize === 3) {
        return '78.125%';
      }
    }}
`;

export default GlobalStyle;
