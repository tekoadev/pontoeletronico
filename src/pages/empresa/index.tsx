/* eslint-disable @typescript-eslint/no-floating-promises */
import * as S from "@/styles/pages/styles";
import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import { cnpjFormatter } from "@/utils/masks";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useCompanyContext } from "@/context/companyContext";

export default function Home() {
  const navigate = useRouter();

  const { companyLogin } = useCompanyContext();

  const [cnpj, setCnpj] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [error, setError] = useState({ cnpj: "", password: "" });

  const [loading, setLoading] = useState(false);

  const HandleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (password !== "") {
      setError({ ...error, password: "" });
    }
    if (cnpj !== "") {
      setError({ ...error, cnpj: "" });
    }

    if (cnpj === "") {
      setError({ ...error, cnpj: "CNPJ obrigatório" });
      return false;
    }
    if (password === "") {
      setError({ ...error, password: "Senha obrigatória" });
      return false;
    }
    return true;
  };

  return (
    <>
      <S.Container>
        <S.Wrapper>
          <S.LoginForm>
            <h3>Login</h3>
            <hr />
            <S.Label htmlFor="CNPJ">CNPJ</S.Label>
            <S.Input
              placeholder="Ex: XX.XXX.XXX/XXXX-XX"
              type="text"
              id="CNPJ"
              value={cnpj}
              maxLength={18}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setCnpj(cnpjFormatter(event.target.value))
              }
            />
            <S.ErrorLabel>{error.cnpj}</S.ErrorLabel>

            <S.Label htmlFor="password">Senha</S.Label>
            <div>
              <S.Input
                placeholder="Digite sua senha"
                type={type}
                id="password"
                onChange={(event) => setPassword(event.target.value)}
              />
              {type === "password" && (
                <AiFillEye onClick={() => setType("text")} />
              )}
              {type === "text" && (
                <AiFillEyeInvisible onClick={() => setType("password")} />
              )}
              <S.ErrorLabel>{error.password}</S.ErrorLabel>
            </div>
            <S.Button
              type="submit"
              value="Logar"
              onClick={(e: React.FormEvent<HTMLButtonElement>) => {
                if (HandleSubmit(e)) {
                  companyLogin({ cnpj, password });
                }
              }}
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
