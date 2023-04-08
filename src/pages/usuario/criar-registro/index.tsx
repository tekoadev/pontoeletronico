import UserAside from "@/components/userAside";
import { Container } from "@/styles/pages/styles";
import { FormEvent, MouseEvent, useEffect, useState } from "react";
import { BsClock } from "react-icons/bs";
import * as S from "@/styles/pages/registerPointUser";
import { useGeneral } from "@/context/generalContext";
import { useUserContext } from "@/context/userContext";
import { parseCookies } from "nookies";

export default function Home() {
  const [time, setTime] = useState("");
  const [obs, setObs] = useState("");
  const { user, createClockIn } = useUserContext();
  const { showAlert } = useGeneral();

  const cookies = parseCookies();
  const [refUser, setRefUser] = useState(
    cookies?.user !== undefined ? JSON.parse(cookies?.user) : {}
  );

  const [location, setLocation] = useState("");

  const positionError = () => {
    showAlert("error", "Habilite o envio de localização", "");
  };

  const showPosition = (pos: GeolocationPosition) => {
    setLocation(`${pos.coords.latitude}/${pos.coords.longitude}`);
  };

  const getLocation = (
    event:
      | MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
      | FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, positionError);
      showAlert("", "Localização enviada com sucesso", "");
    } else {
      showAlert("error", "Habilite o envio de localização", "");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    if (user?.id) {
      setRefUser(user);
    }
  }, []);

  return (
    <>
      <Container>
        <UserAside />

        <S.Wrapper>
          {refUser?.name !== undefined ? (
            <S.Text style={{ marginTop: "2vh", fontWeight: "600" }}>
              Olá, {refUser.name}
            </S.Text>
          ) : (
            <S.Text style={{ marginTop: "2vh", fontWeight: "600" }}>
              Seja bem vindo!
            </S.Text>
          )}
          <S.ClockText>
            <BsClock />
            &#32;&#32;&#32;{time}
          </S.ClockText>
          <S.Form
            onSubmit={(e) => {
              e.preventDefault();
              console.log(location, obs);

              if (user?.location == true && location === "") {
                getLocation(e);
                createClockIn({ location, obs });
              } else {
                user?.location
                  ? createClockIn({ location, obs })
                  : createClockIn({ obs });
              }
            }}
          >
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
            <S.TextArea
              name="Observações"
              value={obs}
              onChange={(e) => setObs(e.target.value)}
            />

            {user?.location == true && (
              <S.Button
                value="Enviar localização"
                style={{ width: "80%", margin: "2vh 10% 0 10%" }}
                onClick={(event) => {
                  getLocation(event);
                }}
              >
                Enviar localização
              </S.Button>
            )}

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
