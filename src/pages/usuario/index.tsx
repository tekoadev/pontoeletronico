import * as S from "@/styles/pages/styles";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";

export default function Home() {
  const navigate = useRouter();
  
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  return (
    <>
      <S.Container>
        <S.Wrapper>
          <S.LoginForm>
            <h3>Login</h3>
            <hr />
            <S.Label htmlFor="name">Usuário</S.Label>
            <S.Input
              placeholder="Ex: Maria"
              type="text"
              id="name"
              onChange={(event) => setName(event.target.value)}
            />

            <S.Label htmlFor="password">Senha</S.Label>
            <S.Input
              placeholder="Digite sua senha"
              type="password"
              id="password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <S.Button
              type="submit"
              value="Logar"
            >
              Enviar
            </S.Button>
          </S.LoginForm>
        </S.Wrapper>
      </S.Container>

      <ToastContainer
        style={{
          width: "100vw",
          margin: "0 0 10vh 0",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
        position="bottom-center"
        closeOnClick
      />
    </>
  );
}
