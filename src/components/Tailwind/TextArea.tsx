import React from "react";

interface TextareaProps {
  name: string;
  require?: boolean;
  lable: string;
  placeholder: string;
  value: string | undefined;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  rows?: number;
}

const Textarea: React.FC<TextareaProps> = ({
  name,
  require,
  lable,
  placeholder,
  value,
  onChange,
  error,
  rows = 3, // Default rows for the textarea
}) => {
  const labelText = require ? `${lable} *` : lable;
  const placeholderText = require ? `${placeholder} *` : placeholder;

  return (
    <div className="w-full min-w-[300px] mb-2">
      <label htmlFor={name} className="text-slate-700 text-xs mb-1 ml-2">
        {labelText}
      </label>
      <textarea
        id={name}
        name={name}
        placeholder={placeholderText}
        value={value}
        onChange={onChange}
        rows={rows}
        className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
      ></textarea>
      {error && (
        <p className="text-red-500 text-xs my-1 ml-2 font-medium">{error}</p>
      )}
    </div>
  );
};

export default Textarea;
