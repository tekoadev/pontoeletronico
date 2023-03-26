import Header from "@/components/HeaderAdm";
import * as S from "@/styles/pages/registerPoint";
import { useState } from "react";

export default function Registrodeponto() {
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const [month, setMonth] = useState("Janeiro");

  return (
    <S.Wrapper>
      <Header></Header>

      <S.ReportWrapper>
        <S.ReportInputs>
          <S.EmployColumn>
            <S.EmployLabel>Funcionários</S.EmployLabel>
            <S.EmploySelect>
              <S.EmployOptions value="fa">Fabio</S.EmployOptions>
            </S.EmploySelect>
          </S.EmployColumn>
          <S.EmployColumn>
            <S.EmployLabel>Mês</S.EmployLabel>
            <S.EmploySelect onChange={(event) => setMonth(event.target.value)}>
              {months.map((e, i) => (
                <S.EmployOptions value={e} key={i + "ds"}>
                  {e}
                </S.EmployOptions>
              ))}
            </S.EmploySelect>
          </S.EmployColumn>
          <S.DownloadPDF>Baixar como PDF</S.DownloadPDF>
        </S.ReportInputs>

        <hr style={{width: "100%", height: "1px", backgroundColor: "#000000"}}/>

        <S.TableHeadersColumn>
          <div>
            <S.TableHeadersText>Empresa:</S.TableHeadersText>
            <S.TableHeadersText>CNPJ: 45.780.837/0001-39</S.TableHeadersText>
          </div>

          <div>
            <S.TableHeadersText>Período:</S.TableHeadersText>
            <S.TableHeadersText>{month}</S.TableHeadersText>
          </div>
        </S.TableHeadersColumn>

        

        <S.TableHeadersColumn>
          <div>
            <S.TableHeadersText>Funcionário</S.TableHeadersText>
            <S.TableHeadersText>CPF: 999.999.999-99</S.TableHeadersText>
          </div>
        </S.TableHeadersColumn>
        <hr style={{width: "100%", height: "1px", backgroundColor: "#000000"}}/>
      </S.ReportWrapper>
    </S.Wrapper>
  );
}
