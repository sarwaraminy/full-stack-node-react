import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./auth/PrivateRoute";
import { LoginPage } from "./components/LoginPage";
import { SignUpPage } from "./components/SignUp";
import './App.css';
import RoomData from './components/rooms';
import NotFoundPage from "./components/NotFountPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<RoomData />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
