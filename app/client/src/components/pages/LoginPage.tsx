import Logo from "../atoms/Logo";
import Title from "../atoms/Title";
import Form from "../molecules/Form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { useState, FormEvent } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    await login(email, password);
    navigate("/");
  };

  return (
    <>
      <div className="pt-24 px-4">
        <Title label={"Login"} />

        <Form handleSubmit={handleLogin} />
      </div>
      <div className="text-white flex justify-center mt-4">
        <Link to="/signup">
          <p className="text-md text-shadow font-bold transition ease-in-out delay-150">
            Already have an account? Login
          </p>
        </Link>
      </div>
    </>
  );
};

export default LoginPage;
