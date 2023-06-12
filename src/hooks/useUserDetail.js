import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../userDataBase/userDataContext";

const useUserDetail = ({
  userId,
  onFetchUserError = () => {},
  onUpdateUser = () => {}
}) => {
  const { getUserById, updateUserById } = useContext(UserDataContext);

  const [isUpdatingUser, setIsUpdatingUser] = useState(false);

  const queryClient = useQueryClient();

  const {
    data: userData,
    isFetching: isUserFetching,
    isError: isUserFetchingError
  } = useQuery(["users", userId], () => getUserById(userId), {
    enabled: !!userId,
    onError: onFetchUserError
  });

  const {
    mutate: directCacheUserUpdate,
    isLoading: isDirectCacheUpdating
  } = useMutation(updateUserById, {
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["users", userId], (oldUser) => ({
        ...oldUser,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email
      }));

      queryClient.setQueryData(["users"], (oldUsersData) => {
        const oldUsersList = oldUsersData;

        const index = oldUsersList.findIndex((user) => user.id === userId);

        if (index !== -1) {
          return [
            ...oldUsersList.slice(0, index),
            {
              id: userId,
              firstName: updatedUser.firstName,
              lastName: updatedUser.lastName,
              email: updatedUser.email
            },
            ...oldUsersList.slice(index + 1)
          ];
        }

        return oldUsersData;
      });

      onUpdateUser();
    }
  });

  const {
    mutate: invalidateQueriesUserUpdate,
    isLoading: isInvalidateQueriesUserUpdate
  } = useMutation(updateUserById, {
    onSuccess: () => {
      queryClient.invalidateQueries(["users", userId]);

      queryClient.invalidateQueries(["users"], {
        exact: true
      });

      // We can use this that affect all queries whose query key
      // starts with "users"
      // queryClient.invalidateQueries(["users"]);

      onUpdateUser();
    }
  });

  useEffect(() => {
    setIsUpdatingUser(
      !!(isDirectCacheUpdating || isInvalidateQueriesUserUpdate)
    );
  }, [isDirectCacheUpdating, setIsUpdatingUser, isInvalidateQueriesUserUpdate]);

  return {
    userData,
    isUserFetching,
    isUserFetchingError,
    directCacheUserUpdate,
    invalidateQueriesUserUpdate,
    isUpdatingUser
  };
};

export default useUserDetail;
