import styled from "styled-components";

export const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0034;
  position: fixed;
  top: 0;
  left: 0;
`;

export const ModalInfo = styled.div`
  width: max-content;
  height: max-content;
  padding: 20px;
  border-radius: 1rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.2);
  gap: 20px;

  > div:nth-child(1) {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    position: relative;
  }

  p {
    font-size: large;
    font-weight: bold;
    > span {
      color: red;
    }
  }

  input {
    padding: 15px 20px;
    font-size: large;
    border: 2px solid black;
    border-radius: 10px;
  }

  svg {
    position: absolute;
    right: 0;
    :hover {
      filter: brightness(1.2);
      cursor: pointer;
    }
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;

  button {
    width: 100%;
    padding: 15px 20px;
    font-size: large;
    font-size: large;
    border-radius: 10px;
    color: white;
    font-weight: bold;
    cursor: pointer;

    :hover {
      filter: brightness(0.6);
    }
  }
  button:nth-child(1) {
    background-color: var(--inputs);
  }
  button:nth-child(2) {
    background-color: red;
  }
`;
