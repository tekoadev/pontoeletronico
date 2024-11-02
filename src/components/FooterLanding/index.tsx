import ClockIn from "@/assets/imgs/logo-clockin-white.png";
import Whats from "@/assets/imgs/whats.png";
import Checkmark from "@/assets/imgs/Checkmark.png";
import Image from "next/image";
import * as S from "./styles";

export default function LandingFooter() {
  return (
    <S.Container>
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
      <S.Nav>
        <S.ItemNav>
          <a
            target="_blank"
            href="https://api.whatsapp.com/send?phone=5511930151064"
          >
            <Image src={Whats} alt="whats" width="60" height="40" />
            <S.Text>Fale conosco</S.Text>
          </a>
        </S.ItemNav>
        <S.ItemNav>
          <a href="#teste">
            <Image src={Checkmark} alt="valid" width="60" height="40" />
            <S.Text>TESTE GRATUITO</S.Text>
          </a>
        </S.ItemNav>
      </S.Nav>
    </S.Container>
  );
}
