import React from 'react';

interface ErrorStateProps {
    message?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
    message = "Ha ocurrido un error"
}) => {
    return (
        <div className="flex items-center justify-center py-12">
            <div className="text-center">
                <div className="text-red-500 text-4xl mb-4">⚠️</div>
                <p className="text-red-600 font-medium">{message}</p>
            </div>
        </div>
    );
};