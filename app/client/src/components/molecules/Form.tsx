import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { FormEvent } from "react";

interface FormProps {
  handleSubmit: (e: FormEvent) => Promise<void> | void;
  showEmail?: boolean;
  username: string;
  email?: string;
  password: string;
  setUsername: (username: string) => void;
  setEmail?: (email: string) => void;
  setPassword: (password: string) => void;
}

export const Form: React.FC<FormProps> = ({
  handleSubmit,
  showEmail,
  username,
  email,
  password,
  setUsername,
  setEmail,
  setPassword,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="px-8 py-6 lg:max-w-sm m-auto bg-white flex flex-col items-center rounded-lg"
    >
      <div className="flex flex-col gap-4 pb-6 w-full">
        {showEmail && setEmail && (
          <Input
            typeInput="email"
            label="E-mail"
            value={email || ""}
            onChange={(e) => setEmail && setEmail(e.target.value)}
          />
        )}
        <Input
          typeInput="text"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          typeInput="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button label="GO" />
    </form>
  );
};
