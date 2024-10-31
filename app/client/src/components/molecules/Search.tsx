import React from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

const Search = () => {
  return (
    <div>
      <div className="flex flex-row items-center px-2 pb-4">
        <div className="w-4/5 pr-2 ">
          <Input label={"add a link"} typeInput="text" />
        </div>
        <div className="w-1/5">
          <Button
            label={"GO"}
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
      </div>

      <div>
        <div className="flex flex-row items-center px-2 pb-4">
          <div className="w-4/5 pr-2">
            <Input label={"add a file"} typeInput="text" />
          </div>
          <div className="w-1/5">
            <Button
              label={"GO"}
              onClick={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>
        </div>
      </div>



    </div>
  );
};

export default Search;
