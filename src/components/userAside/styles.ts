import styled from "styled-components";

export const Open = styled.aside`
  position: fixed;
  left: 0;
  width: 60vw;
  height: 100%;
  background-color: var(--naval);
  margin: 0;
  box-shadow: 0 0 15px black;
  display: flex;
  flex-direction: column;
  color: var(--white);
  padding: 0 5vw;
  > hr {
    width: 100%;
  }
  opacity: 0;
  z-index: -1;

  @media (min-width: 760px) {
    width: 30vw;
  }
`;

export const OpenBck = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(10px);
  z-index: -1;
  opacity: 0;
`;

export const Text = styled.p`
  margin-bottom: 20px;
  color: white;
  font-size: 20px;
`;

export const HeaderMenu = styled.div`
  height: 8vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--text);
  margin-bottom: 1vh;

  > p:nth-child(1) {
    margin: 0px;
  }
`;

export const Closed = styled.button`
  position: fixed;
  right: 5vw;
  top: 10vw;
  width: 10vw;
  height: 10vw;
  color: var(--white);
  border: none;
  z-index: 3;
  > svg {
    height: 100%;
    width: 100%;
  }

  @media (min-width: 760px) {
    width: 5vw;
    height: 5vw;
    top: 5vw;
  }
`;
