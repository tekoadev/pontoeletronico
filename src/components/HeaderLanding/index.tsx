import { useContext, useState } from "react";
import { BsReverseLayoutTextSidebarReverse, BsXCircle } from "react-icons/bs";
import { useRouter } from "next/router";
import nookies, { parseCookies, setCookie, destroyCookie } from "nookies";
import ClockIn from "@/assets/imgs/logo-clockin-white.png";
import Image from "next/image";
import * as S from "./styles";

export default function LandingHeader() {
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
                width="40"
                height="20"
                alt="logotipo da empresa"
              ></Image>
            </S.Fig>
            <S.Text>Clock In</S.Text>
          </S.LogoWrapper>
          <div>
            <S.Text
              onClick={() => {
                navigate.push("#funcionalidades");
              }}
              style={{ cursor: "pointer" }}
            >
              Funcionalidades
            </S.Text>
            <S.Text
              onClick={() => {
                navigate.push("#planos");
              }}
              style={{ cursor: "pointer" }}
            >
              Planos
            </S.Text>
            <S.TextEmphasis
              onClick={() => {
                navigate.push("/usuario");
              }}
              style={{ cursor: "pointer" }}
            >
              Bater Ponto
            </S.TextEmphasis>
            <S.TextEmphasis
              onClick={() => {
                navigate.push("/empresa");
              }}
              style={{ cursor: "pointer" }}
            >
              Login Empresa
            </S.TextEmphasis>
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

        <S.TestButton
          onClick={() => {
            navigate.push("/usuario");
          }}
          style={{ cursor: "pointer" }}
        >
          Teste Gratuito
        </S.TestButton>
      </S.Open>

      <S.NavMobileOptions active={theme}>
        <S.Text
          onClick={() => {
            navigate.push("/empresa/espelho-ponto");
          }}
          style={{ cursor: "pointer" }}
        >
          Funcionalidades
        </S.Text>
        <S.Text
          onClick={() => {
            navigate.push("#funcionalidades");
          }}
          style={{ cursor: "pointer" }}
        >
          Cadastrar funcionário
        </S.Text>
        <S.Text
          onClick={() => {
            navigate.push("#planos");
          }}
          style={{ cursor: "pointer" }}
        >
          Planos
        </S.Text>
        <S.Text
          onClick={() => {
            navigate.push("/usuario");
          }}
          style={{ cursor: "pointer" }}
        >
          Bater Ponto
        </S.Text>
        <S.Text
          onClick={() => {
            navigate.push("/empresa");
          }}
          style={{ cursor: "pointer" }}
        >
          Login Empresa
        </S.Text>
        <S.Text
          onClick={() => {
            navigate.push("/usuario");
          }}
          style={{ cursor: "pointer" }}
        >
          Teste Gratuito
        </S.Text>
      </S.NavMobileOptions>
    </>
  );
}
