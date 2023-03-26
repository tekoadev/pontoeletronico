import * as S from "./styles";
import { BsXCircle } from "react-icons/bs";
import { useContext } from "react";

export default function AdmDayCard(register: {
  startDate: Date;
  title: string;
  user: string
}[]) {

  function Format(date: Date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const hour = date.getHours();
    const minutes = date.getMinutes();

    return `${hour}:${minutes} - ${day}/${month}/${year}`;
  }

  // function HandlerClose() {
  //   setDayAnimo({
  //     animation: "ScaleOut 0.5s ease-in-out",
  //     WebkitAnimation: "ScaleOut 0.5s ease-in-out",
  //     MozAnimation: "ScaleOut 0.5s ease-in-out",
  //     OAnimation: "ScaleOut 0.5s ease-in-out",
  //     zIndex: 6,
  //     opacity: 1,
  //     maxHeight: "0",
  //   });
  //   setBckDayAnimo({
  //     animation: "UnBackDropBlur 0.5s ease-in-out",
  //     WebkitAnimation: "UnBackDropBlur 0.5s ease-in-out",
  //     MozAnimation: "UnBackDropBlur 0.5s ease-in-out",
  //     OAnimation: "UnBackDropBlur 0.5s ease-in-out;}",
  //     zIndex: 5,
  //     opacity: 1,
  //     maxHeight: "0",
  //   });
  //   setTimeout(() => {
  //     setDayAnimo({ zIndex: -1 });
  //     setBckDayAnimo({ zIndex: -1 });
  //   }, 490);
  // }
  return (
    <>
      <S.Bck />
      <S.Wrapper>
        <S.TitleWrapper>
          <h3>Relatório do dia</h3>
          <BsXCircle/>
        </S.TitleWrapper>
        <hr />
        {register.map((ele, i) => {
          return (
            <div key={i}>
              <h4>{ele.user}</h4>
              <p>{ele.title}</p>
              <p>Horário: {Format(ele.startDate)}</p>
            </div>
          );
        })}
      </S.Wrapper>
    </>
  );
}
