import { Theme } from "@radix-ui/themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import react, { ReactNode, useEffect, useState } from "react";
import axiosConfig from "./services/axios";

export interface User {
  id: string;
  name: string;
  type: string;
  title: string;
}

export const UserContext = react.createContext<User | undefined>({} as User);

const Providers = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>();
  const client = new QueryClient();
  axiosConfig();
  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString) as User;
      setUser(user);
    }
  }, []);
  return (
    <UserContext.Provider value={user}>
      <QueryClientProvider client={client}>
        <Theme>{children}</Theme>
      </QueryClientProvider>
    </UserContext.Provider>
  );
};

export default Providers;
