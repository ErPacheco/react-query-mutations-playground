import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { UserDataContext } from "../userDataBase/userDataContext";

const useUsers = ({
  onFetchingUsersError = () => {},
  onDeletingUser = () => {}
}) => {
  const { getUsersList, createUser, deleteUserById } = useContext(
    UserDataContext
  );
  const queryClient = useQueryClient();

  const {
    data: userList,
    isLoading: isLoadingUsers,
    isError: isLoadingUsersError
  } = useQuery(["users"], () => getUsersList(), {
    onError: onFetchingUsersError
  });

  const { mutate } = useMutation(createUser, {
    onMutate: async (userData) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(["users"]);

      const previousUserList = queryClient.getQueryData(["users"]);

      const user = {
        id: Math.random().toString(),
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email
      };

      queryClient.setQueryData(["users"], (oldList) => [...oldList, user]);

      return { previousUserList };
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData(["users"], context.previousUserList);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["users"], {
        exact: true
      });
    }
  });

  const { mutate: deleteUser } = useMutation(deleteUserById, {
    onMutate: async ({ userId }) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(["users"]);

      const previousUserList = queryClient.getQueryData(["users"]);

      const updatedUsersList = previousUserList.filter(
        (user) => user.id !== userId
      );

      queryClient.setQueryData(["users"], updatedUsersList);

      return { previousUserList };
    },
    onError: (error, _variables, context) => {
      queryClient.setQueryData(["users"], context.previousUserList);
      onDeletingUser(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["users"], {
        exact: true
      });
    }
  });

  return {
    userList,
    isLoadingUsers,
    isLoadingUsersError,
    createUser: mutate,
    deleteUser
  };
};

export default useUsers;
