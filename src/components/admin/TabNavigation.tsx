import React from 'react';

interface Tab {
    key: string;
    label: string;
}

interface TabNavigationProps {
    tabs: Tab[];
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
    tabs,
    activeTab,
    onTabChange
}) => {
    return (
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 pb-4">
            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    onClick={() => onTabChange(tab.key)}
                    className={`px-6 py-2 rounded-md font-medium transition-colors ${activeTab === tab.key
                            ? 'bg-blue-500 text-white'
                            : 'text-gray-600 hover:text-blue-500 hover:bg-gray-100'
                        }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};