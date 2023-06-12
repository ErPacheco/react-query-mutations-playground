import ls from "local-storage";
import { createContext } from "react";
import { v4 as uuidv4 } from "uuid";

export const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const createUser = (userData) => {
    return new Promise((resolve) => {
      const userToCreate = {
        ...userData,
        id: uuidv4()
      };

      setTimeout(() => {
        const usersList = ls.get("users-data");

        ls.set("users-data", [...usersList, userToCreate]);

        resolve(userToCreate);
      }, 1000);
    });
  };

  const deleteUserById = ({ userId, isDeleteError = false } = {}) => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        if (isDeleteError) {
          // ERROR
          return reject({ message: "Error deleting the user!" });
        }

        // SUCCESS
        const userToDelete = await getUserById(userId);

        const usersList = ls.get("users-data");

        const updatedUserDatabase = usersList.filter(
          (user) => user.id !== userId
        );

        ls.set("users-data", updatedUserDatabase);

        resolve(userToDelete);
      }, 500);
    });
  };

  const updateUserById = (updatedUser) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const usersList = ls.get("users-data");

        const updatedUserDatabase = usersList.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );

        ls.set("users-data", updatedUserDatabase);

        resolve(updatedUser);
      }, 300);
    });
  };

  const getUserById = (userId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const usersList = ls.get("users-data");

        const userFound = usersList.find((user) => user.id === userId);

        if (!userFound) {
          return reject({ message: "User not found!" });
        }

        resolve(userFound);
      }, 200);
    });
  };

  const getUsersList = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const usersList = ls.get("users-data");

        resolve(usersList);
      }, 500);
    });
  };

  const userContextValue = {
    getUsersList,
    createUser,
    deleteUserById,
    updateUserById,
    getUserById
  };

  return (
    <UserDataContext.Provider value={userContextValue}>
      {children}
    </UserDataContext.Provider>
  );
};
