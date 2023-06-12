import TextField from "@mui/material/TextField";
import { Form, Formik, Field } from "formik";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useUsers from "../hooks/useUsers";
import { useNavigate } from "react-router-dom";

const UsersCreate = () => {
  const navigate = useNavigate();
  const { createUser } = useUsers({ enabled: false });

  const onSubmit = (values) => {
    createUser(values);
    navigate("/users");
  };

  return (
    <Box className="user-form">
      <h1>Create user</h1>
      <Formik
        initialValues={{ firstName: "", lastName: "", email: "" }}
        enableReinitialize
        onSubmit={onSubmit}
      >
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

          <Button type="submit">Create user</Button>
        </Form>
      </Formik>
    </Box>
  );
};

export default UsersCreate;
