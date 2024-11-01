import React from "react";
import Button from "../atoms/Button";
import DragDropFile from "../atoms/DragDropFile";

interface LinkInputComponentProps {
  linkText: string;
  inputLabel: string;
  onButtonClick: () => void;
}

const Download: React.FC<LinkInputComponentProps> = ({
  linkText,
  onButtonClick,
}) => {
  return (
    <div className="flex flex-col p-2 gap-2">
      <p className="text-black font-bold">{linkText}</p>
      <div className="flex flex-row items-center gap-2">
        <div className="w-full">
          <DragDropFile />
        </div>
        <div>
          <Button label={"GO"} onClick={onButtonClick} />
        </div>
      </div>
    </div>
  );
};

export default Download;
