import { useContext } from "react";
import * as S from "./styles";
import { BsReverseLayoutTextSidebarReverse, BsXCircle } from "react-icons/bs";
import { useRouter } from "next/router";
import nookies, { parseCookies, setCookie, destroyCookie } from "nookies";

export default function UserAside() {
  const navigate = useRouter();


  return (
    <>
      <>
        <S.OpenBck />
        <S.Open >
          <S.HeaderMenu>
            <S.Text>Menu do usuário</S.Text>
            <BsXCircle/>
          </S.HeaderMenu>
          <hr />
          <S.Text
            onClick={() => {
            
              navigate.push("/registros");
            }}
            style={{ cursor: "pointer" }}
          >
            Meus registros
          </S.Text>
          <S.Text
            onClick={() => {
       
              navigate.push("/registrodeponto");
            }}
            style={{ cursor: "pointer" }}
          >
            Marcar ponto
          </S.Text>
          <S.Text
            onClick={() => {
              navigate.push("/");
            }}
            style={{ cursor: "pointer" }}
          >
            Deslogar
          </S.Text>
        </S.Open>
      </>

      <S.Closed>
        <BsReverseLayoutTextSidebarReverse />
      </S.Closed>
    </>
  );
}
