import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import UserDetail from "./pages/UserDetail";
import UsersCreate from "./pages/UsersCreate";
import UsersList from "./pages/UsersList";
import "./styles.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/users" />} />
        <Route exact path="/users" element={<UsersList />} />
        <Route path="/users/:userId" element={<UserDetail />} />
        <Route path="/users/create" element={<UsersCreate />} />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </Router>
  );
}
