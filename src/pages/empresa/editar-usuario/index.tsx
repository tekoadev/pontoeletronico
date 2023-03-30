import Header from "@/components/HeaderAdm";
import { useCompanyContext } from "@/context/companyContext";
import { IUser } from "@/server/interface";
import * as S from "@/styles/pages/editUser";
import { useEffect, useState } from "react";

export default function EditUser() {
  const { users } = useCompanyContext();

  const [user, setUser] = useState<IUser>({} as IUser);
  const [checked, setChecked] = useState(user.hourly);

  const findUserById = (id: string) => {
    const userFind = users.find((e) => e.id == id);

    setUser(userFind!);
  };

  return (
    <>
      <Header></Header>

      <S.FormContainer>
        <S.ContainerInput>
          <S.LabelText>Funcionário</S.LabelText>
          <S.EmploySelect
            onChange={(e) => {
              findUserById(e.target.value);
            }}
          >
            {users.map((elem, i) => {
              return (
                <S.EmployOptions value={elem?.id} key={i}>
                  {elem.name}
                </S.EmployOptions>
              );
            })}
          </S.EmploySelect>
        </S.ContainerInput>

        <S.ContainerInput>
          <S.LabelText>Nome do funcionário</S.LabelText>
          <S.Input
            type="text"
            defaultValue={user.name}
            placeholder="Ex: Silva"
          />
        </S.ContainerInput>

        <S.ContainerInput>
          <S.LabelText>Usuário de acesso</S.LabelText>
          <S.Input type="text" placeholder="Ex: Silva" />
        </S.ContainerInput>

        <S.ContainerInput>
          <S.LabelText>CPF</S.LabelText>
          <S.Input
            type="text"
            placeholder="Ex: 999.999.999-99"
            defaultValue={user.cpf}
          />
        </S.ContainerInput>

        <S.ContainerInput>
          <S.LabelText>Senha</S.LabelText>
          <S.Input type="text" placeholder="Ex: 123" />
        </S.ContainerInput>

        <S.ContainerInput>
          <S.LabelText>Email</S.LabelText>
          <S.Input
            type="text"
            placeholder="Ex: silva@tekoa.com"
            defaultValue={user.email!}
          />
        </S.ContainerInput>

        <S.ContainerInput>
          <S.LabelText>Telefone</S.LabelText>
          <S.Input
            type="text"
            placeholder="Ex: (19) 999999999"
            defaultValue={user.phone!}
          />
        </S.ContainerInput>

        <S.ContainerInput>
          <S.LabelText htmlFor="">Diarista</S.LabelText>
          <S.CheckboxContainer className="switch">
            <S.SwitchInput
              type="checkbox"
              checked={!checked}
              onClick={() => setChecked(!checked)}
            />
            <S.Slider className="slider round"></S.Slider>
          </S.CheckboxContainer>
        </S.ContainerInput>

        <S.ContainerInput>
          <S.LabelText htmlFor="">Horista</S.LabelText>
          <S.CheckboxContainer className="switch">
            <S.SwitchInput
              type="checkbox"
              checked={checked}
              onClick={() => setChecked(!checked)}
            />
            <S.Slider className="slider round"></S.Slider>
          </S.CheckboxContainer>
        </S.ContainerInput>

        <S.ContainerInput>
          <S.LabelText htmlFor="">Funcionário Ativo</S.LabelText>
          <S.CheckboxContainer className="switch">
            <S.SwitchInput type="checkbox" checked={user.isActive} />
            <S.Slider className="slider round"></S.Slider>
          </S.CheckboxContainer>
        </S.ContainerInput>

        <S.SubmitButton>Enviar</S.SubmitButton>
      </S.FormContainer>
    </>
  );
}
