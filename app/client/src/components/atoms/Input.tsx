import React from "react";

interface InputProps {
  label: string;
  typeInput: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ label, typeInput, value, onChange }) => {
  return (
    <div>
      <input
        type={typeInput}
        className="bg-white border border-emerald-800 text-black text-sm rounded-lg focus:ring-emerald-800 focus:border-emerald-800 focus:outline-emerald-800 block p-2.5 w-full"
        placeholder={label}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default Input;
