import React, { useState } from "react";
import Button from "../atoms/Button";
import DragDropFile from "../atoms/DragDropFile";
import { uploadFile } from "../../utils/uploadFile";

interface LinkInputComponentProps {
  linkText: string;
  user: { id: number };
  onButtonClick: () => void;
}

const Download: React.FC<LinkInputComponentProps> = ({
  linkText,
  user,
  onButtonClick,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    setSuccessMessage(null);
  };

  const handleButtonClick = async () => {
    console.log("coucou");
    if (selectedFile) {
      try {
        const data = await uploadFile(selectedFile, user.id);
        console.log("Upload response:", data);
        setSuccessMessage("Your file has been uploaded.");
      } catch (error) {
        console.error("Error during file upload:", error);
      }
    } else {
      console.error("No file selected");
    }
    onButtonClick();
  };

  return (
    <div className="flex flex-col p-2 gap-2">
      <p className="text-black font-bold">{linkText}</p>
      <div className="flex flex-row items-center gap-2">
        <div className="w-full">
          <DragDropFile onFileSelected={handleFileSelected} />
          {successMessage && (
            <p className="text-emerald-800 text-xs font-semibold mt-2">
              {successMessage}
            </p>
          )}
        </div>
        <div>
          <Button label={"GO"} onClick={handleButtonClick} />
        </div>
      </div>
    </div>
  );
};

export default Download;
