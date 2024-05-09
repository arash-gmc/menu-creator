import React, { useContext } from "react";
import { UserContext } from "../Providers";

const Dashboard = () => {
  const user = useContext(UserContext);
  return <div>Welcome {user?.name}</div>;
};

export default Dashboard;
