import React, { useState } from "react";

interface DropdownProps {
  items: { key: string; value: string }[];
  label?: string | undefined;
  onSelect?: (key: string, value: string) => void;
  className?: string;
}

const DropdownButton: React.FC<DropdownProps> = ({
  items,
  label,
  onSelect,
  className
}) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(
    items ? items[0]!.key : null
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleItemClick = (key: string, value: string) => {
    setSelectedItem(key);
    setIsOpen(false);
    if (onSelect) onSelect(key, value);
  };

  return (
    <div className={`relative inline-block text-left ${className}`}>
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedItem || (label ?? "Select an Option")}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {items.map((item) => (
              <button
                key={item.key}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                onClick={() => handleItemClick(item.key, item.value)}
              >
                {item.key}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
