import React from "react";

interface Fprops {
  type: string;
  require?: boolean;
  placeholder: string;
  lable: string;
  name: string;
  value: string | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const Input: React.FC<Fprops> = ({
  name,
  type,
  require,
  lable,
  placeholder,
  value,
  onChange,
  error,
}) => {
  const labelText = require ? `${lable} *` : lable;
  const placeholderText = require ? `${placeholder} *` : placeholder;

  return (
    <div className="w-full min-w-[300px] mb-4 mx-1">
      <label htmlFor={name} className="text-slate-700 text-xs mb-1 ml-2">
        {labelText}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholderText}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
      />
      {error && (
        <p className="text-red-500 text-xs my-1 ml-2 font-medium">{error}</p>
      )}
    </div>
  );
};

export default Input;
