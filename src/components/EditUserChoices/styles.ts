import styled from "styled-components";

export const Bck = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(10px);

  opacity: 0;
  z-index: -1;
  max-height: 0;
`;

export const Wrapper = styled.div`
  position: fixed;
  left: 0;
  margin: 10vh 10vw;
  width: 60vw;
  padding: 0 10vw;
  padding-bottom: 5vh;
  background-color: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 0 10px black;
  display: flex;
  flex-direction: column;
  align-items: center;
  > hr {
    width: 100%;
  }
  > h4 {
    margin-bottom: 0.5vh;
  }
  > p {
    margin-top: 0.5vh;
  }

  /* z-index: 6; */
  opacity: 0;
  z-index: -1;
  max-height: 0;
  overflow-y: scroll;
  overflow-x: hidden;
  @media (min-width: 750px) {
    width: 50vw;
    margin: 10vh 15vw;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  > svg {
    position: absolute;
    right: 5vw;
  }
`;
