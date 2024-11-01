import React from "react";

interface LogoProps {
  size?: string;
  alignment?: string;
}

const Logo: React.FC<LogoProps> = ({ size, alignment }) => {
  const alignmentClass = alignment
    ? `text-${alignment}`
    : "flex justify-center";

  return (
    <div className={`${alignmentClass} items-center w-full`}>
      <img
        src="src/assets/w3hetic-logo.svg"
        alt="logo w3Hetic"
        className={`drop-shadow-[0_5px_5px_rgba(0,0,0,0.9)] ${
          size ? size : "w-64 sm:w-[250px]"
        }`}
      />
    </div>
  );
};

export default Logo;
