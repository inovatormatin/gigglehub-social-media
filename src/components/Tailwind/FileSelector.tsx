import React from "react";

interface Fprops {
  require?: boolean;
  placeholder: string;
  name: string;
  value: File | null | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const FileInput: React.FC<Fprops> = ({
  name,
  require,
  placeholder,
  value,
  onChange,
  error,
}) => {
  const labelText = require ? `${placeholder} *` : placeholder;

  return (
    <div className="w-full min-w-[400px] mb-4 mx-1">
      <label htmlFor={name} className="text-slate-700 text-xs mb-1 ml-2">
        {labelText}
      </label>
      <input
        id={name}
        type="file"
        name={name}
        accept="image/*"
        onChange={onChange}
        className="w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
      />
      {error && (
        <p className="text-red-500 text-xs my-1 ml-2 font-medium">{error}</p>
      )}
    </div>
  );
};

export default FileInput;
