import Header from "@/components/HeaderAdm";
import * as S from "@/styles/pages/createUser"

export default function RegisterUser() {

    return(
    <>
        <Header></Header>
       
        <S.FormContainer>
            <S.ContainerInput>
                <S.LabelText>Nome do Funcionário</S.LabelText>
                <S.Input type="text" placeholder="Ex: Maria"/>
            </S.ContainerInput>

            <S.ContainerInput>
                <S.LabelText>Usuário de acesso</S.LabelText>
                <S.Input type="text" placeholder="Ex: Silva"/>
            </S.ContainerInput>

            <S.ContainerInput>
                <S.LabelText>CPF</S.LabelText>
                <S.Input type="text" placeholder="Ex: 123"/>
            </S.ContainerInput>

            <S.ContainerInput>
                <S.LabelText>Senha</S.LabelText>
                <S.Input type="text" placeholder="Ex: 123"/>
            </S.ContainerInput>

            <S.ContainerInput>
                <S.LabelText>Email</S.LabelText>
                <S.Input type="text" placeholder="Ex: 123"/>
            </S.ContainerInput>

            <S.ContainerInput>
                <S.LabelText>Telefone</S.LabelText>
                <S.Input type="text" placeholder="Ex: 123"/>
            </S.ContainerInput>

           
            <S.ContainerInput>
                <S.LabelText htmlFor="">Diarista</S.LabelText>
                <label className="switch">
                    <S.Input type="checkbox"/>
                    <span className="slider round"></span>
                </label>
            </S.ContainerInput>

            <S.SubmitButton>Enviar</S.SubmitButton>
        </S.FormContainer>
    </>
    )
}