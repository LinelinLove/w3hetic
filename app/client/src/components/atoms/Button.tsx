import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ onClick, label }) => {
  return (
    <><button
      onClick={onClick}
      className="p-6 bg-emerald-800 text-white ring-emerald-300 ring-offset-2 font-semibold rounded-full hover:bg-emerald-300 hover:text-emerald-800"
    >
      {label}
    </button>
    </>
  );
};

export default Button;
