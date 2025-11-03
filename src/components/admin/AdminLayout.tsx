import React from 'react';

interface AdminLayoutProps {
    title: string;
    children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ title, children }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="px-6 py-4 bg-blue-600">
                        <h1 className="text-2xl font-bold text-white">{title}</h1>
                    </div>
                    <div className="p-6">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};