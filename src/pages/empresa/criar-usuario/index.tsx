/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from "react";
import Header from "@/components/HeaderAdm";
import * as S from "@/styles/pages/createUser";
import { useGeneral } from "@/context/generalContext";
import { useCompanyContext } from "@/context/companyContext";
import { cpfFormatter } from "@/utils/masks";

export default function RegisterUser() {
  const { showAlert } = useGeneral();
  const { createUser } = useCompanyContext();

  const [data, setData] = useState({
    name: "",
    user: "",
    cpf: "",
    password: "",
    email: "",
    phone: "",
    hourly: true,
  });

  const HandlerSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (data.name === "") {
      showAlert("error", "Nome obrigatório", "Campo obrigatório");
      return false;
    }
    if (data.user === "") {
      showAlert("error", "Usuário obrigatório", "Campo obrigatório");
      return false;
    }
    if (data.cpf === "") {
      showAlert("error", "CPF obrigatório", "Campo obrigatório");
      return false;
    }
    if (data.cpf.length < 14) {
      showAlert("error", "CPF inválido", "");
      return false;
    }
    if (data.password === "") {
      showAlert("error", "Senha obrigatória", "Campo obrigatório");
      return false;
    }
    if (data.password.length < 6) {
      showAlert("error", "Tamanho mínimo senha", "O tamanho mínimo é de 6 caracteres");
      return false;
    }
    return true;
  };

  return (
    <>
      <Header></Header>

      <S.FormContainer>
        <S.ContainerInput>
          <S.LabelText>
            Nome do Funcionário <label>obrigatório</label>
          </S.LabelText>
          <S.Input
            type="text"
            placeholder="Ex: Maria"
            value={data.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setData({ ...data, name: e.target.value })
            }
          />
        </S.ContainerInput>

        <S.ContainerInput>
          <S.LabelText>
            Usuário de acesso <label>obrigatório</label>
          </S.LabelText>
          <S.Input
            type="text"
            placeholder="Ex: Silva"
            value={data.user}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setData({ ...data, user: e.target.value })
            }
          />
        </S.ContainerInput>

        <S.ContainerInput>
          <S.LabelText>
            CPF <label>obrigatório</label>
          </S.LabelText>
          <S.Input
            type="text"
            placeholder="Ex: 999.999.999-99"
            value={data.cpf}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setData({ ...data, cpf: cpfFormatter(e.target.value) })
            }
          />
        </S.ContainerInput>

        <S.ContainerInput>
          <S.LabelText>
            Senha <label>obrigatório</label>
          </S.LabelText>
          <S.Input
            type="text"
            placeholder="Ex: 123"
            value={data.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setData({ ...data, password: e.target.value })
            }
          />
        </S.ContainerInput>

        <S.ContainerInput>
          <S.LabelText>Email</S.LabelText>
          <S.Input
            type="text"
            placeholder="Ex: silva@tekoa.com"
            value={data.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setData({ ...data, email: e.target.value })
            }
          />
        </S.ContainerInput>

        <S.ContainerInput>
          <S.LabelText>Telefone</S.LabelText>
          <S.Input
            type="text"
            placeholder="Ex: (11) 99999-9999"
            value={data.phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setData({ ...data, phone: e.target.value })
            }
          />
        </S.ContainerInput>

        <S.ContainerInput>
          <S.LabelText htmlFor="">Diarista</S.LabelText>
          <S.CheckboxContainer className="switch">
            <S.SwitchInput
              type="checkbox"
              checked={!data.hourly}
              onChange={() => setData({ ...data, hourly: !data.hourly })}
            />
            <S.Slider className="slider round"></S.Slider>
          </S.CheckboxContainer>
        </S.ContainerInput>

        <S.ContainerInput>
          <S.LabelText htmlFor="">Horista</S.LabelText>
          <S.CheckboxContainer className="switch">
            <S.SwitchInput
              type="checkbox"
              checked={data.hourly}
              onChange={() => setData({ ...data, hourly: !data.hourly })}
            />
            <S.Slider className="slider round"></S.Slider>
          </S.CheckboxContainer>
        </S.ContainerInput>

        <S.SubmitButton
          type="submit"
          onClick={async (e) => {
            if (HandlerSubmit(e)) {
              if (await createUser(data)) {
                setData({
                  name: "",
                  user: "",
                  cpf: "",
                  password: "",
                  email: "",
                  phone: "",
                  hourly: true,
                });
              }
            }
          }}
        >
          Enviar
        </S.SubmitButton>
      </S.FormContainer>
    </>
  );
}
