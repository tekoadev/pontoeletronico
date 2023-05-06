import { IClockIn } from "@/server/interface";
import * as S from "./styles";
import { BsXCircle } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";

interface DayCardProps {
  register: IClockIn[];
  user?: boolean;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function DayCard({
  register,
  showModal,
  setShowModal,
  user,
}: DayCardProps) {
  return (
    <>
      {showModal && (
        <S.Bck onClick={() => setShowModal(!showModal)}>
          <S.Wrapper onClick={(e) => e.stopPropagation()}>
            <S.TitleWrapper>
              <h3>Relatório do dia</h3>
              <BsXCircle onClick={() => setShowModal(!showModal)} />
            </S.TitleWrapper>
            <hr />
            {register.map((ele, i) => {
              return (
                <S.Register key={i}>
                  <h4>Registro</h4>
                  {user && <p>Usuário: {ele.user?.name}</p>}
                  <p>Horário: {ele.time!.split(" ")[1]}</p>
                  {ele.location && (
                    <div>
                      <FaMapMarkerAlt />
                      <a
                        target="_blank"
                        href={`https://www.google.com.br/maps/search/${
                          ele.location.split("/")[0]
                        },${ele.location.split("/")[1]}/@${
                          ele.location.split("/")[0]
                        },${ele.location.split("/")[1]}z?hl=pt-BR`}
                      >
                        Localização
                      </a>
                    </div>
                  )}
                  {ele.obs && <p>Observações: {ele.obs}</p>}
                </S.Register>
              );
            })}
          </S.Wrapper>
        </S.Bck>
      )}
    </>
  );
}
