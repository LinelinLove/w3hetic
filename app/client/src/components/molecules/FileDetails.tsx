import {
  faTrash,
  faFileZipper,
  faLink,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteFile, generateLink } from "../../utils/files";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";

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
  const [downloadLink, setDownloadLink] = useState<string | null>(null);

  const handleDelete = async () => {
    try {
      await deleteFile(fileId);
      onDelete(fileId);
    } catch (error) {
      console.error("Failed to delete file:", error);
    }
  };

  const handleCopyLink = async () => {
    try {
      const result = await generateLink(fileId);
      const link = result;
      setDownloadLink(link);
      console.log(link);
    } catch (error) {
      console.error("Failed to generate link:", error);
      alert("Failed to generate download link.");
    }
  };

  return (
    <div className="flex flex-col gap-1 sm:gap-4 items-center justify-between p-4 rounded-lg bg-white/85 hover:bg-white/95 transition ease-in-out delay-50 sm:flex-row">
      <div className="flex flex-row gap-2 items-start">
        <FontAwesomeIcon icon={faFileZipper} className="pt-1" />
        <p className="break-all">{fileName}</p>
      </div>
      <div className="flex flex-row items-center gap-1 sm:gap-4 w-full sm:w-auto">
        <div className="flex-grow sm:flex-grow-0 text-center">{uploadDate}</div>
        <CopyToClipboard text={downloadLink || ""} onCopy={() => ""}>
          <FontAwesomeIcon
            icon={faLink}
            className="hover:text-blue-500 cursor-pointer transition ease-in-out delay-50"
            onClick={handleCopyLink}
          />
        </CopyToClipboard>
        {/* <FontAwesomeIcon
          icon={faDownload}
          className="hover:text-emerald-600 cursor-pointer transition ease-in-out delay-50"
        /> */}
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
