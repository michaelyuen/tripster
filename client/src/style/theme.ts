import { DefaultTheme, createGlobalStyle } from "styled-components";
import { colorText, colorBackground, colorLink } from "./themeFunctions";

const darkMode =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

export const theme: DefaultTheme = {
  color: {
    background: darkMode ? "#1b1b1b" : "#FFFFFF",
    link: "#7f5af0",
    buttonText: "#fffffe",
    text: darkMode ? "#FFFFFF" : "#000",
    secondary: "#7f5af0"
  },
  grid: {
    maxWidth: "1600px",
    fullPageFormWidth: "300px"
  },
  spacing: {
    default: "10px",
    borderRadius: "4px",
    border: "1px",
    large: "60px"
  },
  font: {
    small: "12px",
    medium: "14px"
  }
};

export const GlobalStyle = createGlobalStyle`
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${colorText};
    background: ${colorBackground};
  }
  a {
    text-decoration: none;
    color: ${colorLink};
  }
`;
