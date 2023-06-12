import { createContext, useState } from "react";

export const AppFunctionalitiesContext = createContext();

export const AppFunctionalitiesProvider = ({ children }) => {
  const [showUserIds, setShowUserIds] = useState(false);
  const [isDeleteError, setIsDeleteError] = useState(false);

  const functionalitiesContext = {
    showUserIds,
    setShowUserIds,
    isDeleteError,
    setIsDeleteError
  };

  return (
    <AppFunctionalitiesContext.Provider value={functionalitiesContext}>
      {children}
    </AppFunctionalitiesContext.Provider>
  );
};
