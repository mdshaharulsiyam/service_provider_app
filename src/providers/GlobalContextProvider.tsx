import React, { createContext, ReactNode, useContext, useState } from "react";
import { SalonRole } from "../theme/salonTheme";

interface GlobalContextType {
  role: SalonRole | null;
  setRole: React.Dispatch<React.SetStateAction<SalonRole | null>>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<SalonRole | null>(null);
  const value: GlobalContextType = {
    role,
    setRole,
  };
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

export default GlobalContextProvider;
