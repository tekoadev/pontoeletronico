import React, {
  useContext,
  useState,
  createContext,
  SetStateAction,
} from "react";
import AlertBallon from "../components/AlertBallon";
import Loading from "../components/Loading";

interface ContextProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
  showAlert: (
    type: string,
    title: string,
    content: string,
    percentage?: number
  ) => void;
}

export const GeneralContext = createContext<ContextProps>({} as ContextProps);

export const GeneralProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const [alertBalloonData, setAlertBalloonData] = useState({
    opened: false,
    type: "error",
    title: "Ocorreu um erro!",
    content: "Tente novamente mais tarde.",
    progressPercentage: 0,
  });

  const closeAlert = () => {
    setAlertBalloonData({
      ...alertBalloonData,
      opened: false,
    });
  };

  const showAlert = (
    type: string,
    title: string,
    content: string,
    percentage?: number
  ) => {
    setAlertBalloonData({
      opened: true,
      type,
      title,
      content,
      progressPercentage: percentage || 0,
    });
    setTimeout(closeAlert, 40000);
  };

  return (
    <GeneralContext.Provider
      value={{
        isLoading,
        setIsLoading,
        showAlert,
      }}
    >
      {children}
      <AlertBallon {...alertBalloonData} closeFunction={closeAlert} />
      {isLoading && <Loading />}
    </GeneralContext.Provider>
  );
};

export const useGeneral = (): ContextProps => useContext(GeneralContext);
