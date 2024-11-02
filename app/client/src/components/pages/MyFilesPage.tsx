import FileDetails from "../molecules/FileDetails";
import { useAuth } from "../../context/useAuth";
import { useState, useEffect } from "react";
import { getFilenames, deleteFile } from "../../utils/files";

const MyFilesPage = () => {
  const { user, uploadSize } = useAuth();
  const [memoryUsed, setMemoryUsed] = useState<number | null>(null);
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUploadSize = async () => {
      if (user) {
        const size = await uploadSize(user.id);
        if (size !== false) {
          setMemoryUsed(size);
        }
      }
    };

    const fetchFiles = async () => {
      setLoading(true);
      setMessage(null);
      if (user) {
        try {
          const result = await getFilenames(user.id);
          if (result && result.message) {
            setMessage(result.message);
            setFiles([]);
          } else {
            setFiles(result);
          }
        } catch (err) {
          setMessage("Failed to fetch files.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchFiles();
    fetchUploadSize();
  }, [user, uploadSize]);

  const handleDelete = async (fileId) => {
    console.log("Trying to delete file with ID:", fileId);

    const updatedFiles = files.filter((file) => file.id !== fileId);
    setFiles(updatedFiles);

    try {
      await deleteFile(fileId);
    } catch (error) {
      console.error("Failed to delete file:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (message) return <p>{message}</p>;

  return (
    <div>
      <div className="bg-white rounded-lg text-black p-2 m-4 flex flex-col justify-center items-center">
        <h1 className="text-3xl uppercase font-bold">My files</h1>
        <div>
          Memory used:{" "}
          {memoryUsed !== null
            ? `${(memoryUsed / 1024 ** 3).toFixed(2)} / 2.00 GB`
            : "0.00 / 2.00 GB"}
        </div>
      </div>

      <div className="text-black m-4 flex flex-col gap-4">
        {files.length > 0 ? (
          files.map((file) => (
            <FileDetails
              key={file.id}
              fileName={file.file_name}
              fileId={file.id}
              uploadDate={new Date(file.uploaded_at).toLocaleDateString()}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p className="bg-white/85 w-full text-center text-black p-4 rounded-lg">
            No file uploaded for now.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyFilesPage;
