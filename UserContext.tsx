import { createContext, ReactNode, useState } from "react";

interface IgetUserId {
  getUserId: string | null;
  setUserId: (getUserId: string | null) => void;
}

const defaultValue: IgetUserId = {
  getUserId: "",
  setUserId: () => {},
};

const UserType = createContext(defaultValue);

const UserContext = ({ children }: { children: ReactNode }) => {
  const [getUserId, setUserId] = useState<string | null>(null);

  return (
    <UserType.Provider value={{ getUserId, setUserId }}>
      {children}
    </UserType.Provider>
  );
};

export { UserContext, UserType };
