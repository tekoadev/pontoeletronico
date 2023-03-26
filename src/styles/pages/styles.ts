import styled from "styled-components";

export const Container = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-content: center;
  justify-content: center;
  align-items: center;
`;

export const Wrapper = styled.div`
  width: 80vw;
  margin: 0 10vw;
  display: flex;
  align-items: flex-start;
  align-content: center;
  justify-content: center;
  box-shadow: 0 0 15px black;
  border-radius: 10px;
  z-index: 1;
  margin-top: 5vh;
  @media (min-width: 765px) {
    width: 50%;
  }
`;

export const LoginForm = styled.form`
  z-index: 2;
  width: 100%;
  padding: 10%;
  padding-bottom: 0;
  gap: 1vh;
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
  justify-content: center;
  flex-direction: column;
  background-color: var(--select);
  color: var(--text);
  border-radius: 10px;
  border: 1px solid #3c31dd;
  > h3 {
    width: 100%;
    margin: 0 0 1vh 0;
    text-align: center;
    color: #3c31dd;
  }
  > hr {
    color: var(--text);
    width: 100%;
    display: flex;
    z-index: 3;
  }
  @media (min-width: 765px) {
  }
  > div {
    width: 100%;
    position: relative;

    > svg {
      position: absolute;
      right: 15px;
      top: 5px;
      height: 35px;
      width: 35px;
    }
  }
`;

export const Label = styled.label``;

export const ErrorLabel = styled.label`
  min-height: 20px;
  margin-bottom: 15px;
  margin-left: 10px;
  color: var(--red-alert);
`;

export const Input = styled.input`
  width: 100%;
  height: 45px;
  background-color: transparent;
  border-radius: 0;
  color: var(--inputs);
  padding: 3% 2%;
  border: none;
  border-bottom: 1px solid #3c31dd;
  outline: none;
  :focus-visible,
  :active {
    border-bottom: 1px solid var(--white);
    color: var(--white);
    ::placeholder {
      color: var(--white);
    }
  }
`;

export const Button = styled.button`
  width: 40%;
  margin: 5vh 30%;
  background-color: #3c31dd;
  border-radius: 10px;
  padding: 2%;
  color: var(--white);
`;
