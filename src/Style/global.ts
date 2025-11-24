import { createGlobalStyle } from "styled-components";

export const Global = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root{
    font-size: 16px;
    font-family: "Roboto Serif", serif;
  }

  body{
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    transition: background  ease-in-out;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }
`;
