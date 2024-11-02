import { faTrash, faFileZipper } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface FileDetailsProps {
  fileName: string;
  uploadDate: string;
}

const FileDetails: React.FC<FileDetailsProps> = ({ fileName, uploadDate }) => {
  return (
    <div className="flex flex-col gap-1 sm:gap-4 items-center justify-between p-4 rounded-lg bg-white/85 hover:bg-white/95 transition ease-in-out delay-50 sm:flex-row">
      <div className="flex flex-row gap-2 items-start">
        <FontAwesomeIcon icon={faFileZipper} className="pt-1" />
        <p className="break-all">{fileName}</p>
      </div>
      <div className="flex flex-row items-center sm:gap-4 w-full sm:w-auto">
        <div className="flex-grow sm:flex-grow-0 text-center">{uploadDate}</div>
        <FontAwesomeIcon
          icon={faTrash}
          className="hover:text-red-600 cursor-pointer transition ease-in-out delay-50"
        />
      </div>
    </div>
  );
};

export default FileDetails;
