import FileDetails from "../molecules/FileDetails";

const MyFilesPage = () => {
  return (
    <div>
      <div className="bg-white rounded-lg text-black p-2 m-4 flex flex-col justify-center items-center">
        <h1 className="text-3xl uppercase font-bold">My files</h1>
        <div>Memory left : X.XX Go</div>
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
