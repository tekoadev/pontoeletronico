/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react-hooks/exhaustive-deps */
import Header from "@/components/HeaderAdm";
import Loading from "@/components/Loading";
import Modal from "@/components/modal";
import { useCompanyContext } from "@/context/companyContext";
import type { IClockIn, IUser } from "@/server/interface";
import * as S from "@/styles/pages/registerPoint";
import { PDFgeneratorToDownload } from "@/utils/PDFgeneratorToDownload";
import { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";

export default function RegistroDePonto() {
  const today: Date = new Date();
  // const { setIsLoading } = useGeneral();
  const { users, company, clockIn, getReport, listUsers } = useCompanyContext();
  const [showModal, setShowModal] = useState(false);
  const [typeModal, setTypeModal] = useState<"edit" | "add" | "delete" | "">(
    "edit"
  );
  const [clockInId, setClockInId] = useState("");
  const [editClockInValue, setEditClockInValue] = useState("");

  const [day, setDay] = useState("");
  const [selectedUser, setSelectedUser] = useState<IUser>({
    name: "",
    cpf: "",
  } as IUser);

  const setSelectedUserFunction = () => {
    if (users[0]) {
      setSelectedUser(users[0]);
    }
  };

  const handlerUpdateClockIn = async (id: string) => {
    await listUsers();

    const findUser = users.find((user) => user.id === id);

    if (users[0] && findUser === undefined) {
      setSelectedUser(users[0]);
      return
    } else {
      setSelectedUser(findUser!);
      return
    }
  };

  useEffect(() => {
    setSelectedUserFunction();
  }, [users]);

  useEffect(() => {
    listUsers();
  }, []);

  const [selectedYear, setSelectedYear] = useState(
    (today.getFullYear() - 2000).toString()
  );

  const year = ["22", "23", "24"];

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

  const [selectedMonth, setMonth] = useState(
    months.filter((ele) => Number(ele.value) === today.getMonth() + 1)[0]?.title
  );

  const HandlerOnChange = async () => {
    const dateMonth = months.find((elem) => {
      return elem.title === selectedMonth;
    });

    if (selectedMonth === undefined) {
      return;
    }

    await getReport(selectedUser.id!, dateMonth!.value, selectedYear);
  };

  useEffect(() => {
    if (selectedUser?.id !== undefined) {
      HandlerOnChange();
    }
  }, [selectedUser, selectedMonth, selectedYear]);

  const generateTimes = (value: string) => {
    const firstIn = clockIn.filter((ele) => {
      if (Number(ele?.time?.split("/")[0]) === Number(value)) {
        return ele;
      }
    })[0]?.time;
    const firstOut = clockIn.filter((ele) => {
      if (Number(ele?.time?.split("/")[0]) === Number(value)) {
        return ele;
      }
    })[1]?.time;
    const secondIn = clockIn.filter((ele) => {
      if (Number(ele?.time?.split("/")[0]) === Number(value)) {
        return ele;
      }
    })[2]?.time;
    const secondOut = clockIn.filter((ele) => {
      if (Number(ele?.time?.split("/")[0]) === Number(value)) {
        return ele;
      }
    })[3]?.time;

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
      return arrSubtotal
        .sort((a, b) => (a?.time > b?.time ? 1 : -1))
        .reduce((a, b) => a + b, 0);
    }
    return 0;
  };

  const generateRow = (
    value: string
  ): [
    IClockIn | undefined,
    IClockIn | undefined,
    IClockIn | undefined,
    IClockIn | undefined,
    string
  ] => {
    const firstIn = clockIn.filter((ele) => {
      if (Number(ele?.time?.split("/")[0]) === Number(value)) {
        return ele;
      }
    })[0];
    const firstOut = clockIn.filter((ele) => {
      if (Number(ele?.time?.split("/")[0]) === Number(value)) {
        return ele;
      }
    })[1];
    const secondIn = clockIn.filter((ele) => {
      if (Number(ele?.time?.split("/")[0]) === Number(value)) {
        return ele;
      }
    })[2];
    const secondOut = clockIn.filter((ele) => {
      if (Number(ele?.time?.split("/")[0]) === Number(value)) {
        return ele;
      }
    })[3];

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
    const sortedElements: [
      IClockIn | undefined,
      IClockIn | undefined,
      IClockIn | undefined,
      IClockIn | undefined
    ] = [firstIn, firstOut, secondIn, secondOut].sort((a, b) =>
      a?.time > b?.time ? 1 : -1
    );

    if (arrSubtotal.length > 0) {
      const subTotal = arrSubtotal.reduce((a, b) => a + b, 0);
      const minutes =
        Math.floor(subTotal / 1000 / 60 / 60) +
        ":" +
        (Math.floor(
          subTotal / 1000 / 60 - Math.floor(subTotal / 1000 / 60 / 60) * 60
        ) < 10
          ? `0${Math.floor(
              subTotal / 1000 / 60 - Math.floor(subTotal / 1000 / 60 / 60) * 60
            )}`
          : Math.floor(
              subTotal / 1000 / 60 - Math.floor(subTotal / 1000 / 60 / 60) * 60
            ));
      return [...sortedElements, `${minutes} horas`];
    }

    return [...sortedElements, ""];
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
      ) < 10
        ? `0${Math.floor(
            subTotal / 1000 / 60 - Math.floor(subTotal / 1000 / 60 / 60) * 60
          )}`
        : Math.floor(
            subTotal / 1000 / 60 - Math.floor(subTotal / 1000 / 60 / 60) * 60
          ));

    return `${minutes} horas`;
  };

  return (
    <>
      {selectedUser?.id !== undefined ? (
        <S.Wrapper>
          <Header></Header>

          <S.ReportWrapper>
            <S.ReportInputs>
              <S.EmployColumn>
                <S.EmployLabel>Funcionários</S.EmployLabel>
                <S.EmploySelect
                  onChange={(e) => {
                    const selected = users.find((elem) => {
                      return elem.id === e.target.value;
                    });

                    if (selected === undefined) {
                      return;
                    }

                    setSelectedUser(selected);
                  }}
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
                    <S.EmployOptions
                      value={elem.value}
                      key={`${i}ds`}
                      selected={selectedMonth === elem.title}
                    >
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
                    <S.EmployOptions
                      value={elem}
                      key={`${i}ds`}
                      selected={selectedYear === elem}
                    >
                      {elem}
                    </S.EmployOptions>
                  ))}
                </S.EmploySelect>
              </S.EmployColumn>
              <S.DownloadPDF onClick={() => PDFgeneratorToDownload(days, generateRow, selectedUser, company!, selectedMonth, selectedYear, generateTotalHours)}>Baixar como PDF</S.DownloadPDF>
            </S.ReportInputs>

            <hr
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#000000",
              }}
            />

            <S.TableHeadersColumn>
              <div>
                <S.TableHeadersText>
                  Empresa: {company?.name}
                </S.TableHeadersText>
                <S.TableHeadersText>CNPJ: {company?.cnpj}</S.TableHeadersText>
              </div>

              <div>
                <S.TableHeadersText>Período:</S.TableHeadersText>
                <S.TableHeadersText>
                  {selectedMonth} / 20{selectedYear}
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
                  CPF:{" "}
                  {selectedUser?.cpf === undefined ? "" : selectedUser?.cpf}
                </S.TableHeadersText>
              </div>

              <div>
                <S.TableHeadersText>Horas contabilizadas:</S.TableHeadersText>
                <S.TableHeadersText>{generateTotalHours()}</S.TableHeadersText>
              </div>
            </S.TableHeadersColumn>
            <hr
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#000000",
              }}
            />

            <S.ContainerTableComponent>
              <S.TableComponent>
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
                      <td className="day">{ele}</td>
                      {generateRow(ele).map((ele2, i: number) => {
                        if (i < 4) {
                          return (
                            <td key={i}>
                              {ele2?.time?.split(" ")[1] === undefined ? (
                                <AiOutlinePlusCircle
                                  className="plus"
                                  size={18}
                                  color="black"
                                  onClick={() => {
                                    setShowModal(true);
                                    setTypeModal("add");
                                    setDay(ele);
                                  }}
                                />
                              ) : (
                                <div>
                                  {ele2?.time?.split(" ")[1]}
                                  <BsPencil
                                    size={18}
                                    color="black"
                                    onClick={() => {
                                      setShowModal(true);
                                      setTypeModal("edit");
                                      setDay(ele);
                                      setClockInId(ele2.id);
                                      setEditClockInValue(ele2.time);
                                    }}
                                  />
                                  <MdDeleteOutline
                                    size={18}
                                    color="black"
                                    onClick={() => {
                                      setShowModal(true);
                                      setTypeModal("delete");
                                      setClockInId(ele2.id);
                                    }}
                                  />
                                </div>
                              )}
                            </td>
                          );
                        } else {
                          return <td key={i}>{ele2 as string}</td>;
                        }
                      })}
                    </tr>
                  );
                })}
              </S.TableComponent>
            </S.ContainerTableComponent>
          </S.ReportWrapper>
          {showModal && (
            <Modal
              type={typeModal}
              setShowModal={setShowModal}
              day={day}
              month={
                months.filter((ele) => ele.title === selectedMonth)[0]?.value
              }
              year={selectedYear}
              clockInId={clockInId}
              editClockInValue={editClockInValue}
              userId={selectedUser.id}
              handlerUpdateClockIn={handlerUpdateClockIn}
            ></Modal>
          )}
        </S.Wrapper>
      ) : (
        <Loading />
      )}
    </>
  );
}
