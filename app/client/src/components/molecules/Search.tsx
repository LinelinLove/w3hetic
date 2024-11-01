import React from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

interface LinkInputComponentProps {
  linkText: string;
  inputLabel: string;
  onButtonClick: () => void;
}

const Search: React.FC<LinkInputComponentProps> = ({
  linkText,
  inputLabel,
  onButtonClick,
}) => {
  return (
    <div className="flex flex-col p-2 gap-2">
      <p className="text-black font-bold">{linkText}</p>
      <div className="flex flex-row items-center gap-2">
        <div className="w-full">
          <Input label={inputLabel} typeInput="text" />
        </div>
        <div>
          <Button label={"GO"} onClick={onButtonClick} />
        </div>
      </div>
    </div>
  );
};

export default Search;
