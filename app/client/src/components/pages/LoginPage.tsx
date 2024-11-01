import Title from "../atoms/Title";
import { Form } from "../molecules/Form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { useState, FormEvent } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    await login(username, password);
    navigate("/");
  };

  return (
    <>
      <div className="pt-24 px-4">
        <Title label={"Login"} />

        <Form
          handleSubmit={handleLogin}
          showEmail={false}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      </div>
      <div className="text-white flex justify-center mt-4">
        <Link to="/signup">
          <p className="text-md text-shadow font-bold transition ease-in-out delay-150">
            Already have an account? Sign Up
          </p>
        </Link>
      </div>
    </>
  );
};

export default LoginPage;
