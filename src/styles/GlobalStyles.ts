import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    

    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }

    ::-webkit-scrollbar-track {
      /* background: var(--light-1); */
      background: transparent;
      border-radius: 8px;
    }

    ::-webkit-scrollbar-thumb {
      background: var(--naval);
      border-radius: 8px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: var(--background);
    }
  }


  html, border-style, #root{
    width: 100%;
    height: 100%;
    scroll-behavior: smooth;
  }

  #__next {
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    min-height: 100vh;
    min-width: 100vw;

  }

  body {
    overflow-x: hidden;
    background-color: var(--background);
  }
  *, button, input{
    border: 0;
    background: none;
    font-family: 'Montserrat', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  * button {
    cursor: pointer;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
  * {
    color: var(--text);
  }
  
  :root{
    --primary: #F2B705;
    --primary-hover: #E78E00;
    --primary-header: #E6AE05;
    --primary-light: #F3BE1E;
    --background: #212529;
    --naval: #272B2F;
    --white: #FBFFFC;
    --inputs: #34383c;
    --text: #8C8F8D;
    --select: #252525;
    --medium-gray:#272B2F;
    --dark-gray: #252525;
    --deselect: #3C4042;
    --error: #ECAA00;
    --red-alert: #FF5757;
    --shadow: 0px 5px 15px 0px rgba(0,0,0,0.15);
  }
`;
