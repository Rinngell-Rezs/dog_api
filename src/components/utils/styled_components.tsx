import styled from "styled-components";

const Main = {
  Wrapper: styled.main`
    display: flex;
    position: absolute;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: center;
    background-color:rgba(255, 255, 255, 0);
    top: 15vh;
    bottom: 150vh;
    left: 8vw;
    right: 8vw;
    min-height: auto;
    height: max-content;
  `,
  Header: styled.header`
    height: 10vh;
    position: fixed;
    flex-flow: column;
    width: 100%;
    background: white;
    top: 0;
    right: 0; 
    left: 0; 
    align-content: center;
    box-shadow: 1px 1px 10px 1px grey;
    z-index: 3090; 
  `,
  Content: styled.div`
    min-height: fit-content;
    height: 40vh;
    box-shadow: 1px 1px 10px 1px black;
    background: white;
    width: 100%;
    text-align: center;
    color: black;
    top: 0vh;
    bottom: 10vh;
    left: 0vw;
    right: 0vw;
    clear: both;
    margin-top: 5vh;
    margin-bottom: 10vh;
  `,
  Footer: styled.footer`
    display: flex;
    position: fixed;
    height: 6vh;
    background-color: white;
    bottom: 0;
    right: 0;
    left: 0;
    flex-flow: column;
    width: 100%;
    z-index: 3090; 
  `,
};

const Icon = styled.i`
    aspect-ratio: 1/1 !important;
    max-height: 4.5vh;
    font-family: 'Material Symbols Outlined';
    font-weight: normal;
    font-style: normal;
    font-size: 2.8vh;
    line-height: 100%;
    letter-spacing: normal;
    text-transform: none;
    display: inline;
    white-space: nowrap;
    direction: ltr;
    text-rendering: optimizeLegibility;
    margin: .25vh !important;
    padding: .25vh !important;
    vertical-align: middle;
    pointer-events: none;

    *::after,
    *::before {
      display: none;
    }`;

export { Main, Icon };
