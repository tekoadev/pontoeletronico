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
import { ICompany } from "@/server/interface";
import { useGeneral } from "./generalContext";

interface CompanyContextProps {
  company: ICompany | string | undefined;
  companyLogin: (data: { cnpj: string; password: string }) => void;
}
export const CompanyContext = createContext<CompanyContextProps>(
  {} as CompanyContextProps
);

export const CompanyProvider = ({ children }: any) => {
  const cookies = parseCookies();
  const navigate = useRouter();
  const { setIsLoading, showAlert } = useGeneral();

  const [company, setCompany] = useState<ICompany | string | undefined>(
    cookies?.Company || ({} as ICompany)
  );

  const [companyToken, setCompanyToken] = useState(cookies?.CompanyToken) || "";

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Authorization: `Bearer ${companyToken!}`,
  };

  useEffect(() => {
    if (window.location.pathname.includes("/empresa/") && companyToken !== "") {
      ClockInApi({
        method: "GET",
        url: "company/company",
        headers: headers,
      })
        .then((res) => {
          setCompany(res?.data?.body);
          setCookie(null, "Company", res?.data?.body);
          return navigate.push("/empresa/home");
        })
        .catch((err) => {
          console.log(err);
          return navigate.push("/empresa");
        });
    }
    if (window.location.pathname.includes("/empresa/") && companyToken === "") {
      return navigate.push("/");
    }
  }, []);

  const companyLogin = async (data: { cnpj: string; password: string }) => {
    setIsLoading(true);
    await ClockInApi({
      method: "POST",
      url: "company/auth",
      data,
    })
      .then((res) => {
        setCompanyToken(res?.data?.accessToken);
        setCompany(res?.data?.body);
        setCookie(null, "Company", res?.data?.body);
        setIsLoading(false);
        navigate.push("/empresa/home");
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        showAlert("error", "Erro de login", "Verifique os dados enviados");
      });
  };

  return (
    <CompanyContext.Provider value={{ company, companyLogin }}>
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompanyContext = (): CompanyContextProps =>
  useContext(CompanyContext);
