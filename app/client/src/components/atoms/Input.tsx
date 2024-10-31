import React from "react";

interface InputProps {
  label: string;
}
const Input: React.FC<InputProps> = ({ label }) => {

  return (
    <div>
      
      <input
        type="text"
        className="bg-white border border-emerald-800 text-black text-sm rounded-lg focus:ring-emerald-800 focus:border-emerald-800 block w-full p-2.5"
        placeholder={label}
        required
      />
    </div>
  );
};

export default Input;
