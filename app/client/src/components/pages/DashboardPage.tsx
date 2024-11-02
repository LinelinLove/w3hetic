import Search from "../molecules/Search";
import Download from "../molecules/Download";
import Logo from "../atoms/Logo";
import { useAuth } from "../../context/useAuth";
import { useState, useEffect } from "react";

const DashboardPage = () => {
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

  const handleButtonClick = () => {
    console.log("Button clicked!");
  };
  return (
    <div className="m-3">
      <div className="text-white text-shadow py-4 pb-12 flex flex-col justify-center items-center gap-2">
        <h1 className="text-3xl font-bold break-all">
          Welcome {user ? user.username : ""} !
        </h1>
        <h2 className="text-md font-semibold">
          Memory used:{" "}
          {memoryUsed !== null
            ? `${(memoryUsed / 1024 ** 3).toFixed(2)} / 2.00 GB`
            : "Loading..."}
        </h2>
      </div>

      <div className="flex flex-row items-center gap-8">
        <div className="flex flex-col gap-12 w-full md:w-1/2">
          <div className="bg-white rounded-lg p-1">
            <Search
              linkText="Already have a link ?"
              inputLabel="Add the link here..."
              onButtonClick={handleButtonClick}
            />
          </div>

          <div className="bg-white rounded-lg p-1">
            <Download
              linkText="Want to add a file ?"
              inputLabel="Add the file here..."
              onButtonClick={handleButtonClick}
            />
          </div>
        </div>

        <div className="text-shadow md:flex flex-col gap-16 w-1/2 hidden">
          <Logo size="w-32 md:w-96" alignment="left" />

          <div className="flex flex-col gap-3">
            <h2 className="text-5xl font-black">Simplifying File Sharing</h2>
            <p className=" text-2xl font-semibold">
              <span className="font-black text-gray-200 text-3xl">W3HETIC</span>{" "}
              streamlines file sharing with a user-friendly interface for quick
              and easy transfers fort students.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
