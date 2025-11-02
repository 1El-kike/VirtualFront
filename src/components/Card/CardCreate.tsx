import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Select, SelectItem, Checkbox, Textarea, Card, CardHeader, CardBody, Divider } from '@heroui/react';
import type { HousePreferences } from '../../types';

const CardCreate: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<HousePreferences>();

    const onSubmit = (data: HousePreferences) => {
        // Crear el objeto completo con id y fecha
        const completeData: HousePreferences = {
            ...data,
            id: crypto.randomUUID(),
            createdAt: new Date()
        };

        // Guardar en localStorage
        const existingCards = localStorage.getItem('housePreferences');
        const cards = existingCards ? JSON.parse(existingCards) : [];
        cards.push(completeData);
        localStorage.setItem('housePreferences', JSON.stringify(cards));

        // Aquí puedes enviar los datos a tu API también
        alert('¡Ficha guardada exitosamente!');

        // Resetear el formulario
        // reset();
    };

    const propertyTypes = [
        { key: 'house', label: 'Casa' },
        { key: 'apartment', label: 'Apartamento' },
        { key: 'townhouse', label: 'Casa adosada' },
        { key: 'condo', label: 'Condominio' },
        { key: 'other', label: 'Otro' }
    ];

    const orientations = [
        { key: 'north', label: 'Norte' },
        { key: 'south', label: 'Sur' },
        { key: 'east', label: 'Este' },
        { key: 'west', label: 'Oeste' },
        { key: 'any', label: 'Cualquiera' }
    ];

    const timelines = [
        { key: 'immediate', label: 'Inmediato' },
        { key: '3months', label: '3 meses' },
        { key: '6months', label: '6 meses' },
        { key: '1year', label: '1 año' },
        { key: 'flexible', label: 'Flexible' }
    ];

    const financingOptions = [
        { key: 'cash', label: 'Efectivo' },
        { key: 'mortgage', label: 'Hipoteca' },
        { key: 'other', label: 'Otro' }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Card className="w-full">
                    <CardHeader className="flex justify-around">
                        <h1 className="text-3xl font-bold text-gray-900">Crea tu Casa Ideal</h1>
                        <p className="text-gray-600 mt-2">Cuéntanos tus preferencias para encontrar la propiedad perfecta</p>
                    </CardHeader>
                    <CardBody>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                            {/* Información Personal */}
                            <div className="space-y-6">
                                <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">Información Personal</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        label="Nombre completo"
                                        placeholder="Tu nombre"
                                        {...register('name', { required: 'El nombre es requerido' })}
                                        errorMessage={errors.name?.message}
                                        isInvalid={!!errors.name}
                                    />
                                    <Input
                                        label="Correo electrónico"
                                        type="email"
                                        placeholder="tu@email.com"
                                        {...register('email', { required: 'El email es requerido' })}
                                        errorMessage={errors.email?.message}
                                        isInvalid={!!errors.email}
                                    />
                                </div>
                                <Input
                                    label="Teléfono (opcional)"
                                    placeholder="+1234567890"
                                    {...register('phone')}
                                />
                            </div>

                            <Divider />

                            {/* Preferencias Básicas */}
                            <div className="space-y-6">
                                <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">Preferencias Básicas</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Select
                                        label="Tipo de propiedad"
                                        placeholder="Selecciona el tipo"
                                        {...register('propertyType', { required: 'Selecciona un tipo de propiedad' })}
                                        errorMessage={errors.propertyType?.message}
                                        isInvalid={!!errors.propertyType}
                                    >
                                        {propertyTypes.map((type) => (
                                            <SelectItem key={type.key}>
                                                {type.label}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                    <Input
                                        label="Ubicación preferida"
                                        placeholder="Ciudad, barrio o zona"
                                        {...register('location', { required: 'La ubicación es requerida' })}
                                        errorMessage={errors.location?.message}
                                        isInvalid={!!errors.location}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        label="Presupuesto mínimo"
                                        type="number"
                                        placeholder="0"
                                        {...register('budgetMin', { required: 'Presupuesto mínimo requerido', valueAsNumber: true })}
                                        errorMessage={errors.budgetMin?.message}
                                        isInvalid={!!errors.budgetMin}
                                    />
                                    <Input
                                        label="Presupuesto máximo"
                                        type="number"
                                        placeholder="0"
                                        {...register('budgetMax', { required: 'Presupuesto máximo requerido', valueAsNumber: true })}
                                        errorMessage={errors.budgetMax?.message}
                                        isInvalid={!!errors.budgetMax}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        label="Habitaciones"
                                        type="number"
                                        placeholder="0"
                                        {...register('bedrooms', { required: 'Número de habitaciones requerido', valueAsNumber: true })}
                                        errorMessage={errors.bedrooms?.message}
                                        isInvalid={!!errors.bedrooms}
                                    />
                                    <Input
                                        label="Baños"
                                        type="number"
                                        placeholder="0"
                                        {...register('bathrooms', { required: 'Número de baños requerido', valueAsNumber: true })}
                                        errorMessage={errors.bathrooms?.message}
                                        isInvalid={!!errors.bathrooms}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        label="Superficie mínima (m²)"
                                        type="number"
                                        placeholder="0"
                                        {...register('minSqm', { required: 'Superficie mínima requerida', valueAsNumber: true })}
                                        errorMessage={errors.minSqm?.message}
                                        isInvalid={!!errors.minSqm}
                                    />
                                    <Input
                                        label="Superficie máxima (m²)"
                                        type="number"
                                        placeholder="0"
                                        {...register('maxSqm', { required: 'Superficie máxima requerida', valueAsNumber: true })}
                                        errorMessage={errors.maxSqm?.message}
                                        isInvalid={!!errors.maxSqm}
                                    />
                                </div>
                            </div>

                            <Divider />

                            {/* Preferencias Intermedias */}
                            <div className="space-y-6">
                                <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">Preferencias Intermedias</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Select
                                        label="Orientación preferida"
                                        placeholder="Selecciona orientación"
                                        {...register('orientation')}
                                    >
                                        {orientations.map((orientation) => (
                                            <SelectItem key={orientation.key}>
                                                {orientation.label}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                    <Input
                                        label="Piso preferido"
                                        type="number"
                                        placeholder="0 (opcional)"
                                        {...register('floor', { valueAsNumber: true })}
                                    />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Estilo arquitectónico</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {['Moderno', 'Clásico', 'Minimalista', 'Industrial', 'Rústico', 'Contemporáneo'].map((style) => (
                                            <Checkbox
                                                key={style}
                                                value={style}
                                                {...register('architecturalStyle')}
                                            >
                                                {style}
                                            </Checkbox>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Características deseadas</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {['Jardín', 'Terraza', 'Garaje', 'Piscina', 'Gimnasio', 'Estudio', 'Bodega', 'Cuarto de servicio'].map((feature) => (
                                            <Checkbox
                                                key={feature}
                                                value={feature}
                                                {...register('features')}
                                            >
                                                {feature}
                                            </Checkbox>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <Divider />

                            {/* Preferencias Avanzadas */}
                            <div className="space-y-6">
                                <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">Preferencias Avanzadas</h2>
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Materiales de construcción</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {['Madera', 'Concreto', 'Ladrillo', 'Vidrio', 'Acero', 'Piedra'].map((material) => (
                                            <Checkbox
                                                key={material}
                                                value={material}
                                                {...register('constructionMaterials')}
                                            >
                                                {material}
                                            </Checkbox>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Tecnología y domótica</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {['Iluminación inteligente', 'Sistema de seguridad', 'Climatización inteligente', 'Asistente virtual', 'Carga eléctrica para autos', 'Paneles solares'].map((tech) => (
                                            <Checkbox
                                                key={tech}
                                                value={tech}
                                                {...register('technology')}
                                            >
                                                {tech}
                                            </Checkbox>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Sostenibilidad</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {['Certificación LEED', 'Energía renovable', 'Aislamiento térmico', 'Reciclaje de agua', 'Materiales ecológicos', 'Eficiencia energética'].map((sustain) => (
                                            <Checkbox
                                                key={sustain}
                                                value={sustain}
                                                {...register('sustainability')}
                                            >
                                                {sustain}
                                            </Checkbox>
                                        ))}
                                    </div>
                                </div>
                                <Textarea
                                    label="Personalizaciones adicionales"
                                    placeholder="Describe cualquier requerimiento especial o personalización que tengas en mente..."
                                    {...register('customizations')}
                                    minRows={3}
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Select
                                        label="Plazo de búsqueda"
                                        placeholder="Selecciona un plazo"
                                        {...register('timeline')}
                                    >
                                        {timelines.map((timeline) => (
                                            <SelectItem key={timeline.key}>
                                                {timeline.label}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                    <Select
                                        label="Tipo de financiamiento"
                                        placeholder="Selecciona opción"
                                        {...register('financing')}
                                    >
                                        {financingOptions.map((financing) => (
                                            <SelectItem key={financing.key}>
                                                {financing.label}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>
                            </div>

                            <Divider />

                            <div className="flex justify-center">
                                <Button
                                    type="submit"
                                    color="primary"
                                    size="lg"
                                    className="px-8 py-3 text-lg font-semibold"
                                >
                                    Crear mi Perfil de Casa Ideal
                                </Button>
                            </div>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default CardCreate;