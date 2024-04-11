import React, { HTMLAttributes } from "react";

type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode | React.ReactNode[];
};

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      className="bg-black rounded-lg text-white px-5 py-2
    font-medium transition hover:bg-opacity-65 hover:shadow-md"
    >
      {props.children}
    </button>
  );
};

export default Button;
