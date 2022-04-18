import { ButtonHTMLAttributes } from "react";

const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => {
  return (
    <button
      type="button"
      className="ml-auto text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
