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

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
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

  input:checked + .slider {
    background-color: #2196f3;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`;

export const ContainerInput = styled.div`
  width: 320px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export const LabelText = styled.label`
  font-size: 18px;
  font-weight: bold;
  color: black;
  margin-bottom: 10px;
`;

export const Input = styled.input`
  width: 80%;
  border: 1px solid black;
  padding-left: 20px;
  padding: 10px;
  font-size: large;
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

  :checked{
    background-color: #2196f3;
  }
`;
