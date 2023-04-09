import Header from "@/components/HeaderAdm";
import * as S from "@/styles/pages/registerPoint";
import { useState } from "react";
import Member from "@/assets/imgs/member.png";
import Search from "@/assets/imgs/search.png";
import TimeInACloud from "@/assets/imgs/timeInACloud.png";
import Calendar from "@/assets/imgs/calendar.png";
import Download from "@/assets/imgs/download.png";
import ArrowRight from "@/assets/imgs/arrowright.png";
import Image from "next/image";

export default function Registrodeponto() {
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const [month, setMonth] = useState("Janeiro");

  return (
    <S.Wrapper>
      <Header></Header>

      <S.ContainerHome>
        <S.ContainerInfo>
          <S.Infos>
            <h3>Checkin no mês</h3>

            <S.InfoAlignment>
              <p>240</p>
              <S.ImageContainer>
                <Image src={TimeInACloud} alt="" className="timeInACloud" />
              </S.ImageContainer>
            </S.InfoAlignment>
          </S.Infos>

          <S.Infos>
            <h3>Total de Funcionários</h3>

            <S.InfoAlignment>
              <S.InfosDetails>
                <span>cadastrados</span>

                <div>
                  <p>32</p>

                  <S.ImageContainer>
                    <Image src={Search} alt="" />
                  </S.ImageContainer>
                </div>
              </S.InfosDetails>

              <S.InfosDetails>
                <span>ativos</span>

                <div>
                  <p>25</p>

                  <S.ImageContainer>
                    <Image src={Member} alt="" />
                  </S.ImageContainer>
                </div>
              </S.InfosDetails>
            </S.InfoAlignment>
          </S.Infos>
        </S.ContainerInfo>

        <S.ContainerOptions>
          <S.ContainerOptionsInfo>
            <S.OptionsAlignment>
              <S.ImageContainer className="align">
                <Image src={Calendar} alt="" />
              </S.ImageContainer>

              <div>
                <span>Calendário</span>
                <p>Visão dos registros de ponto como calendário</p>
              </div>
            </S.OptionsAlignment>

            <S.ImageContainer className="info">
              <Image src={ArrowRight} alt="" />
            </S.ImageContainer>
          </S.ContainerOptionsInfo>

          <S.ContainerOptionsInfo>
            <S.OptionsAlignment>
              <S.ImageContainer className="align">
                <Image src={Download} alt="" />
              </S.ImageContainer>

              <div>
                <span>Download</span>
                <p>Faça download dos dados dos funcionários</p>
              </div>
            </S.OptionsAlignment>

            <S.ImageContainer className="info">
              <Image src={ArrowRight} alt="" />
            </S.ImageContainer>
          </S.ContainerOptionsInfo>
        </S.ContainerOptions>
      </S.ContainerHome>
    </S.Wrapper>
  );
}
