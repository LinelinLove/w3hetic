import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { FormEvent } from "react";

interface FormProps {
  handleSubmit: (e: FormEvent) => Promise<void> | void;
  showUsername?: boolean;
}

const Form: React.FC<FormProps> = ({ handleSubmit, showUsername }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="px-8 py-6 lg:max-w-sm m-auto bg-white flex flex-col items-center rounded-lg"
    >
      <div className="flex flex-col gap-4 pb-6 w-full">
        {showUsername && (
          <Input typeInput="text" label="Username" />
        )}
        <Input typeInput="email" label="E-mail" />
        <Input typeInput="password" label="Password" />
      </div>
      <Button label="GO" />
    </form>
  );
};

export default Form;
