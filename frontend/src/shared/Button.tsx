import React from "react";

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode | React.ReactNode[];
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      {...props}
      disabled={props.disabled}
      className={
        `bg-black rounded-lg text-white px-5 py-2
    font-medium transition enabled:hover:bg-opacity-65 enabled:hover:shadow-md disabled:bg-opacity-50 ` +
        props.className
      }
    >
      {props.children}
    </button>
  );
};

export default Button;
