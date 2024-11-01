import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DragDropFile: React.FC = () => {
  const [fileName, setFileName] = useState<string | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".svg"],
      "application/zip": [".zip"],
    },
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setFileName(file.name);
        console.log(acceptedFiles);
      }
    },
  });

  return (
    <div className="text-black">
      <div
        {...getRootProps()}
        className="border-dashed border-2 p-2 cursor-pointer hover:bg-gray-100 group"
      >
        <input {...getInputProps()} />

        {isDragActive ? (
          <p>Drop your file here...</p>
        ) : (
          <div className="flex flex-row gap-2 items-center">
            <FontAwesomeIcon
              icon={faCirclePlus}
              className="text-4xl group-hover:text-emerald-800"
            />
            <p>
              <span className="font-bold">Add a file</span>
              <br />
              <span className="text-xs text-gray-400 underline">
                Or click to select a file
              </span>
            </p>
          </div>
        )}
        {fileName && (
          <p className="pt-2 text-xs">
            Name file : <span className="font-bold">{fileName}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default DragDropFile;
