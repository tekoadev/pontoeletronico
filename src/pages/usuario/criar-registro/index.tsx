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
  const [obs, setObs] = useState<string | undefined>(undefined);
  const { user, createClockIn } = useUserContext();
  const { showAlert } = useGeneral();

  const cookies = parseCookies();
  const [refUser, setRefUser] = useState(
    cookies?.user !== undefined ? JSON.parse(cookies?.user) : {}
  );

  const [location, setLocation] = useState<string | undefined>(undefined);

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

  function getLocationFromUser() {
    return new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          resolve(position);
        }, reject);
        return true;
      } else {
        reject("Geolocation not supported");
      }
    });
  }

  async function loadLocation() {
    try {
      const defaultLocation: GeolocationPosition =
        (await getLocationFromUser()) as GeolocationPosition;
      setLocation(
        `${defaultLocation.coords.latitude}/${defaultLocation.coords.longitude}`
      );
      return true;
    } catch {
      showAlert("error", "Habilite o envio de localização", "");
      return false;
    }
  }

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
            onSubmit={async (e) => {
              e.preventDefault();
              console.log(await loadLocation());

              if (user?.location === true) {
                if (await loadLocation()) {
                  createClockIn({ location, obs });
                }
              } else {
                createClockIn({ obs });
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
                  event.preventDefault();
                  loadLocation();
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
