import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Field, Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useUserDetail from "../hooks/useUserDetail";

export default function UserDetail() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const {
    userData,
    isUserFetching,
    isUserFetchingError,
    isUpdatingUser,
    directCacheUserUpdate,
    invalidateQueriesUserUpdate
  } = useUserDetail({
    userId,
    onFetchUserError: (error) => {
      toast.error(error.message, {
        position: "top-center",
        closeOnClick: true,
        draggable: false,
        theme: "colored"
      });
    },
    onUpdateUser: () => {
      toast.success("User successfully updated!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored"
      });
    }
  });

  const onDirectCacheUpdate = (values) => {
    directCacheUserUpdate({ id: userId, ...values });
  };

  const onInvalidateQueriesUpdate = (values) => {
    invalidateQueriesUserUpdate({ id: userId, ...values });
  };

  if (isUserFetching) {
    return <h3>Fetching the chosen one...</h3>;
  }

  if (isUpdatingUser) {
    return <h4>Updating user...</h4>;
  }

  if (isUserFetchingError) {
    return <h3>Fetching user error!</h3>;
  }

  return (
    <Box sx={{ width: "500px" }}>
      <Button onClick={() => navigate("/users")}>
        &#60; Back to user list
      </Button>
      <Box className="user-form">
        <h1>User Detail</h1>
        <Formik
          initialValues={{
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email
          }}
          enableReinitialize
        >
          {(props) => (
            <Form>
              <Box className="form-field">
                <Field
                  type="text"
                  id="firstName"
                  name="firstName"
                  as={TextField}
                  label="First Name"
                />
              </Box>

              <Box className="form-field">
                <Field
                  type="text"
                  id="lastName"
                  name="lastName"
                  as={TextField}
                  label="Last Name"
                />
              </Box>

              <Box className="form-field">
                <Field
                  type="email"
                  id="email"
                  name="email"
                  as={TextField}
                  label="Email"
                />
              </Box>

              <Button
                onClick={() => onDirectCacheUpdate(props.values)}
                variant="contained"
                sx={{ marginRight: "10px" }}
              >
                Direct Cache Update
              </Button>
              <Button
                onClick={() => onInvalidateQueriesUpdate(props.values)}
                variant="contained"
              >
                Invalidate Queries Update
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
