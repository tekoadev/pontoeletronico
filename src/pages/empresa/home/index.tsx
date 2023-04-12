import Header from "@/components/HeaderAdm";
import * as S from "@/styles/pages/registerPoint";
import Member from "@/assets/imgs/member.png";
import Search from "@/assets/imgs/search.png";
import TimeInACloud from "@/assets/imgs/timeInACloud.png";
import Calendar from "@/assets/imgs/calendar.png";
import Download from "@/assets/imgs/download.png";
import ArrowRight from "@/assets/imgs/arrowright.png";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MdOutlineNavigateNext } from "react-icons/md";
import { useGeneral } from "@/context/generalContext";
import { parseCookies } from "nookies";
import { IClockIn, IUser } from "@/server/interface";
import ClockInApi from "@/services";
import { JsonToExcel } from "react-json-to-excel";

export default function Registrodeponto() {
  const [isCalenderVisible, setIsCalenderVisible] = useState(false);
  const [isDownloadVisible, setIsDownloadVisible] = useState(false);

  const { setIsLoading } = useGeneral();
  const today = new Date();
  const cookies = parseCookies();
  const token = cookies?.CompanyToken || "";
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const [month, setMonth] = useState(
    today.getMonth() + 1 < 10
      ? `0${today.getMonth() + 1}`
      : (today.getMonth() + 1).toString()
  );
  const [year, setYear] = useState((today.getFullYear() - 2000).toString());
  const ClockIn = useRef<IClockIn[]>([] as IClockIn[]);
  const user = useRef<IUser[]>([]);

  const HandlerGetClockIn = async () => {
    setIsLoading(true);
    const clockInResponse: { data: { body: IClockIn[] } } = await ClockInApi({
      method: "GET",
      url: `company/reports/excel?month=${month}&year=${year}`,
      headers: headers,
    });

    const userResponse = await ClockInApi({
      method: "GET",
      url: `company/user`,
      headers: headers,
    });

    if (clockInResponse?.data?.body === undefined) {
      user.current = [];
    }

    if (userResponse?.data?.body === undefined) {
      ClockIn.current = [];
    }

    if (
      clockInResponse?.data?.body === undefined &&
      userResponse?.data?.body === undefined
    ) {
      setIsLoading(false);
      return;
    }

    ClockIn.current = clockInResponse.data.body;
    user.current = userResponse.data.body;
    setIsLoading(false);
  };

  useEffect(() => {
    HandlerGetClockIn();
  }, [month, year]);

  function FormatDate(date: Date) {
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear() - 2000;

    return `${day < 10 ? `0${day}` : day}/${
      month < 10 ? `0${month}` : month
    }/${year}`;
  }

  const [showModal, setShowModal] = useState(false);
  const [register, setRegister] = useState<IClockIn[]>([]);

  const HandlerModal = (event: Date) => {
    const date = FormatDate(event);
    const response = ClockIn.current.filter(
      (ele) => ele.time?.split(" ")[0] === date
    );
    setRegister(response);
    setShowModal(true);
  };

  const HandlerTileClassName = (date: Date) => {
    let resClassName = "";
    ClockIn.current.forEach((ele) => {
      if (ele.time?.split(" ")[0] === FormatDate(date)) {
        resClassName += " red_item";
      }
    });
    return resClassName;
  };

  const [date, setDate] = useState(today);
  useEffect(() => {
    HandlerTileClassName(date);
  }, [date]);

  const NormalizeExcel = () => {
    return ClockIn.current.map((ele) => {
      return {
        Funcionário: ele.user?.name,
        Data: ele.time,
        Localização: ele?.location,
        Observações: ele?.obs,
      };
    });
  };

  const months = [
    { title: "Janeiro", value: "01" },
    { title: "Fevereiro", value: "02" },
    { title: "Março", value: "03" },
    { title: "Abril", value: "04" },
    { title: "Maio", value: "05" },
    { title: "Junho", value: "09" },
    { title: "Julho", value: "07" },
    { title: "Agosto", value: "08" },
    { title: "Setembro", value: "09" },
    { title: "Outubro", value: "10" },
    { title: "Novembro", value: "11" },
    { title: "Dezembro", value: "12" },
  ];

  return (
    <S.Wrapper className="home">
      <Header />

      <S.ContainerHome>
        <S.ContainerInfo>
          <S.Infos>
            <h3>Checkin no mês</h3>

            <S.InfoAlignment>
              <p>{ClockIn.current !== undefined && ClockIn.current.length}</p>
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
                  <p>{user.current !== undefined && user.current.length}</p>

                  <S.ImageContainer>
                    <Image src={Search} alt="" />
                  </S.ImageContainer>
                </div>
              </S.InfosDetails>

              <S.InfosDetails>
                <span>ativos</span>

                <div>
                  <p>
                    {user.current !== undefined &&
                      user.current.filter((ele) => ele.isActive).length}
                  </p>

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
                <MdOutlineNavigateNext
                  className={`${isCalenderVisible}`}
                  style={{ width: "60px", height: "60px" }}
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
                <MdOutlineNavigateNext
                  className={`${isDownloadVisible}`}
                  style={{ width: "60px", height: "60px" }}
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
                      {user.current !== undefined &&
                        user.current.map((ele, i) => {
                          return (
                            <option value={ele.id} key={i}>
                              {ele.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>

                  <div>
                    <p>Mês</p>

                    <select onChange={(e) => setMonth(e.target.value)}>
                      {months.map((ele, i) => (
                        <option
                          value={ele.value}
                          selected={ele.value === month}
                        >
                          {ele.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <p>Ano</p>

                    <select onChange={(e) => setYear(e.target.value)}>
                      <option value={"22"} selected={year === "22"}>
                        2022
                      </option>
                      <option value={"23"} selected={year === "23"}>
                        2023
                      </option>
                      <option value={"24"} selected={year === "24"}>
                        2024
                      </option>
                      <option value={"25"} selected={year === "25"}>
                        2025
                      </option>
                    </select>
                  </div>
                </S.DownloadAlignment>

                <JsonToExcel
                  title="Download como Excel"
                  data={NormalizeExcel()}
                  fileName="registro-de-ponto"
                  btnClassName="custom-classname"
                />
              </S.Download>
            )}
          </S.ContainerOptionsInfo>
        </S.ContainerOptions>
      </S.ContainerHome>
    </S.Wrapper>
  );
}
