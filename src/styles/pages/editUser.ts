import styled from "styled-components";

export const Wrapper = styled.div`
  z-index: 1;

  flex-direction: column;
  align-content: space-around;
  justify-content: space-between;
  align-items: center;
  min-height: 86vh;
  min-width: 100vw;
  padding: 0 80px;
  padding-top: 14vh;
  padding-bottom: 5vh;
  background-color: #ebf0f5;
`;

export const FormContainer = styled.form`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 40px;

  padding: 40px;
  height: fit-content;
  min-height: 60vh;
  box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  background-color: var(--white);
  margin: 0 auto;
  margin-top: 80px;

  > div:nth-child(1) {
    width: 100%;

    select{
      width: calc((100% - 40px) / 3);
    }
  }

  @media (max-width: 948px) {
    margin-top: 180px;

    margin-bottom: 180px;
  }
`;

export const ContainerInput = styled.div`
  width: calc((100% - 40px) / 3);
  min-width: 320px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 320px) {
    min-width: 280px;
  }
`;

export const LabelText = styled.label`
  font-size: 18px;
  font-weight: bold;
  color: black;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  > label {
    font-size: 10px;
  }
`;

export const Input = styled.input`
  width: 80%;
  border: 1px solid black;
  padding-left: 20px;
  padding: 10px;
  font-size: large;
  color: black;
`;

export const SubmitButton = styled.button`
  background-color: green;
  border: none;
  padding: 12px;
  border-radius: 12px;
  width: 80%;
  color: var(--white);
  font-weight: 600;
`;

export const CheckboxContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

export const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  :checked {
    background-color: #2196f3;
  }

  :focus {
    box-shadow: 0 0 1px #2196f3;
  }

  :checked {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
`;

export const Slider = styled.div`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;

  :before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  :before {
    border-radius: 50%;
  }
`;

export const EmploySelect = styled.select`
  width: 80%;
  border: 1px solid black;
  padding-left: 20px;
  padding: 10px;
  font-size: large;
  color: black;
`;

export const EmployOptions = styled.option`
  width: 100%;
`;