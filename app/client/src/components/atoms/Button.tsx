import React from "react";

interface ButtonProps {
  label: string;
}

const Button: React.FC<ButtonProps> = ({ label }) => {
  return (
    <>
      <button className="p-3.5 sm:p-6 bg-emerald-800 text-white ring-emerald-300 ring-offset-2 font-semibold rounded-full hover:bg-emerald-300 hover:text-emerald-800 transition ease-in-out delay-150">
        {label}
      </button>
    </>
  );
};

export default Button;
