import type { NextApiRequest } from "next";

export interface ICompany {
  id?: string;
  name: string;
  cnpj: string;
  logo?: string | null;
  isActive: boolean;
  user?: IUser[];
  clockin?: IClockIn[];
  session?: ICompanySession[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUser {
  id?: string;
  cpf: string;
  name: string;
  hourly: boolean;
  isActive: boolean;
  clockin?: IClockIn[];
  phone?: string;
  email?: string;
  session?: IUserSession[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IClockIn {
  id?: string;
  userId: string;
  userName: string;
  companyId: string;
  companyName: string;
  time?: string;
  ip?: string;
  location?: string;
  obs?: string;
  type?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserSession {
  id?: string;
  sessionToken: string;
  userId: string;
  expires: Date;
}

export interface ICompanySession {
  id?: string;
  sessionToken: string;
  userId: string;
  expires: Date;
}

export interface ICreateCompanyReq extends NextApiRequest {
  body: {
    id?: string;
    name: string;
    cnpj: string;
    logo?: string;
    isActive: boolean;
    password?: string;
  };
}

export interface ICreateCompany {
  name: string;
  cnpj: string;
  logo?: string | null;
  isActive: boolean;
  password: string;
}
