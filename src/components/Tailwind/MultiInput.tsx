import React, { useState } from "react";

interface MultiInputProps {
  type: "tags" | "mentions"; // Determines the behavior
  placeholder: string;
  name: string;
  labelText: string;
  onUpdate: (items: string[]) => void; // Callback to send the array of items
}

const MultiInput: React.FC<MultiInputProps> = ({ name, labelText, type, placeholder, onUpdate }) => {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim()) {
      event.preventDefault();
      if (!items.includes(inputValue.trim())) {
        const newItems = [...items, inputValue.trim()];
        setItems(newItems);
        onUpdate(newItems); // Pass updated array to parent
      }
      setInputValue("");
    }
  };

  const handleRemoveItem = (item: string) => {
    const updatedItems = items.filter((i) => i !== item);
    setItems(updatedItems);
    onUpdate(updatedItems); // Pass updated array to parent
  };

  return (
    <div className="w-full min-w-[300px]">
      <label htmlFor={name} className="text-slate-700 text-xs mb-1 ml-2">
        {labelText}
      </label>
      <div className="flex flex-wrap items-center border border-slate-200 rounded-md px-2 py-1 shadow-sm">
        {/* this will show the entered value */}
        {items.map((item, index) => (
          <span
            key={index}
            className="bg-slate-300 font-semibold text-xl text-slate-700 text-xs px-2 py-1 rounded-md m-1 flex items-center"
          >
            {type === "tags" ? `#${item}` : `@${item}`}
            <button
              type="button"
              onClick={() => handleRemoveItem(item)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </span>
        ))}
        <input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm px-2 py-1 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default MultiInput;
