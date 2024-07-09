import * as S from "@/styles/pages/styles";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import { useUserContext } from "@/context/userContext";

export default function Home() {
  const navigate = useRouter();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin } = useUserContext();

  return (
    <>
      <S.Container>
        <S.Wrapper>
          <S.LoginForm
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin(user, password);
            }}
          >
            <h3>Login</h3>
            <hr />
            <S.Label htmlFor="name">Usuário</S.Label>
            <S.Input
              placeholder="Ex: Maria"
              type="text"
              id="name"
              onChange={(event) => setUser(event.target.value)}
            />

            <S.Label htmlFor="password">Senha</S.Label>
            <S.Input
              placeholder="Digite sua senha"
              type="password"
              id="password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <S.Button type="submit" value="Logar">
              Enviar
            </S.Button>
          </S.LoginForm>
        </S.Wrapper>
      </S.Container>
    </>
  );
}
