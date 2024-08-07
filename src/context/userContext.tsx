import ClockInApi from "@/services";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import nookies, { parseCookies, setCookie, destroyCookie } from "nookies";
import { useRouter } from "next/router";
import { IClockIn, IUser } from "@/server/interface";
import { useGeneral } from "./generalContext";

interface UserContextProps {
  handleLogin: (user: string, password: string) => Promise<void>;
  handleLogout: () => void;
  verifyUserToken: () => void;
  createClockIn: ({
    location,
    obs,
  }: {
    location?: string;
    obs?: string;
  }) => Promise<void>;
  user: IUser | undefined;
}

export const UserContext = createContext<UserContextProps>(
  {} as UserContextProps
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { setIsLoading, showAlert } = useGeneral();
  const cookies = parseCookies();
  const [user, setUser] = useState<IUser | undefined>(
    cookies?.user !== undefined ? JSON.parse(cookies?.user) : {}
  );
  const [userToken, setUserToken] = useState(cookies?.userToken) || "";
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Authorization: `Bearer ${userToken!}`,
  };

  const navigate = useRouter();

  const handleLogin = async (user: string, password: string) => {
    setIsLoading(true);
    await ClockInApi({
      method: "POST",
      url: "user/auth",
      data: {
        user,
        password,
      },
    })
      .then((res) => {
        setUserToken(res?.data?.accessToken);
        setCookie(null, "userToken", res?.data?.accessToken);
        setUser(res?.data?.body);
        setCookie(null, "user", JSON.stringify(res?.data?.body));
        setIsLoading(false);
        navigate.push("/usuario/criar-registro");
      })
      .catch((err) => {
        setIsLoading(false);
        showAlert("error", "Erro de login", "Verifique os dados enviados");
      });
  };

  const handleLogout = () => {
    destroyCookie(null, "userToken");
    destroyCookie(null, "user");
    navigate.push("/usuario");
  };

  const verifyUserToken = async () => {
    if (window.location.pathname.includes("/usuario") && userToken !== "") {
      await ClockInApi({
        method: "GET",
        url: "user/clockin",
        headers: headers,
      })
        .then((res) => {
          if (window.location.pathname === "/usuario") {
            navigate.push("/usuario/criar-registro");
          }
        })
        .catch((err) => {
          handleLogout();
        });
    }

    if (window.location.pathname.includes("/usuario/") && userToken === "") {
      navigate.push("/usuario");
    }
  };

  useEffect(() => {
    verifyUserToken();
  }, []);

  const [listClockIn, setListClockIn] = useState([] as IClockIn[]);

  const listClockInUser = async () => {
    setIsLoading(true);
    await ClockInApi({
      method: "GET",
      url: "user/clockin",
      headers,
    })
      .then((res) => {
        setListClockIn(res?.data?.body);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        err.data === "Invalid Token" && handleLogout();
      });
  };

  const createClockIn = async ({
    location,
    obs,
  }: {
    location?: string;
    obs?: string;
  }) => {
    setIsLoading(true);
    await ClockInApi({
      method: "POST",
      url: "user/clockin",
      headers,
      data: {
        location,
        obs,
      },
    })
      .then((res) => {
        showAlert("", "Ponto registrado com sucesso", "");
      })
      .catch(async (err) => {
        showAlert("error", "Erro de dados", "Verifique os dados enviados");
        await verifyUserToken();
      });
    setIsLoading(false);
  };

  return (
    <UserContext.Provider
      value={{
        handleLogin,
        handleLogout,
        verifyUserToken,
        createClockIn,
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextProps => useContext(UserContext);
