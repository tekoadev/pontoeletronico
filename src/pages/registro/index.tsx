import { useContext, useEffect, useState } from "react";
import Calendar from "react-calendar";
import * as S from "@/styles/pages/stylesregistro";
import UserAside from "@/components/userAside";
import ClockInApi from "@/services";
import moment from "moment";
import DayCard from "@/components/dayCard";
import { Container } from "@/styles/pages/styles";

export default function Registros() {
  const [value, onChange] = useState(new Date());
  const [registros, setRegistros] = useState({});
  const [dataSources, setdataSources] = useState<any>([]);

  const [statics, setStatics] = useState<{ startDate: Date; title: string }[]>([
    {
      startDate: new Date(),
      title: "Entrada",
    },
    {
      startDate: new Date(),
      title: "Saída",
    },
  ]);

  // function HandlerOpenDay(event) {
  //   const dates = dataSources.filter(
  //     (ele) => FormatDate(ele.startDate) === FormatDate(event)
  //   );
  //   setStatics(dates);
  //   setDayAnimo({
  //     animation: "ScaleIn 0.5s ease-in-out",
  //     WebkitAnimation: "ScaleIn 0.5s ease-in-out",
  //     MozAnimation: "ScaleIn 0.5s ease-in-out",
  //     OAnimation: "ScaleIn 0.5s ease-in-out",
  //     zIndex: 5,
  //     opacity: 1,
  //   });
  //   setBckDayAnimo({
  //     animation: "BackDropBlur 0.5s ease-in-out",
  //     WebkitAnimation: "BackDropBlur 0.5s ease-in-out",
  //     MozAnimation: "BackDropBlur 0.5s ease-in-out",
  //     OAnimation: "BackDropBlur 0.5s ease-in-out;}",
  //     opacity: 1,
  //     zIndex: 4,
  //   });
  // }

  function FormatDate(date: Date) {
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();

    return year + "/" + month + "/" + day;
  }

  return (
    <>
      <Container>
        <UserAside />
        <DayCard register={statics} />

        <S.CalendarWrapper>
          <Calendar
            defaultActiveStartDate={value}
            defaultView={"month"}
            onChange={onChange}
            value={value}
            calendarType="Arabic"
            tileClassName={({ date, view }) => {
              let resClassName = "";
              dataSources.forEach((ele: any) => {
                if (FormatDate(ele.startDate) === FormatDate(date)) {
                  resClassName += " red_item";
                }
              });
              return resClassName;
            }}
          />
        </S.CalendarWrapper>
      </Container>
    </>
  );
}
