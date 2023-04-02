import { CompanyContext } from "@/context/companyContext";
import { hourFormatter } from "@/utils/masks";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import * as S from "./style";

export default function Modal({
  type,
  setShowModal,
  day,
  month,
  year,
  clockInId,
  editClockInValue,
  userId
}: {
  type: string;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  day?: string;
  month?: string;
  year?: string;
  clockInId?: string;
  editClockInValue?: string;
  userId?: string;
}) {
  const [valueInput, setValueInput] = useState(
    editClockInValue ? editClockInValue.split(" ")[1] : ""
  );
  const { editClockIn, deleteClockIn, addClockIn } = useContext(CompanyContext);

  return (
    <S.ModalContainer>
      {type == "delete" ? (
        <S.ModalInfo theme={type}>
          <div>
            <p>Voce Realmente deseja deletar?</p>
            <AiOutlineCloseCircle
              size={30}
              onClick={() => setShowModal(false)}
            />
          </div>

          <button
            onClick={() => {
              deleteClockIn(clockInId!);
              setShowModal(false);
            }}
          >
            Deletar
          </button>
        </S.ModalInfo>
      ) : type == "edit" ? (
        <S.ModalInfo theme={type}>
          <div>
            <p>Editar</p>
            <AiOutlineCloseCircle
              size={30}
              onClick={() => setShowModal(false)}
            />
          </div>

          <input
            placeholder="Horário"
            value={valueInput}
            onChange={(e) => setValueInput(hourFormatter(e.target.value))}
            maxLength={5}
          />

          <button
            onClick={() => {
              editClockIn(
                `${editClockInValue!.split(" ")[0]} ${valueInput}`,
                clockInId!
              );
              setShowModal(false);
            }}
          >
            Editar
          </button>
        </S.ModalInfo>
      ) : (
        <S.ModalInfo theme={type}>
          <div>
            <p>Adicionar</p>
            <AiOutlineCloseCircle
              size={30}
              onClick={() => setShowModal(false)}
            />
          </div>
          <input
            placeholder="Horário"
            value={valueInput}
            onChange={(e) => setValueInput(hourFormatter(e.target.value))}
            maxLength={5}
          />

          <button
            onClick={() => {
              addClockIn(
                `${editClockInValue!.split(" ")[0]} ${valueInput}`,
                userId!
              );
            }}
          >
            Adicionar
          </button>
        </S.ModalInfo>
      )}
    </S.ModalContainer>
  );
}
