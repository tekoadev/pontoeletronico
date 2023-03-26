import { useContext, useState } from "react";
import { BsReverseLayoutTextSidebarReverse, BsXCircle } from "react-icons/bs";
import { useRouter } from "next/router";
import nookies, { parseCookies, setCookie, destroyCookie } from "nookies";
import ClockIn from "@/assets/imgs/logo-clockin-white.png";
import Image from "next/image";
import * as S from "./styles";

export default function AdmHeader() {
  const navigate = useRouter();
  const [theme, setTheme] = useState(false);
  const [active, setActive] = useState(false);

  return (
    <>
      <S.Open active={theme}>
        <div>
          <S.LogoWrapper>
            <S.Fig>
              <Image
                priority
                src={ClockIn}
                width="80"
                height="100"
                alt="logotipo da empresa"
              ></Image>
            </S.Fig>
            <S.Text>Clock In</S.Text>
          </S.LogoWrapper>

          <div>
            <S.Text
              onClick={() => {
                navigate.push("/adm/espelhodeponto");
              }}
              style={{ cursor: "pointer" }}
            >
              Espelho de ponto
            </S.Text>
            <S.Text
              onClick={() => {
                navigate.push("/adm/create-user");
              }}
              style={{ cursor: "pointer" }}
            >
              Cadastrar funcionário
            </S.Text>
            <S.Text
              onClick={() => {
                navigate.push("/adm/edituser");
              }}
              style={{ cursor: "pointer" }}
            >
              Editar funcionários
            </S.Text>
          </div>
        </div>

        <div>
          <S.HamburgerButton
            onClick={() => {
              setActive(!active);
              setTheme(!theme);
            }}
            theme={active && "active"}
          >
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </S.HamburgerButton>
        </div>

        <S.LogOut
          onClick={() => {
            navigate.push("/adm");
          }}
          style={{ cursor: "pointer" }}
        >
          Deslogar
        </S.LogOut>
      </S.Open>

      <S.NavMobileOptions active={theme}>
        <S.Text
          onClick={() => {
            navigate.push("/adm/espelhodeponto");
          }}
          style={{ cursor: "pointer" }}
        >
          Espelho de ponto
        </S.Text>
        <S.Text
          onClick={() => {
            navigate.push("/adm/createuser");
          }}
          style={{ cursor: "pointer" }}
        >
          Cadastrar funcionário
        </S.Text>
        <S.Text
          onClick={() => {
            navigate.push("/adm/edituser");
          }}
          style={{ cursor: "pointer" }}
        >
          Editar funcionários
        </S.Text>
      </S.NavMobileOptions>
    </>
  );
}
