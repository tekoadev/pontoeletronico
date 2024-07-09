import { useContext, useEffect, useState } from "react";
import * as Element from "@/styles/pages/registerPointUser";
import { BsClock } from "react-icons/bs";
import ClockInApi from "@/services";
import UserAside from "@/components/userAside";
import Load from "@/components/load";
import { ToastContainer, toast } from "react-toastify";
import { Container } from "@/styles/pages/styles";

export default function Registrodeponto() {
  const [time, setTime] = useState("");
  const [btnChoices, setbtnChoices] = useState("in");
  const [location, setLocation] = useState("");
  const [obs, setObs] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  });

  function handleSubmit(event: any) {
    event.preventDefault();

    setLoading(true);
    if (location === "") {
      getLocation(event);
    }
    if (location !== "") {
      ClockInApi({
        method: "POST",
        url: "user",

        data: {
          location,
          obs,
          type: btnChoices,
        },
      })
        .then((res) => {
          setLoading(false);
          toast.success(<p>Ponto registrado com sucesso</p>, { toastId: 5 });
        })
        .catch((err) => {
          setLoading(false);
          toast.error(
            <p>
              Houve algum erro
              <br />
              fale com administrador
            </p>,
            { toastId: 2 }
          );
        });
    }
  }

  function getLocation(event: any) {
    event.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, positionError);
    } else {
      toast.error(<p>Habilite o envio de localização</p>, { toastId: 2 });
    }
  }

  function positionError() {
    toast.error(<p>Habilite o envio de localização</p>, { toastId: 3 });
    setLoading(false);
  }

  function showPosition(pos: any) {
    setLocation(`${pos.coords.latitude}/${pos.coords.longitude}`);

    toast.success(<p>Localização enviada</p>, { toastId: 4 });
    setLoading(false);
  }

  return (
    <>
      <Container>
        <UserAside />
        <Element.Wrapper>
          <Element.Text style={{ marginTop: "2vh", fontWeight: "600" }}>
            Olá, Fabin
          </Element.Text>
          <Element.ClockText>
            <BsClock />
            &#32;&#32;&#32;{time}
          </Element.ClockText>
          <Element.Form>
            <Element.Text
              style={{
                textAlign: "center",
                width: "100%",
                color: "var(--primary)",
                fontSize: "1.2rem",
                marginBottom: "2vh",
              }}
            >
              Marcar ponto:
            </Element.Text>

            <Element.TypeBtn>
              <Element.ChoicesButton

                style={{
                  backgroundColor:
                    btnChoices === "in" ? "var(--primary)" : "var(--deselect)",
                }}
                onClick={(event) => {
                  event.preventDefault();
                  setbtnChoices("in");
                }}
              >
                Entrada
              </Element.ChoicesButton>
              <Element.ChoicesButton
                style={{
                  backgroundColor:
                    btnChoices === "out" ? "var(--primary)" : "var(--deselect)",
                }}
                onClick={(event) => {
                  event.preventDefault();
                  setbtnChoices("out");
                }}
              >
                Saída
              </Element.ChoicesButton>
            </Element.TypeBtn>

            <Element.Label>Observações:</Element.Label>
            <Element.TextArea
              name="Observações"
              onChange={(event) => {
                setObs(event.target.value);
              }}
            />

            <Element.Button
              value="Enviar localização"
              style={{ width: "80%", margin: "2vh 10% 0 10%" }}
              onClick={(event) => getLocation(event)}
            >
              Enviar localização
            </Element.Button>

            <Element.Button
              type="submit"
              value="Logar"
              style={{ width: "80%", margin: "2vh 10% 0 10%" }}
              onClick={(event) => handleSubmit(event)}
            >
              Marcar ponto
            </Element.Button>
          </Element.Form>
        </Element.Wrapper>
      </Container>
      {loading && <Load />}

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
