import { useContext } from "react";

import * as Element from "./styles";
import { BsReverseLayoutTextSidebarReverse, BsXCircle } from "react-icons/bs";
import { useRouter } from "next/router";
import nookies, { parseCookies, setCookie, destroyCookie } from "nookies";

export default function AdmAside() {
  const navigate = useRouter();


  // function HandlerClose() {
  //   setAnimation({
  //     animation: "Close 0.5s ease-in-out",
  //     WebkitAnimation: "Close 0.5s ease-in-out",
  //     MozAnimation: "Close 0.5s ease-in-out",
  //     OAnimation: "Close 0.5s ease-in-out",
  //     zIndex: 5,
  //   });
  //   setAnimoBlur({
  //     animation: "UnBackDropBlur 0.5s ease-in-out",
  //     WebkitAnimation: "UnBackDropBlur 0.5s ease-in-out",
  //     MozAnimation: "UnBackDropBlur 0.5s ease-in-out",
  //     OAnimation: "UnBackDropBlur 0.5s ease-in-out;}",
  //     zIndex: 4,
  //   });
  //   setTimeout(() => {
  //     setAnimation({ zIndex: -1 });
  //     setAnimoBlur({ zIndex: -1 });
  //   }, 490);
  // }

  return (
    <>
      <>
        <Element.OpenBck  />
        <Element.Open >
          <Element.HeaderMenu>
            <Element.Text>Menu do administrador</Element.Text>
            <BsXCircle />
          </Element.HeaderMenu>
          <hr />
          <Element.Text
            onClick={() => {
      
              navigate.push("/adm/landing");
            }}
            style={{ cursor: "pointer" }}
          >
            Registros de ponto
          </Element.Text>
          <Element.Text
            onClick={() => {
         
              navigate.push("/adm/espelhodeponto");
            }}
            style={{ cursor: "pointer" }}
          >
            Espelho de ponto
          </Element.Text>
          <Element.Text
            onClick={() => {
         
              navigate.push("/adm/createuser");
            }}
            style={{ cursor: "pointer" }}
          >
            Cadastrar funcionário
          </Element.Text>
          <Element.Text
            onClick={() => {
        
              navigate.push("/adm/edituser");
            }}
            style={{ cursor: "pointer" }}
          >
            Editar/Inativar funcionário
          </Element.Text>
          <Element.Text
            onClick={() => {

              navigate.push("/adm");
            }}
            style={{ cursor: "pointer" }}
          >
            Deslogar
          </Element.Text>
        </Element.Open>
      </>

      <Element.Closed
        style={{ cursor: "pointer" }}
      >
        <BsReverseLayoutTextSidebarReverse />
      </Element.Closed>
    </>
  );
}
