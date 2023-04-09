import UserAside from "@/components/userAside";
import { Container } from "@/styles/pages/styles";
import * as S from "@/styles/pages/meusRegistros";
import Calendar from "react-calendar";
import { useEffect, useState } from "react";
import ClockInApi from "@/services";
import { parseCookies } from "nookies";
import { IClockIn } from "@/server/interface";
import DayCard from "@/components/modal/modalRegistroFuncionário";
import { useGeneral } from "@/context/generalContext";

export default function Render() {
  const { setIsLoading } = useGeneral();
  const today = new Date();
  const cookies = parseCookies();
  const token = cookies?.userToken || "";
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const [month, setMonth] = useState((today.getMonth() + 1).toString());
  const [year, setYear] = useState((today.getFullYear() - 2000).toString());
  const [ClockIn, setClockIn] = useState<IClockIn[]>([] as IClockIn[]);

  const HandlerGetClockIn = async () => {
    setIsLoading(true);
    const response: { data: { body: IClockIn[] } } = await ClockInApi({
      method: "GET",
      url: `user/reports?month=${month}&year=${year}`,
      headers: headers,
    });

    if (response?.data?.body === undefined) {
      setClockIn([]);
      return;
    }

    setClockIn(response.data.body);
    setIsLoading(false);
  };

  useEffect(() => {
    HandlerGetClockIn();
  }, []);

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
  return (
    <Container>
      <UserAside />
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
          tileClassName={({ date }) => {
            let resClassName = "";
            ClockIn.forEach((ele) => {
              if (ele.time?.split(" ")[0] === FormatDate(date)) {
                resClassName += " red_item";
              }
            });
            return resClassName;
          }}
          onClickDay={(event) => HandlerModal(event)}
          onDrillUp={({ activeStartDate }) => {
            setMonth(FormatDate(activeStartDate).split("/")[1]);
            setYear(FormatDate(activeStartDate).split("/")[2]);
            HandlerGetClockIn();
          }}
          onActiveStartDateChange={({ activeStartDate }) => {
            setMonth(FormatDate(activeStartDate!).split("/")[1]);
            setYear(FormatDate(activeStartDate!).split("/")[2]);
            HandlerGetClockIn();
          }}
        />
      </S.CalendarWrapper>
      <DayCard
        register={register}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </Container>
  );
}
