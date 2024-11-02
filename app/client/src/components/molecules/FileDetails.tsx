import {
  faTrash,
  faFileZipper,
  faLink,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteFile } from "../../utils/files";

interface FileDetailsProps {
  fileName: string;
  uploadDate: string;
  fileId: number;
  onDelete: (fileId: number) => void;
}

const FileDetails: React.FC<FileDetailsProps> = ({
  fileName,
  uploadDate,
  fileId,
  onDelete,
}) => {
  const handleDelete = async () => {
    try {
      const result = await deleteFile(fileId);
      onDelete(fileId);
    } catch (error) {
      console.error("Failed to delete file:", error);
    }
  };
  return (
    <div className="flex flex-col gap-1 sm:gap-4 items-center justify-between p-4 rounded-lg bg-white/85 hover:bg-white/95 transition ease-in-out delay-50 sm:flex-row">
      <div className="flex flex-row gap-2 items-start">
        <FontAwesomeIcon icon={faFileZipper} className="pt-1" />
        <p className="break-all">
          {fileId} {fileName}
        </p>
      </div>
      <div className="flex flex-row items-center gap-1 sm:gap-4 w-full sm:w-auto">
        <div className="flex-grow sm:flex-grow-0 text-center">{uploadDate}</div>
        <FontAwesomeIcon
          icon={faLink}
          className="hover:text-blue-500 cursor-pointer transition ease-in-out delay-50"
        />
        <FontAwesomeIcon
          icon={faDownload}
          className="hover:text-emerald-600 cursor-pointer transition ease-in-out delay-50"
        />
        <FontAwesomeIcon
          icon={faTrash}
          className="hover:text-red-600 cursor-pointer transition ease-in-out delay-50"
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};

export default FileDetails;
