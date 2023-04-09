import styled from "styled-components";

export const Bck = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(10px);
  z-index: 4;
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Wrapper = styled.div`
  margin: 10vh 10vw;
  width: 80vw;
  height: 80vh;
  gap: 10px;
  padding: 0 10vw;
  padding-bottom: 5vh;
  background-color: var(--white);
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

  z-index: 5;
  max-height: 80vh;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  > svg {
    position: absolute;
    right: 5vw;
  }
`;

export const Register = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;
