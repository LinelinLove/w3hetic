import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/pages/LoginPage";
import Signup from "./components/pages/SignUpPage";
import Dashboard from "./components/pages/DashboardPage";
import MyFiles from "./components/pages/MyFilesPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/useAuth";
import Footer from "./components/molecules/Footer";
import Header from "./components/molecules/Header";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* <ProtectedRoute> */}
        <Header />
        {/* </ProtectedRoute> */}
        <Routes>
          <Route
            path="/"
            element={
              // <ProtectedRoute>
              <Dashboard />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/myfiles"
            element={
              // <ProtectedRoute>
              <MyFiles />
              // </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </AuthProvider>
  );
}

export default App;
