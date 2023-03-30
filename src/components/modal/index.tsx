import { Dispatch, SetStateAction } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import * as S from "./style";

export default function Modal({ type, setOpen }: { type: string, setOpen: Dispatch<SetStateAction<boolean>> }) {
  return (
    <S.ModalContainer onClick={() => setOpen(false)}>
      {type == "delete" ? (
        <S.ModalInfo theme={type}>
          <div>
            <p>Voce Realmente deseja deletar?</p>
            <AiOutlineCloseCircle size={30} onClick={() => setOpen(false)}/>
          </div>

          <button>Deletar</button>
        </S.ModalInfo>
      ) : type == "edit" ? (
        <S.ModalInfo theme={type}>
          <div>
            <p>Editar</p>
            <AiOutlineCloseCircle size={30} onClick={() => setOpen(false)}/>
          </div>

          <input type="number" placeholder="Horário" />

          <button>Editar</button>
        </S.ModalInfo>
      ) : (
        <S.ModalInfo theme={type}>
          <div>
            <p>Adicionar</p>
            <AiOutlineCloseCircle size={30} onClick={() => setOpen(false)}/>
          </div>
          <input type="number" placeholder="Horário" />

          <button>Adicionar</button>
        </S.ModalInfo>
      )}
    </S.ModalContainer>
  );
}
