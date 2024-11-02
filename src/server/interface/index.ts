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
  user: string;
  cpf: string;
  name: string;
  password?: string;
  newPassword?: string;
  hourly: boolean;
  isActive: boolean;
  phone?: string;
  email?: string;
  location?: boolean;
  CompanyId?: string;
  clockin?: IClockIn[];
  session?: IUserSession[];
  createdAt?: Date;
  updatedAt?: Date;
  company?: {
    id: string;
    name: string;
    cnpj: string;
    password: string;
    logo: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
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
  payment: boolean | null;
  createdAt?: Date;
  updatedAt?: Date;
  user?: IUser
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

export interface ICreateUserReq extends NextApiRequest {
  body: {
    user: string;
    company_id: string;
    id?: string;
    cpf: string;
    name: string;
    password?: string;
    hourly: boolean;
    isActive: boolean;
    phone?: string;
    email?: string;
  };
}
export interface ICreateUserCompanyReq extends NextApiRequest {
  request_id: any;
  body: {
    user: string;
    user_name: string;
    company_id: string;
    id?: string;
    cpf: string;
    name: string;
    password?: string;
    hourly: boolean;
    isActive: boolean;
    phone?: string;
    email?: string;
  };
  user: string;
}

export interface ICreateUser {
  id?: string;
  user_name?: string;
  user?: string;
  cpf: string;
  name?: string;
  password: string;
  hourly: boolean;
  location?: boolean;
  isActive?: boolean;
  phone?: string | null;
  email?: string | null;
}

export interface ICreateClockInReq extends NextApiRequest {
  body: {
    id?: string;
    userId: string;
    userName: string;
    companyId: string;
    companyName: string;
    time?: string | null;
    ip?: string | null;
    location?: string | null;
    obs?: string | null;
    type?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
  };
}

export interface ICreateCompanyClockInReq extends NextApiRequest {
  request_id: any;
  body: {
    id?: string;
    userId: string;
    userName: string;
    companyId: string;
    companyName: string;
    time?: string | null;
    ip?: string | null;
    location?: string | null;
    obs?: string | null;
    type?: string | null;
    payment: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  };
  user: string;
}

export interface ICreateClockIn {
  id?: string;
  userId: string;
  companyId?: string;
  time?: string | null;
  location?: string | null;
  obs?: string | null;
  type?: string | null;
}
