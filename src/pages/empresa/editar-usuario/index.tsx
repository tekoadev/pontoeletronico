/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-floating-promises */
import Header from "@/components/HeaderAdm";
import ModalDeleteEmployee from "@/components/modal/modalDeleteUser";
import { useCompanyContext } from "@/context/companyContext";
import { useGeneral } from "@/context/generalContext";
import type { IUser } from "@/server/interface";
import * as S from "@/styles/pages/editUser";
import { cpfFormatter } from "@/utils/masks";
import { useEffect, useState } from "react";

export default function EditUser() {
  const { showAlert } = useGeneral();
  const { users, listUsers, editUser } = useCompanyContext();

  const [user, setUser] = useState<IUser>({} as IUser);
  const [checked, setChecked] = useState(user?.hourly);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const findUserById = (id: string) => {
    const userFind = users.find((e) => e.id == id);

    if (userFind === undefined) {
      setUser({} as IUser);
    }

    setUser(userFind!);
  };

  useEffect(() => {
    if (!showDeleteModal) {
      listUsers();
    }
  }, [showDeleteModal]);

  const HandlerSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (user?.name === "" || !user?.name) {
      showAlert("error", "Nome obrigatório", "Campo obrigatório");
      return false;
    }
    if (user?.user === "" || !user?.user) {
      showAlert("error", "Usuário obrigatório", "Campo obrigatório");
      return false;
    }
    if (user?.cpf === "" || !user?.cpf) {
      showAlert("error", "CPF obrigatório", "Campo obrigatório");
      return false;
    }
    if (user?.cpf.length < 14) {
      showAlert("error", "CPF inválido", "");
      return false;
    }
    // if (user?.newPassword === "" || !user?.newPassword) {
    //   showAlert("error", "Senha obrigatória", "Campo obrigatório");
    //   return false;
    // }
    if (user?.newPassword !== undefined && user?.newPassword.length < 6) {
      showAlert(
        "error",
        "Tamanho mínimo senha",
        "O tamanho mínimo é de 6 caracteres"
      );
      return false;
    }
    return true;
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
            <S.EmployOptions value="">Selecione um funcionário</S.EmployOptions>
            {users
              .sort((a, b) => (a?.name > b?.name ? 1 : -1))
              .map((elem, i) => {
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
            value={user?.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUser({ ...user, name: e.target.value })
            }
            placeholder="Ex: Silva"
          />
        </S.ContainerInput>

        <S.ContainerInput>
          <S.LabelText>Usuário de acesso</S.LabelText>
          <S.Input
            type="text"
            placeholder="Ex: Silva"
            value={user?.user}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUser({ ...user, user: e.target.value })
            }
          />
        </S.ContainerInput>

        <S.ContainerInput>
          <S.LabelText>CPF</S.LabelText>
          <S.Input
            type="text"
            placeholder="Ex: 999.999.999-99"
            value={user?.cpf}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUser({ ...user, cpf: cpfFormatter(e.target.value) })
            }
          />
        </S.ContainerInput>

        <S.ContainerInput>
          <S.LabelText>Senha</S.LabelText>
          <S.Input
            type="text"
            placeholder="Ex: 123"
            defaultValue={""}
            value={user?.newPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUser({ ...user, newPassword: e.target.value })
            }
          />
        </S.ContainerInput>

        <S.ContainerInput>
          <S.LabelText>Email</S.LabelText>
          <S.Input
            type="text"
            placeholder="Ex: silva@tekoa.com"
            value={user?.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUser({ ...user, email: e.target.value })
            }
          />
        </S.ContainerInput>

        <S.ContainerInput>
          <S.LabelText>Telefone</S.LabelText>
          <S.Input
            type="text"
            placeholder="Ex: (19) 999999999"
            value={user?.phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUser({ ...user, phone: e.target.value })
            }
          />
        </S.ContainerInput>

        <S.ContainerInput>
          <S.LabelText htmlFor="">Diarista</S.LabelText>
          <S.CheckboxContainer className="switch">
            <S.SwitchInput
              type="checkbox"
              checked={!user?.hourly}
              onClick={() => setUser({ ...user, hourly: !user.hourly })}
            />
            <S.Slider className="slider round"></S.Slider>
          </S.CheckboxContainer>
        </S.ContainerInput>

        <S.ContainerInput>
          <S.LabelText htmlFor="">Horista</S.LabelText>
          <S.CheckboxContainer className="switch">
            <S.SwitchInput
              type="checkbox"
              checked={user?.hourly}
              onClick={() => setUser({ ...user, hourly: !user.hourly })}
            />
            <S.Slider className="slider round"></S.Slider>
          </S.CheckboxContainer>
        </S.ContainerInput>

        <S.ContainerInput>
          <S.LabelText htmlFor="">Localização obrigatória?</S.LabelText>
          <S.CheckboxContainer className="switch">
            <S.SwitchInput
              type="checkbox"
              checked={user?.location}
              onChange={() => setUser({ ...user, location: !user.location })}
            />
            <S.Slider className="slider round"></S.Slider>
          </S.CheckboxContainer>
        </S.ContainerInput>

        <S.ContainerInput>
          <S.LabelText htmlFor="">Funcionário Ativo</S.LabelText>
          <S.CheckboxContainer className="switch">
            <S.SwitchInput
              type="checkbox"
              checked={user?.isActive}
              onChange={() => setUser({ ...user, isActive: !user.isActive })}
            />
            <S.Slider className="slider round"></S.Slider>
          </S.CheckboxContainer>
        </S.ContainerInput>

        <S.SubmitButton
          type="submit"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={async (e) => {
            e.preventDefault();
            if (user?.id === undefined) {
              showAlert("error", "Selecione um usuário", "");
              return;
            } else if (HandlerSubmit(e) && user?.id !== undefined) {

              if (users.find((ele) => ele.user === user.user)) {
                await editUser({
                  ...user,
                  password: user.newPassword!,
                  user: undefined,
                });
              } else {
                await editUser({
                  ...user,
                  password: user.newPassword!,
                  user_name: user.user,
                });
              }
            }
          }}
        >
          Enviar
        </S.SubmitButton>
        <S.DeleteButton
          onClick={(e) => {
            e.preventDefault();
            if (user?.id === undefined) {
              showAlert("error", "Selecione um usuário", "");
            } else {
              setShowDeleteModal(true);
            }
          }}
        >
          Deletar funcionário
        </S.DeleteButton>
        {showDeleteModal && (
          <ModalDeleteEmployee
            setShowModal={setShowDeleteModal}
            userId={user.id!}
          />
        )}
      </S.FormContainer>
    </>
  );
}
