import { CompanyContext, useCompanyContext } from "@/context/companyContext";
import { hourFormatter, verifyHour } from "@/utils/masks";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import * as S from "./style";
import { IUser } from "@/server/interface";
import { useGeneral } from "@/context/generalContext";

export default function ModalCompanyClockIn({
  type,
  setShowModal,
  day,
  month,
  year,
  clockInId,
  editClockInValue,
  userId,
  user,
  handlerUpdateClockIn,
}: {
  type: string;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  day: string;
  month: string;
  year: string;
  clockInId: string;
  editClockInValue: string;
  userId: string;
  user: IUser;
  handlerUpdateClockIn: (id: string) => Promise<void>;
}) {
  const [valueInput, setValueInput] = useState(
    type == "edit"
      ? editClockInValue
        ? editClockInValue.split(" ")[1]
        : "00:00"
      : "00:00"
  );
  const { editClockIn, deleteClockIn, addClockIn } = useCompanyContext();
  const { showAlert } = useGeneral();

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
            onClick={async () => {
              await deleteClockIn(clockInId);
              await handlerUpdateClockIn(userId);
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
            onChange={(e) => {
              setValueInput(hourFormatter(e.target.value));
            }}
            onKeyDown={(e) => {
              if (
                e.key !== "0" &&
                e.key !== "1" &&
                e.key !== "2" &&
                e.key !== "3" &&
                e.key !== "4" &&
                e.key !== "5" &&
                e.key !== "6" &&
                e.key !== "7" &&
                e.key !== "8" &&
                e.key !== "9"
              ) {
                e.preventDefault();
              }
            }}
            maxLength={6}
          />

          <button
            onClick={async () => {
              if (verifyHour(valueInput)) {
                await editClockIn(
                  `${editClockInValue!.split(" ")[0]} ${valueInput}`,
                  clockInId
                );
                await handlerUpdateClockIn(userId);
                setShowModal(false);
              } else {
                showAlert("error", "Formato de hora invalida", "");
              }
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
          {user.hourly ? (
            <>
              <input
                placeholder="Horário"
                value={valueInput}
                onChange={(e) => {
                  setValueInput(hourFormatter(e.target.value));
                }}
                onKeyDown={(e) => {
                  if (
                    e.key !== "0" &&
                    e.key !== "1" &&
                    e.key !== "2" &&
                    e.key !== "3" &&
                    e.key !== "4" &&
                    e.key !== "5" &&
                    e.key !== "6" &&
                    e.key !== "7" &&
                    e.key !== "8" &&
                    e.key !== "9"
                  ) {
                    e.preventDefault();
                  }
                }}
                maxLength={6}
              />
              <button
                onClick={async () => {
                  if (verifyHour(valueInput)) {
                    await addClockIn(
                      `${day}/${month}/${year} ${valueInput}`,
                      userId
                    );
                    await handlerUpdateClockIn(userId);
                    setShowModal(false);
                  } else {
                    showAlert("error", "Formato de hora invalida", "");
                  }
                }}
              >
                Adicionar
              </button>
            </>
          ) : (
            <>
              <button
                onClick={async () => {
                  await addClockIn(`${day}/${month}/${year} 12:00`, userId);
                  await handlerUpdateClockIn(userId);
                  setShowModal(false);
                }}
              >
                Confirmar
              </button>
            </>
          )}
        </S.ModalInfo>
      )}
    </S.ModalContainer>
  );
}
