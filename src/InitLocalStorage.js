import { useEffect } from "react";
import usersData from "./userDataBase/usersData";
import ls from "local-storage";

const InitLocalStorage = () => {
  useEffect(() => {
    ls.set("users-data", usersData);
  }, []);

  return null;
};

export default InitLocalStorage;
