import styled from "styled-components";

export const Wrapper = styled.div`
  height: fit-content;
  width: 80vw;
  padding: 0 10vw;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: space-around;
  flex-direction: column;
  gap: 1vh;
  z-index: 1;

  @media (min-width: 765px) {
    width: 40vw;
    padding: 0;
  }
  @media (max-width: 450px) {
    width: 80vw;
    padding: 0;
  }
`;

export const Text = styled.p`
  color: var(--text);
  margin: 1vh 0;
`;

export const ClockText = styled.p`
  color: var(--primary-light);
  margin: 1vh 0;
  text-align: center;
  vertical-align: middle;
  height: auto;
  align-items: center;
  display: flex;

  > svg {
    margin-right: 2vw;
  }
`;

export const Button = styled.button`
  width: 40%;
  margin: 10% 30% 0 30%;
  background-color: var(--primary);
  border-radius: 10px;
  padding: 2%;
  font-weight: bold;
  color: black;
  cursor: pointer;

  @media (min-width: 765px) {
    margin: 0;
  }
`;

export const Form = styled.form`
  width: 80%;
  padding: 10%;
  gap: 1vh;
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
  justify-content: center;
  flex-direction: column;
  background-color: var(--select);
  color: var(--text);
  border-radius: 10px;
  border: 1px solid var(--primary-light);
  box-shadow: 0 0 15px black;
  font-weight: bold;

  @media (min-width: 765px) {
    padding: 2vh 10%;
  }

  @media (max-width: 450px) {
    width: 100%;
  }
`;

export const Label = styled.label``;

export const Input = styled.input`
  background-color: var(--white);
  border-radius: 10px;
  color: var(--inputs);
  padding: 3% 2%;
`;

export const TypeBtn = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: space-around;
  height: 5vh;
  width: 100%;

  @media (min-width: 765px) {
    margin: 0;
  }
`;

interface ChoicesButton {
  active: boolean;
}

export const ChoicesButton = styled.button<ChoicesButton>`
  border-radius: 10px;
  padding: 2% 1vw;
  font-weight: bold;
  color: ${(p) => (p.active ? "black" : "white")};

  @media (min-width: 765px) {
    margin: 0;
  }
`;

export const TextArea = styled.textarea`
  background-color: var(--white);
  border-radius: 10px;
  color: var(--inputs);
  padding: 3% 2%;
  resize: none;
  width: 100%;
`;
