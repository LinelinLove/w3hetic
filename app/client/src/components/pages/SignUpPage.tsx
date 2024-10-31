import { FormEvent, useState } from "react";
import Logo from "../atoms/Logo";
import Title from "../atoms/Title";
import Form from "../molecules/Form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    await signup(username, email, password);
    navigate("/");
  };

  return (
    <>
      <div className="pt-24 px-4">
        <Title label={"Sign-up"} />
        <Form handleSubmit={handleSignUp} showUsername={true} />

        <div className="text-white flex justify-center mt-4">
          <Link to="/login">
            <p className="text-md text-shadow font-bold transition ease-in-out delay-150">
              No account? Sign up
            </p>
          </Link>
        </div>

        <div className="flex justify-center mt-8">
          <Logo />
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
