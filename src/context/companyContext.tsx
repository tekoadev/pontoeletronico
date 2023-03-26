/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useEffect, useContext, useState, createContext } from "react";
import nookies, { parseCookies, setCookie, destroyCookie } from "nookies";
import ClockInApi from "@/services";
import { useRouter } from "next/router";
import { IClockIn, ICompany, ICreateUser, IUser } from "@/server/interface";
import { useGeneral } from "./generalContext";

interface CompanyContextProps {
  company: ICompany | undefined;
  companyLogin: (data: { cnpj: string; password: string }) => void;
  createUser: (data: ICreateUser) => Promise<boolean>;
  users: IUser[];
  clockIn: IClockIn[];
  getReport: (id: string, month: string, year: string) => void;
}
export const CompanyContext = createContext<CompanyContextProps>(
  {} as CompanyContextProps
);

export const CompanyProvider = ({ children }: any) => {
  const cookies = parseCookies();
  const navigate = useRouter();
  const { setIsLoading, showAlert } = useGeneral();

  const [company, setCompany] = useState<ICompany | undefined>(
    cookies?.Company !== undefined
      ? JSON.parse(cookies?.Company)
      : ({} as ICompany)
  );

  const [companyToken, setCompanyToken] = useState(cookies?.CompanyToken) || "";

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Authorization: `Bearer ${companyToken!}`,
  };

  const [users, setUser] = useState<IUser[]>([] as IUser[]);

  const listUsers = async (): Promise<void> => {
    setIsLoading(true);
    await ClockInApi({
      method: "GET",
      url: "company/user",
      headers,
    })
      .then((req: { data: { body: IUser[] } }) => setUser(req?.data?.body))
      .catch((err) => {
        showAlert(
          "error",
          "Erro com dados",
          "Comunique o administrador do serviço"
        );
        setUser([]);
      });
    setIsLoading(false);
  };

  const companyLogin = async (data: { cnpj: string; password: string }) => {
    setIsLoading(true);
    await ClockInApi({
      method: "POST",
      url: "company/auth",
      data,
    })
      .then((res) => {
        setCompanyToken(res?.data?.accessToken);
        setCookie(null, "CompanyToken", res?.data?.accessToken);
        setCompany(res?.data?.body);
        setCookie(null, "Company", JSON.stringify(res?.data?.body));
        setIsLoading(false);
        navigate.push("/empresa/home");
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        showAlert("error", "Erro de login", "Verifique os dados enviados");
      });
  };

  const createUser = async (data: ICreateUser) => {
    setIsLoading(true);
    let error = false;
    await ClockInApi({
      method: "POST",
      url: "company/user",
      headers,
      data,
    })
      .then(() => {
        setIsLoading(false);
        showAlert("", "Usuário criado", "");
        return true;
      })
      .catch((err) => {
        error = true;
        setIsLoading(false);
        if (err?.response?.data?.message === "User already exist") {
          showAlert(
            "error",
            "Usuário já existe",
            "Tente outro nome de usuário"
          );
          return false;
        }
        showAlert(
          "error",
          "Erro ao criar usuário",
          "Verifique com administrador do serviço"
        );
        return false;
      });
    if (error) {
      return false;
    }
    return true;
  };

  const [clockIn, setClockIn] = useState<IClockIn[]>([] as IClockIn[]);

  const getReport = async (id: string, month: string, year: string) => {
    setIsLoading(true);
    await ClockInApi({
      method: "GET",
      url: `company/reports?id=${id}&month=${month}&year=${year}`,
      headers,
    })
      .then((req: { data: { body: IClockIn[] } }) =>
        setClockIn(req?.data?.body?.reverse())
      )
      .catch((err) => {
        showAlert(
          "error",
          "Erro com dados",
          "Comunique o administrador do serviço"
        );
        setClockIn([]);
      });
    setIsLoading(false);
  };

  useEffect(() => {
    if (window.location.pathname.includes("/empresa") && companyToken !== "") {
      ClockInApi({
        method: "GET",
        url: "company/company",
        headers: headers,
      })
        .then((res) => {
          setCompany(res?.data?.body);
          setCookie(null, "Company", JSON.stringify(res?.data?.body));

          if (window.location.pathname === "/empresa") {
            return navigate.push("/empresa/home");
          }
          if (window.location.pathname === "/empresa/espelho-ponto") {
            listUsers();
          }
        })
        .catch((err) => {
          console.log(err);
          return navigate.push("/empresa");
          destroyCookie(null, "Company");
          destroyCookie(null, "CompanyToken");
        });
    }
    if (window.location.pathname.includes("/empresa/") && companyToken === "") {
      return navigate.push("/");
    }
  }, []);

  return (
    <CompanyContext.Provider
      value={{ company, companyLogin, createUser, users, clockIn, getReport }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompanyContext = (): CompanyContextProps =>
  useContext(CompanyContext);
