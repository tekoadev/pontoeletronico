import UserAside from "@/components/userAside";
import { Container } from "@/styles/pages/styles";
import { useEffect, useState } from "react";
import { BsClock } from "react-icons/bs";
import * as S from "@/styles/pages/registerPointUser";

export default function Home() {
  const [time, setTime] = useState("");
  const [active, setActive] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <>
      <Container>
        <UserAside />

        <S.Wrapper>
          <S.Text style={{ marginTop: "2vh", fontWeight: "600" }}>
            Olá, Fabio
          </S.Text>
          <S.ClockText>
            <BsClock />
            &#32;&#32;&#32;{time}
          </S.ClockText>
          <S.Form onSubmit={(e) => {e.preventDefault()}}>
            <S.Text
              style={{
                textAlign: "center",
                width: "100%",
                color: "var(--primary)",
                fontSize: "1.2rem",
                marginBottom: "2vh",
              }}
            >
              Marcar ponto:
            </S.Text>

            <S.Label>Observações:</S.Label>
            <S.TextArea name="Observações" />

            <S.Button
              value="Enviar localização"
              style={{ width: "80%", margin: "2vh 10% 0 10%" }}
            >
              Enviar localização
            </S.Button>

            <S.Button
              type="submit"
              value="Logar"
              style={{ width: "80%", margin: "2vh 10% 0 10%" }}
            >
              Marcar ponto
            </S.Button>
          </S.Form>
        </S.Wrapper>
      </Container>
    </>
  );
}
