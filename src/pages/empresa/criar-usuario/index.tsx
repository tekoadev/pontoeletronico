import Header from "@/components/HeaderAdm";
import * as S from "@/styles/pages/createUser";

export default function RegisterUser() {
  return (
    <>
      <Header></Header>

      <S.FormContainer>
        <S.ContainerInput>
          <S.LabelText>Nome do Funcionário</S.LabelText>
          <S.Input type="text" placeholder="Ex: Maria" />
        </S.ContainerInput>

        <S.ContainerInput>
          <S.LabelText>Usuário de acesso</S.LabelText>
          <S.Input type="text" placeholder="Ex: Silva" />
        </S.ContainerInput>

        <S.ContainerInput>
          <S.LabelText>CPF</S.LabelText>
          <S.Input type="text" placeholder="Ex: 999.999.999-99" />
        </S.ContainerInput>

        <S.ContainerInput>
          <S.LabelText>Senha</S.LabelText>
          <S.Input type="text" placeholder="Ex: 123" />
        </S.ContainerInput>

        <S.ContainerInput>
          <S.LabelText>Email</S.LabelText>
          <S.Input type="text" placeholder="Ex: silva@tekoa.com" />
        </S.ContainerInput>

        <S.ContainerInput>
          <S.LabelText>Telefone</S.LabelText>
          <S.Input type="text" placeholder="Ex: (19) 999999999" />
        </S.ContainerInput>

        <S.ContainerInput>
          <S.LabelText htmlFor="">Diarista</S.LabelText>
          <S.CheckboxContainer className="switch">
            <S.SwitchInput type="checkbox" />
            <S.Slider className="slider round"></S.Slider>
          </S.CheckboxContainer>
        </S.ContainerInput>

        <S.SubmitButton>Enviar</S.SubmitButton>
      </S.FormContainer>
    </>
  );
}
