import React from "react";
import Button from "../atoms/Button";

const LoginPage = () => {
  return (
    <>
      <div>LoginPage</div>
      <Button
        label={"Login"}
        onClick={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </>
  );
};

export default LoginPage;
