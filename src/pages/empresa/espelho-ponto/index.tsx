/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react-hooks/exhaustive-deps */
import Header from "@/components/HeaderAdm";
import { useCompanyContext } from "@/context/companyContext";
import { IUser } from "@/server/interface";
import * as S from "@/styles/pages/registerPoint";
import { useEffect, useState } from "react";

export default function Registrodeponto() {
  const { users, company, clockIn, getReport } = useCompanyContext();

  const days = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
  ];

  const months = [
    { title: "Janeiro", value: "01" },
    { title: "Fevereiro", value: "02" },
    { title: "Março", value: "03" },
    { title: "Abril", value: "04" },
    { title: "Maio", value: "05" },
    { title: "Junho", value: "09" },
    { title: "Julho", value: "07" },
    { title: "Agosto", value: "08" },
    { title: "Setembro", value: "09" },
    { title: "Outubro", value: "10" },
    { title: "Novembro", value: "11" },
    { title: "Dezembro", value: "12" },
  ];

  const year = ["22", "23", "24"];
  const [selectedYear, setSelectedYear] = useState("22");

  const [month, setMonth] = useState("Janeiro");

  const [selectedUser, setSelectedUser] = useState<IUser>(
    users[0] === undefined ? ({ name: "", cpf: "" } as IUser) : users[0]
  );

  const HandlerOnChange = (id: string, month: string) => {
    const selected = users.find((elem) => {
      return elem.id === id;
    });

    if (selected === undefined) {
      return;
    }

    setSelectedUser(selected);

    const selectedMonth = months.find((elem) => {
      return elem.title === month;
    });

    if (selectedMonth === undefined) {
      return;
    }

    setMonth(selectedMonth.title);

    getReport(selected.id!, selectedMonth.value, "23");
    console.log(clockIn);
  };

  useEffect(() => {
    if (users[0] !== undefined) {
      setSelectedUser(users[0]);
    }
  }, []);

  const generateTimes = (value: string) => {
    const firstIn = clockIn.filter((ele) => {
      if (
        Number(ele?.time?.split("/")[0]) === Number(value) &&
        ele?.type === "in"
      ) {
        return ele;
      }
    })[0]?.time;
    const firstOut = clockIn.filter((ele) => {
      if (
        Number(ele?.time?.split("/")[0]) === Number(value) &&
        ele?.type === "out"
      ) {
        return ele;
      }
    })[0]?.time;
    const secondIn = clockIn.filter((ele) => {
      if (
        Number(ele?.time?.split("/")[0]) === Number(value) &&
        ele?.type === "in"
      ) {
        return ele;
      }
    })[1]?.time;
    const secondOut = clockIn.filter((ele) => {
      if (
        Number(ele?.time?.split("/")[0]) === Number(value) &&
        ele?.type === "out"
      ) {
        return ele;
      }
    })[1]?.time;

    const refac = (value: any) => {
      return `20${value?.split(" ")[0]?.split("/")[2]}/${value.split("/")[1]}/${
        value.split("/")[0]
      } ${value.split(" ")[1]}`;
    };

    const arrSubtotal = [];

    if (firstIn !== undefined && firstOut !== undefined) {
      const refacFirstIn = refac(firstIn);
      const refacFirstOut = refac(firstOut);
      arrSubtotal.push(
        Math.abs(new Date(refacFirstIn) - new Date(refacFirstOut))
      );
    }

    if (secondIn !== undefined && secondOut !== undefined) {
      const refacSecondIn = refac(secondIn);
      const refacSecondOut = refac(secondOut);

      arrSubtotal.push(
        Math.abs(new Date(refacSecondIn) - new Date(refacSecondOut))
      );
    }
    if (arrSubtotal.length > 0) {
      return arrSubtotal.reduce((a, b) => a + b, 0);
    }
    return 0;
  };

  const generateRow = (value: string) => {
    const firstIn = clockIn.filter((ele) => {
      if (
        Number(ele?.time?.split("/")[0]) === Number(value) &&
        ele?.type === "in"
      ) {
        return ele;
      }
    })[0];
    const firstOut = clockIn.filter((ele) => {
      if (
        Number(ele?.time?.split("/")[0]) === Number(value) &&
        ele?.type === "out"
      ) {
        return ele;
      }
    })[0];
    const secondIn = clockIn.filter((ele) => {
      if (
        Number(ele?.time?.split("/")[0]) === Number(value) &&
        ele?.type === "in"
      ) {
        return ele;
      }
    })[1];
    const secondOut = clockIn.filter((ele) => {
      if (
        Number(ele?.time?.split("/")[0]) === Number(value) &&
        ele?.type === "out"
      ) {
        return ele;
      }
    })[1];

    const refac = (value: any) => {
      return `20${value?.split(" ")[0]?.split("/")[2]}/${value.split("/")[1]}/${
        value.split("/")[0]
      } ${value.split(" ")[1]}`;
    };

    const arrSubtotal = [];

    if (firstIn !== undefined && firstOut !== undefined) {
      const refacFirstIn = refac(firstIn?.time);
      const refacFirstOut = refac(firstOut?.time);
      arrSubtotal.push(
        Math.abs(new Date(refacFirstIn) - new Date(refacFirstOut))
      );
    }

    if (secondIn !== undefined && secondOut !== undefined) {
      const refacSecondIn = refac(secondIn?.time);
      const refacSecondOut = refac(secondOut?.time);

      arrSubtotal.push(
        Math.abs(new Date(refacSecondIn) - new Date(refacSecondOut))
      );
    }

    if (arrSubtotal.length > 0) {
      const subTotal = arrSubtotal.reduce((a, b) => a + b, 0);
      const minutes =
        Math.floor(subTotal / 1000 / 60 / 60) +
        ":" +
        (Math.floor(
          subTotal / 1000 / 60 - Math.floor(subTotal / 1000 / 60 / 60) * 60
        ) === 0
          ? "00"
          : Math.floor(
              subTotal / 1000 / 60 - Math.floor(subTotal / 1000 / 60 / 60) * 60
            ));
      return [firstIn, firstOut, secondIn, secondOut, `${minutes} horas`];
    }

    return [firstIn, firstOut, secondIn, secondOut, ""];
  };

  const generateTotalHours = () => {
    const totalTimes = [];
    for (let i = 1; i <= 31; i++) {
      totalTimes.push(generateTimes(i.toString()));
    }

    const subTotal = totalTimes.reduce((a, b) => a + b, 0);

    const minutes =
      Math.floor(subTotal / 1000 / 60 / 60) +
      ":" +
      (Math.floor(
        subTotal / 1000 / 60 - Math.floor(subTotal / 1000 / 60 / 60) * 60
      ) === 0
        ? "00"
        : Math.floor(
            subTotal / 1000 / 60 - Math.floor(subTotal / 1000 / 60 / 60) * 60
          ));

    return `${minutes} horas`;
  };

  return (
    <S.Wrapper>
      <Header></Header>

      <S.ReportWrapper>
        <S.ReportInputs>
          <S.EmployColumn>
            <S.EmployLabel>Funcionários</S.EmployLabel>
            <S.EmploySelect
              onChange={(e) => HandlerOnChange(e.target.value, month)}
            >
              {users.map((elem, i) => {
                return (
                  <S.EmployOptions value={elem?.id} key={i}>
                    {elem.name}
                  </S.EmployOptions>
                );
              })}
            </S.EmploySelect>
          </S.EmployColumn>
          <S.EmployColumn>
            <S.EmployLabel>Mês</S.EmployLabel>
            <S.EmploySelect
              onChange={(event) => {
                const selected = months.filter((elem) => {
                  return elem.value === event.target.value;
                });

                if (selected[0]?.title !== undefined) {
                  setMonth(selected[0]?.title);
                }
              }}
            >
              {months.map((elem, i) => (
                <S.EmployOptions value={elem.value} key={`${i}ds`}>
                  {elem.title}
                </S.EmployOptions>
              ))}
            </S.EmploySelect>
          </S.EmployColumn>
          <S.EmployColumn>
            <S.EmployLabel>Ano</S.EmployLabel>
            <S.EmploySelect
              onChange={(event) => {
                setSelectedYear(event.target.value);
              }}
            >
              {year.map((elem, i) => (
                <S.EmployOptions value={elem} key={`${i}ds`}>
                  {elem}
                </S.EmployOptions>
              ))}
            </S.EmploySelect>
          </S.EmployColumn>
          <S.DownloadPDF>Baixar como PDF</S.DownloadPDF>
        </S.ReportInputs>

        <hr
          style={{ width: "100%", height: "1px", backgroundColor: "#000000" }}
        />

        <S.TableHeadersColumn>
          <div>
            <S.TableHeadersText>Empresa: {company?.name}</S.TableHeadersText>
            <S.TableHeadersText>CNPJ: {company?.cnpj}</S.TableHeadersText>
          </div>

          <div>
            <S.TableHeadersText>Período:</S.TableHeadersText>
            <S.TableHeadersText>
              {month} / 20{selectedYear}
            </S.TableHeadersText>
          </div>
        </S.TableHeadersColumn>

        <S.TableHeadersColumn>
          <div>
            <S.TableHeadersText>
              Funcionário:
              {selectedUser?.name === undefined ? "" : selectedUser.name}
            </S.TableHeadersText>
            <S.TableHeadersText>
              CPF: {selectedUser?.cpf === undefined ? "" : selectedUser?.cpf}
            </S.TableHeadersText>
          </div>

          <div>
            <S.TableHeadersText>Horas contabilizadas:</S.TableHeadersText>
            <S.TableHeadersText>{generateTotalHours()}</S.TableHeadersText>
          </div>
        </S.TableHeadersColumn>
        <hr
          style={{ width: "100%", height: "1px", backgroundColor: "#000000" }}
        />

        <table>
          <tr>
            <th>Dia</th>
            <th>Entrada</th>
            <th>Saída</th>
            <th>Entrada</th>
            <th>Saída</th>
            <th>Total</th>
          </tr>
          {days.map((ele, i) => {
            return (
              <tr key={i}>
                <td>{ele}</td>
                {generateRow(ele).map((ele2, i) => {
                  if (i < 4) {
                    return <td key={i}>{ele2?.time?.split(" ")[1]}</td>;
                  } else {
                    return <td key={i}>{ele2}</td>;
                  }
                })}
              </tr>
            );
          })}
        </table>
      </S.ReportWrapper>
    </S.Wrapper>
  );
}
