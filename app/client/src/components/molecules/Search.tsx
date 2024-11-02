import React, { useState } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

interface LinkInputComponentProps {
  linkText: string;
  inputLabel: string;
  onButtonClick: (url: string) => void;
}

const Search: React.FC<LinkInputComponentProps> = ({
  linkText,
  inputLabel,
  onButtonClick,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleButtonClick = () => {
    onButtonClick(inputValue);
  };
  return (
    <div className="flex flex-col p-2 gap-2">
      <p className="text-black font-bold">{linkText}</p>
      <div className="flex flex-row items-center gap-2">
        <div className="w-full">
          <Input
            label={inputLabel}
            typeInput="text"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Button label={"GO"} onClick={handleButtonClick} />
        </div>
      </div>
    </div>
  );
};

export default Search;
