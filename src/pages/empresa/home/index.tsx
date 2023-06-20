import Header from "@/components/HeaderAdm";
import * as S from "@/styles/pages/registerPoint";
import Member from "@/assets/imgs/member.png";
import Search from "@/assets/imgs/search.png";
import TimeInACloud from "@/assets/imgs/timeInACloud.png";
import CalendarImg from "@/assets/imgs/calendar.png";
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
import Calendar from "react-calendar";
import DayCard from "@/components/modal/modalRegistroFuncionário";

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
  const [ClockIn, setClockIn] = useState<IClockIn[]>([]);
  const user = useRef<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState("all");
  const [totalCheckIn, setTotalCheckIn] = useState(0);
  const [firstGet, setFirstGet] = useState(true);

  const HandlerGetClockIn = async () => {
    setIsLoading(true);
    const clockInResponse: { data: { body: IClockIn[] } } = await ClockInApi({
      method: "GET",
      url: `company/reports/excel?&year=${year}${
        selectedUser === "all"
          ? ""
          : selectedUser === "allActive"
          ? "&active=true"
          : `&id=${selectedUser}`
      }`,
      headers: headers,
    });

    const userResponse = await ClockInApi({
      method: "GET",
      url: `company/user`,
      headers: headers,
    });

    if (clockInResponse?.data?.body === undefined) {
      setClockIn([]);
    }
    if (clockInResponse?.data?.body !== undefined) {
      setClockIn(clockInResponse.data.body);
      if (firstGet) {
        setTotalCheckIn(clockInResponse.data.body.length);
        setFirstGet(false);
      }
    }

    if (userResponse?.data?.body === undefined) {
      user.current = [];
    }
    if (userResponse?.data?.body !== undefined) {
      user.current = userResponse.data.body;
    }

    if (
      clockInResponse?.data?.body === undefined &&
      userResponse?.data?.body === undefined
    ) {
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
  };

  useEffect(() => {
    HandlerGetClockIn();
  }, [month, year, selectedUser]);

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
    const response = ClockIn.filter((ele) => ele.time?.split(" ")[0] === date);
    setRegister(response);
    setShowModal(true);
  };

  const HandlerTileClassName = (date: Date) => {
    let resClassName = "";
    ClockIn.forEach((ele) => {
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
    return ClockIn.map((ele) => {
      return {
        Funcionário: ele.user?.name,
        Data: ele.time,
        Localização: ele?.location,
        Observações: ele?.obs,
      };
    }).sort((a, b) =>
      Number(a?.Data?.split("/")[0]) > Number(b?.Data?.split("/")[0]) ? 1 : -1
    );
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
              <p>{totalCheckIn !== undefined && totalCheckIn}</p>
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
                  <Image src={CalendarImg} alt="" />
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
                <S.Download>
                  <S.DownloadAlignment>
                    <div>
                      <p>Funcionário</p>

                      <select onChange={(e) => setSelectedUser(e.target.value)}>
                        <option value="all" selected={selectedUser === "all"}>
                          Todos
                        </option>
                        <option
                          value="allActive"
                          selected={selectedUser === "allActive"}
                        >
                          Todos ativos
                        </option>
                        {user.current !== undefined &&
                          user.current.map((ele, i) => {
                            return (
                              <option
                                value={ele.id}
                                key={i}
                                selected={selectedUser === ele.id}
                              >
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
                  <S.CalendarWrapper>
                    <Calendar
                      calendarType="Hebrew"
                      defaultView={"month"}
                      view="month"
                      formatShortWeekday={(locale, date) => {
                        if (date.getDay() === 0) {
                          return "D";
                        }
                        if (date.getDay() === 1) {
                          return "S";
                        }
                        if (date.getDay() === 2) {
                          return "T";
                        }
                        if (date.getDay() === 3) {
                          return "Q";
                        }
                        if (date.getDay() === 4) {
                          return "Q";
                        }
                        if (date.getDay() === 5) {
                          return "S";
                        }
                        if (date.getDay() === 6) {
                          return "S";
                        }

                        return "";
                      }}
                      tileClassName={({ date }) => HandlerTileClassName(date)}
                      onClickDay={(event) => HandlerModal(event)}
                      onDrillUp={({ activeStartDate }) => {
                        setMonth(FormatDate(activeStartDate).split("/")[1]);
                        setYear(FormatDate(activeStartDate).split("/")[2]);
                      }}
                      onActiveStartDateChange={({ activeStartDate }) => {
                        setMonth(FormatDate(activeStartDate!).split("/")[1]);
                        setYear(FormatDate(activeStartDate!).split("/")[2]);
                      }}
                    />
                  </S.CalendarWrapper>
                </S.Download>
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

                    <select onChange={(e) => setSelectedUser(e.target.value)}>
                      <option value="all" selected={selectedUser === "all"}>
                        Todos
                      </option>
                      <option
                        value="allActive"
                        selected={selectedUser === "allActive"}
                      >
                        Todos ativos
                      </option>
                      {user.current !== undefined &&
                        user.current.map((ele, i) => {
                          return (
                            <option
                              value={ele.id}
                              key={i}
                              selected={selectedUser === ele.id}
                            >
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
      <DayCard
        showModal={showModal}
        setShowModal={setShowModal}
        register={register}
        user={true}
      />
    </S.Wrapper>
  );
}
