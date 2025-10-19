import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface FiltersForm {
    location: string;
    minPrice: number;
    maxPrice: number;
    bedrooms: string;
    minSqm: number;
    maxSqm: number;
}

interface FiltersProps {
    onSubmit: (data: FiltersForm) => void;
    onClear: () => void;
}

const Filters: React.FC<FiltersProps> = ({ onSubmit, onClear }) => {
    const { register, handleSubmit, reset } = useForm<FiltersForm>();
    const [isOpen, setIsOpen] = useState(false);

    const handleFormSubmit = (data: FiltersForm) => {
        onSubmit(data);
    };

    const handleClear = () => {
        reset();
        onClear();
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden w-full text-left font-semibold text-lg mb-2"
            >
                Filtros {isOpen ? '▲' : '▼'}
            </button>
            <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className={`space-y-4 ${isOpen ? 'block' : 'hidden md:block'}`}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Ubicación</label>
                        <input
                            type="text"
                            {...register('location')}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Ej: Madrid"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Precio Mínimo</label>
                        <input
                            type="range"
                            min="0"
                            max="1000000"
                            step="10000"
                            {...register('minPrice', { valueAsNumber: true })}
                            className="w-full"
                        />
                        <span className="text-sm text-gray-600">€0 - €1,000,000</span>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Precio Máximo</label>
                        <input
                            type="range"
                            min="0"
                            max="1000000"
                            step="10000"
                            {...register('maxPrice', { valueAsNumber: true })}
                            className="w-full"
                        />
                        <span className="text-sm text-gray-600">€0 - €1,000,000</span>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Dormitorios</label>
                        <select {...register('bedrooms')} className="w-full p-2 border border-gray-300 rounded">
                            <option value="">Todos</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4+</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Mínimos m²</label>
                        <input
                            type="range"
                            min="0"
                            max="500"
                            step="10"
                            {...register('minSqm', { valueAsNumber: true })}
                            className="w-full"
                        />
                        <span className="text-sm text-gray-600">0 - 500 m²</span>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Máximos m²</label>
                        <input
                            type="range"
                            min="0"
                            max="500"
                            step="10"
                            {...register('maxSqm', { valueAsNumber: true })}
                            className="w-full"
                        />
                        <span className="text-sm text-gray-600">0 - 500 m²</span>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Aplicar Filtros
                    </button>
                    <button
                        type="button"
                        onClick={handleClear}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Limpiar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Filters;