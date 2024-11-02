import FileDetails from "../molecules/FileDetails";
import { useAuth } from "../../context/useAuth";
import { useState, useEffect } from "react";

const MyFilesPage = () => {
  const { user, uploadSize } = useAuth();
  const [memoryUsed, setMemoryUsed] = useState<number | null>(null);

  useEffect(() => {
    if (user) {
      uploadSize(user.id).then((size) => {
        if (size !== false) {
          setMemoryUsed(size);
        }
      });
    }
  }, [user, uploadSize]);
  return (
    <div>
      <div className="bg-white rounded-lg text-black p-2 m-4 flex flex-col justify-center items-center">
        <h1 className="text-3xl uppercase font-bold">My files</h1>
        <div>
          Memory used:{" "}
          {memoryUsed !== null
            ? `${(memoryUsed / 1024 ** 3).toFixed(2)} / 2.00 GB`
            : "Loading..."}
        </div>
      </div>

      <div className="text-black m-4 flex flex-col gap-4">
        <FileDetails />
        <FileDetails />
        <FileDetails />
        <FileDetails />
        <FileDetails />
        <FileDetails />
        <FileDetails />
        <FileDetails />
      </div>
    </div>
  );
};

export default MyFilesPage;
