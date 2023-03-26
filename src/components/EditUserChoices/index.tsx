import * as S from "./styles";
import { BsXCircle } from "react-icons/bs";
import { useContext } from "react";

export default function EditUserChoices(register: {
  user: string;
  title: string;
}[]) {
  
  function Format(date: Date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const hour = date.getHours();
    const minutes = date.getMinutes();

    return `${hour}:${minutes} - ${day}/${month}/${year}`;
  }


  return (
    <>
      <S.Bck  />
      <S.Wrapper >
        <S.TitleWrapper>
          <h3>Sobre</h3>
          <BsXCircle />
        </S.TitleWrapper>
        <hr />
        {register.map((ele, i) => {
          return (
            <div key={i}>
              <h4>{ele.user}</h4>
              <p>{ele.title}</p>
            </div>
          );
        })}
      </S.Wrapper>
    </>
  );
}
