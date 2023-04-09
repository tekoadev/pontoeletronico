import Header from "@/components/HeaderAdm";
import * as S from "@/styles/pages/registerPoint";
import Member from "@/assets/imgs/member.png";
import Search from "@/assets/imgs/search.png";
import TimeInACloud from "@/assets/imgs/timeInACloud.png";
import Calendar from "@/assets/imgs/calendar.png";
import Download from "@/assets/imgs/download.png";
import ArrowRight from "@/assets/imgs/arrowright.png";
import Image from "next/image";
import { useState } from "react";

export default function Registrodeponto() {
  const [isCalenderVisible, setIsCalenderVisible] = useState(false);
  const [isDownloadVisible, setIsDownloadVisible] = useState(false);

  return (
    <S.Wrapper className="home">
      <Header />

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
            <h3 className="employee">Total de Funcionários</h3>

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
            <S.OptionsInfo
              onClick={() => {
                setIsCalenderVisible(!isCalenderVisible);
                isDownloadVisible && setIsDownloadVisible(false);
              }}
            >
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
                <Image
                  src={ArrowRight}
                  alt=""
                  className={`${isCalenderVisible}`}
                />
              </S.ImageContainer>
            </S.OptionsInfo>

            {isCalenderVisible && (
              <S.Calendar>
                <div></div>
                <div></div>
              </S.Calendar>
            )}
          </S.ContainerOptionsInfo>

          <S.ContainerOptionsInfo>
            <S.OptionsInfo
              onClick={() => {
                setIsDownloadVisible(!isDownloadVisible);
                isCalenderVisible && setIsCalenderVisible(false);
              }}
            >
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
                <Image
                  src={ArrowRight}
                  alt=""
                  className={`${isDownloadVisible}`}
                />
              </S.ImageContainer>
            </S.OptionsInfo>

            {isDownloadVisible && (
              <S.Download>
                <S.DownloadAlignment>
                  <div>
                    <p>Funcionário</p>

                    <select>
                      <option value="all">Todos</option>
                      <option value="allActive">Todos ativos</option>
                    </select>
                  </div>

                  <div>
                    <p>Mês</p>

                    <select>
                      <option value="1">Janeiro</option>
                      <option value="2">Fevereiro</option>
                      <option value="3">Março</option>
                      <option value="4">Abril</option>
                      <option value="5">Maio</option>
                      <option value="6">Junho</option>
                      <option value="7">Julho</option>
                      <option value="8">Agosto</option>
                      <option value="9">Setembro</option>
                      <option value="10">Outubro</option>
                      <option value="11">Novembro</option>
                      <option value="12">Dezembro</option>
                    </select>
                  </div>

                  <div>
                    <p>Ano</p>

                    <input type="number" />
                  </div>
                </S.DownloadAlignment>

                <button>Download como Excel</button>
              </S.Download>
            )}
          </S.ContainerOptionsInfo>
        </S.ContainerOptions>
      </S.ContainerHome>
    </S.Wrapper>
  );
}
