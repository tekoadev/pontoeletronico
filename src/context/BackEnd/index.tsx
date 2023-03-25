import { createContext, type ReactNode, useState } from "react";

interface BackEndContextProps {
  user: string;
  setUser: React.Dispatch<string>;
}

export const BackEndContext = createContext<BackEndContextProps>(
  {} as BackEndContextProps
);

export default function BackEndProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState("");

  return (
    <BackEndContext.Provider value={{ user, setUser }}>
      {children}
    </BackEndContext.Provider>
  );
}
