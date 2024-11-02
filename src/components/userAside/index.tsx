import { useState } from "react";
import * as S from "./styles";
import { BsReverseLayoutTextSidebarReverse, BsXCircle } from "react-icons/bs";
import { useRouter } from "next/router";
import { useUserContext } from "@/context/userContext";

export default function UserAside() {
  const navigate = useRouter();
  const { handleLogout, verifyUserToken } = useUserContext();
  const [animation, setAnimation] = useState({});
  const [animoBlur, setAnimoBlur] = useState({});
  const [userAside, setUserAside] = useState(false);

  function HandlerClose() {
    setAnimation({
      animation: "Close 0.5s ease-in-out",
      WebkitAnimation: "Close 0.5s ease-in-out",
      MozAnimation: "Close 0.5s ease-in-out",
      OAnimation: "Close 0.5s ease-in-out",
      zIndex: 5,
    });
    setAnimoBlur({
      animation: "UnBackDropBlur 0.5s ease-in-out",
      WebkitAnimation: "UnBackDropBlur 0.5s ease-in-out",
      MozAnimation: "UnBackDropBlur 0.5s ease-in-out",
      OAnimation: "UnBackDropBlur 0.5s ease-in-out;}",
      zIndex: 4,
    });
    setTimeout(() => {
      setAnimation({ zIndex: -1 });
      setAnimoBlur({ zIndex: -1 });
    }, 490);
  }

  return (
    <>
      <>
        <S.OpenBck style={animoBlur} onClick={() => HandlerClose()} />
        <S.Open style={animation}>
          <S.HeaderMenu>
            <S.Text>Menu do usuário</S.Text>
            <BsXCircle onClick={() => HandlerClose()} />
          </S.HeaderMenu>

          <S.Text
            onClick={() => {
              verifyUserToken();
              navigate.push("/usuario/meus-registros");
            }}
            style={{ cursor: "pointer" }}
          >
            Meus registros
          </S.Text>
          <S.Text
            onClick={() => {
              verifyUserToken();
              navigate.push("/usuario/criar-registro");
            }}
            style={{ cursor: "pointer" }}
          >
            Marcar ponto
          </S.Text>
          <S.Text
            onClick={() => {
              handleLogout();
            }}
            style={{ cursor: "pointer" }}
          >
            Deslogar
          </S.Text>
        </S.Open>
      </>

      <S.Closed
        onClick={() => {
          setUserAside(!userAside);
          setAnimation({
            animation: "Open 0.5s ease-in-out",
            WebkitAnimation: "Open 0.5s ease-in-out",
            MozAnimation: "Open 0.5s ease-in-out",
            OAnimation: "Open 0.5s ease-in-out",
            zIndex: 5,
            opacity: 1,
          });
          setAnimoBlur({
            animation: "BackDropBlur 0.5s ease-in-out",
            WebkitAnimation: "BackDropBlur 0.5s ease-in-out",
            MozAnimation: "BackDropBlur 0.5s ease-in-out",
            OAnimation: "BackDropBlur 0.5s ease-in-out;}",
            opacity: 1,
            zIndex: 4,
          });
        }}
        style={{ cursor: "pointer" }}
      >
        <BsReverseLayoutTextSidebarReverse />
      </S.Closed>
    </>
  );
}
