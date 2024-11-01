import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/pages/LoginPage";
import Signup from "./components/pages/SignUpPage";
import Dashboard from "./components/pages/DashboardPage";
import MyFiles from "./components/pages/MyFilesPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider, useAuth } from "./context/useAuth";
import Footer from "./components/molecules/Footer";
import Header from "./components/molecules/Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/myfiles"
              element={
                <ProtectedRoute>
                  <MyFiles />
                </ProtectedRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <ProtectedRoute public={true}>
                  <Signup />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <ProtectedRoute public={true}>
                  <Login />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </AuthProvider>
  );
}

const Layout = () => {
  const { authToken } = useAuth();

  return (
    <>
      {authToken && <Header />}
      <Outlet />
    </>
  );
};

export default App;
