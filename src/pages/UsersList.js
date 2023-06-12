import DeleteIcon from "@mui/icons-material/Delete";
import { FormControlLabel } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CheckBox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useUsers from "../hooks/useUsers";
import { AppFunctionalitiesContext } from "../contexts/appFunctionalitiesContext";

const UsersList = () => {
  const navigate = useNavigate();
  const {
    showUserIds,
    setShowUserIds,
    isDeleteError,
    setIsDeleteError
  } = useContext(AppFunctionalitiesContext);

  const {
    userList,
    isLoadingUsers,
    isLoadingUsersError,
    deleteUser
  } = useUsers({
    onFetchingUsersError: (error) => {
      toast.error(error.message, {
        position: "top-center",
        closeOnClick: true,
        draggable: false,
        theme: "colored"
      });
    },
    onDeletingUser: (error) => {
      toast.error(error.message, {
        position: "top-center",
        closeOnClick: true,
        draggable: false,
        theme: "colored"
      });
    }
  });

  if (isLoadingUsers) {
    return <h3>Fetching list of users...</h3>;
  }

  if (isLoadingUsersError) {
    return <h3>Error fetching users!</h3>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <h1>Users List</h1>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          margin: "20px"
        }}
      >
        <FormControlLabel
          control={
            <CheckBox
              checked={showUserIds}
              onChange={(e) => setShowUserIds(e.target.checked)}
            />
          }
          label="Show user ids"
        />

        <FormControlLabel
          control={
            <CheckBox
              checked={isDeleteError}
              onChange={(e) => setIsDeleteError(e.target.checked)}
            />
          }
          label="Delete user error"
        />
      </Box>
      <TableContainer
        sx={{
          maxWidth: "800px"
        }}
        component={Paper}
        elevation={3}
      >
        <Table size="small" className="user-table">
          <TableHead>
            <TableRow>
              {showUserIds && <TableCell>User Id</TableCell>}
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map((user) => (
              <TableRow key={user.id}>
                {showUserIds && <TableCell>{user.id}</TableCell>}
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => navigate(`/users/${user.id}`)}
                    sx={{ whiteSpace: "nowrap" }}
                  >
                    Select user
                  </Button>
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() =>
                      deleteUser({ userId: user.id, isDeleteError })
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        sx={{ marginTop: "20px" }}
        variant="contained"
        onClick={() => navigate(`/users/create`)}
      >
        Create User
      </Button>
    </Box>
  );
};

export default UsersList;
