import React, { useState, ReactNode } from "react";

interface Tab {
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <div className="w-full mt-10">
      <div className="flex space-x-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`py-2 px-4 ${activeTabIndex === index ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} rounded-2xl`}
            onClick={() => setActiveTabIndex(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">{tabs[activeTabIndex]!.content}</div>
    </div>
  );
};

export default Tabs;
