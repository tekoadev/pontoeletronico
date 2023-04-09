import styled from "styled-components";

export const MainContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  padding-top: 160px;
  padding-bottom: 240px;
  display: flex;
  flex-direction: column;
  gap: 180px;
  align-items: center;
  justify-content: start;
`;

export const ContainerGenericTitle = styled.div`
  display: flex;
  color: var(--white);
  flex-direction: column;
  gap: 20px;
  width: 100%;

  @media (max-width: 1025px) {
    align-items: center;
  }
`;

export const Title = styled.h2`
  color: var(--white);
  font-weight: bold;
  width: 100%;
  font-size: 32px;

  @media (max-width: 1250px) {
    font-size: 26px;
  }

  @media (max-width: 1024px) {
    font-size: 32px;
  }

  @media (max-width: 768px) {
    font-size: 24px;
  }

  @media (max-width: 425px) {
    font-size: 20px;
  }

  @media (max-width: 325px) {
    font-size: 16px;
  }
`;

export const HighlightText = styled.span`
  font-size: 72px;
  color: var(--white);

  @media (max-width: 1460px) {
    font-size: 48px;
  }

  @media (max-width: 1250px) {
    font-size: 36px;
  }

  @media (max-width: 1024px) {
    font-size: 56px;
  }

  @media (max-width: 768px) {
    font-size: 48px;
  }

  @media (max-width: 600px) {
    font-size: 38px;
  }

  @media (max-width: 500px) {
    font-size: 28px;
  }

  @media (max-width: 375px) {
    font-size: 22px;
  }
`;

export const SubTitle = styled.p`
  color: var(--white);
  font-size: 18px;
  width: 100%;

  @media (max-width: 1250px) {
    font-size: 14px;
  }

  @media (max-width: 1024px) {
    font-size: 18px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 425px) {
    font-size: 12px;
  }
`;

export const UnstyledContainer = styled.div``;

export const LineBreaker = styled.br``;

export const GenericInformationContainer = styled.div`
  width: calc((100% / 2.5) - 80px);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 40px;
  min-height: 100%;

  @media (max-width: 1025px) {
    width: 80%;
    align-items: center;
  }
`;

interface IGenericButtonWithBackgroundColorProps {
  textAlign: string;
}

export const GenericButtonWithBackgroundColor = styled.button<IGenericButtonWithBackgroundColorProps>`
  font-size: 14px;
  align-items: center;
  align-content: center;
  display: flex;
  font-weight: bold;
  justify-content: ${(p) =>
    p.textAlign === "left"
      ? "flex-start"
      : p.textAlign == "center"
      ? "center"
      : "flex-end"};
  cursor: pointer;

  height: 60px;
  border: 1px solid var(--white);
  padding: 0px 20px;
  border-radius: 15px;
  background-color: var(--white);
  color: black;

  :hover {
    background-color: transparent;
    color: var(--white);
  }
`;

export const ContainerWithoutBackgroundColor = styled.div`
  width: 100%;
  display: flex;
  gap: 40px;
  justify-content: space-around;
  padding: 40px 40px;

  @media (max-width: 1025px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 40px;
  }
`;

export const Imagem = styled.img`
  width: calc((100% / 2.5) - 80px);
  min-width: 560px;
  max-width: 715px;
  max-height: 400px;

  @media (max-width: 1025px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    width: 100%;
    min-width: auto;
  }
`;

export const Form = styled.form`
  width: 40%;
  min-width: 600px;
  display: flex;
  padding: 40px;
  flex-direction: column;
  gap: 40px;
  border-radius: 24px;
  background-color: #1f2933;

  @media (max-width: 650px) {
    width: 80%;
    min-width: auto;
    align-items: center;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 45px;
  color: var(--white);
  border: 2px solid var(--white);
  padding-left: 20px;
  border-radius: 5px;

  ::placeholder {
    color: var(--white);
  }
`;

export const Label = styled.label`
  color: var(--white);
  padding-left: 5px;
  font-weight: 500;
`;

export const Select = styled.select`
  width: 100%;
  height: 45px;
  color: var(--white);
  border: 2px solid var(--white);
  padding-left: 20px;
  border-radius: 5px;

  ::placeholder {
    color: var(--white);
  }
`;

export const Option = styled.option``;

export const CellContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  gap: 5px;
  height: 47px;
`;

export const InputDDD = styled.input`
  color: black;
  border: 2px solid var(--white);
  padding-left: 10px;
  width: 60px;
  color: var(--white);
  border-radius: 5px;
  height: 45px;

  ::placeholder {
    color: var(--white);
  }
`;

export const PrivacyOrCaptchaContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
`;

export const ContainerCheckbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const Checkbox = styled.input``;
