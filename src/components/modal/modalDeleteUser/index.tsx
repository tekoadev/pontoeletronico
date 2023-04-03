import { CompanyContext } from "@/context/companyContext";
import { hourFormatter } from "@/utils/masks";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import * as S from "./styles";
import { IUser } from "@/server/interface";

export default function ModalDeleteEmployee({
  setShowModal,
  userId,
}: {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  userId: string;
}) {
  const { deleteUser } = useContext(CompanyContext);
  console.log(userId);

  return (
    <S.ModalContainer>
      <S.ModalInfo theme="delete">
        <div>
          <p>
            Você realmente deseja <span>DELETAR</span> este usuário?
          </p>
          <p>
            Ao deletar o usuário você perderá <span>TODOS</span> os dados
          </p>
          <p>
            Para bloquear um usuário na plataforma pode pode deixar ele inativo
          </p>
          <AiOutlineCloseCircle size={30} onClick={() => setShowModal(false)} />
        </div>

        <S.ButtonWrapper>
          <button
            onClick={() => {
              setShowModal(false);
            }}
          >
            Cancelar
          </button>
          <button
            onClick={async () => {
              await deleteUser({ id: userId });
              setShowModal(false);
            }}
          >
            Deletar
          </button>
        </S.ButtonWrapper>
      </S.ModalInfo>
    </S.ModalContainer>
  );
}
