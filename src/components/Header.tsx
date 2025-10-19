import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from '@heroui/react';
import { HomeIcon, BuildingStorefrontIcon, CreditCardIcon, PhoneIcon, DocumentTextIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon, UserPlusIcon, ArrowLeftOnRectangleIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import useAuth from '../contexts/AuthContext';

const Header: React.FC = () => {
    const { isAuthenticated, isAdmin, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const menuItems = [
        { label: "Inicio", href: "/", icon: HomeIcon },
        { label: "Propiedades", href: "/properties", icon: BuildingStorefrontIcon },
        { label: "Tarjetas", href: "/card", icon: CreditCardIcon },
        { label: "Contacto", href: "/contact", icon: PhoneIcon },
        { label: "Blog", href: "/blog", icon: DocumentTextIcon },
        ...(isAuthenticated ? [
            ...(isAdmin ? [{ label: "Admin", href: "/admin", icon: Cog6ToothIcon }] : []),
            { label: "Cerrar Sesión", action: handleLogout, icon: ArrowRightOnRectangleIcon }
        ] : [
            { label: "Iniciar Sesión", href: "/login", icon: ArrowLeftOnRectangleIcon },
            { label: "Registrarse", href: "/register", icon: UserPlusIcon }
        ])
    ];

    return (
        <Navbar
            isBordered
            className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg"
            onMenuOpenChange={setIsMenuOpen}
        >
            <NavbarBrand>
                <Link to="/" className="text-2xl font-bold text-white hover:text-blue-200 transition-colors">
                    CasaCuba
                </Link>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link to="/" className="text-white hover:text-blue-200 transition-colors">
                        Inicio
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link to="/properties" className="text-white hover:text-blue-200 transition-colors">
                        Propiedades
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link to="/card" className="text-white hover:text-blue-200 transition-colors">
                        Tarjetas
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link to="/contact" className="text-white hover:text-blue-200 transition-colors">
                        Contacto
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link to="/blog" className="text-white hover:text-blue-200 transition-colors">
                        Blog
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                {isAuthenticated ? (
                    <NavbarItem>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button variant="light" className="text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                                    <UserCircleIcon className="w-8 h-8" />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Acciones de cuenta">
                                <DropdownItem key="profile" onClick={() => navigate('/profile')}>
                                    Administrar Cuenta
                                </DropdownItem>
                                {isAdmin ? (
                                    <DropdownItem key="admin" onClick={() => navigate('/admin')}>
                                        Admin
                                    </DropdownItem>
                                ) : null}
                                <DropdownItem key="logout" onClick={handleLogout}>
                                    Cerrar Sesión
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarItem>
                ) : (
                    <>
                        <NavbarItem className="hidden sm:flex">
                            <Button as={Link} to="/login" variant="light" className="text-white">
                                Iniciar Sesión
                            </Button>
                        </NavbarItem>
                        <NavbarItem className="hidden sm:flex">
                            <Button as={Link} to="/register" color="primary" variant="solid">
                                Registrarse
                            </Button>
                        </NavbarItem>
                    </>
                )}
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                    className="sm:hidden text-white"
                />
            </NavbarContent>
            <NavbarMenu className="bg-gradient-to-b space-y-4 from-blue-700 to-blue-900 text-white">
                {menuItems.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                        <NavbarMenuItem key={`${item.label}-${index}`}>
                            {item.href ? (
                                <Link
                                    to={item.href}
                                    className="w-full flex items-center gap-3 text-white hover:text-blue-200 transition-colors py-3 px-4 rounded-lg hover:bg-blue-800"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <IconComponent className="w-5 h-5" />
                                    {item.label}
                                </Link>
                            ) : (
                                <button
                                    onClick={() => {
                                        item.action?.();
                                        setIsMenuOpen(false);
                                    }}
                                    className="w-full flex items-center gap-3 text-left text-white hover:text-blue-200 transition-colors py-3 px-4 rounded-lg hover:bg-blue-800"
                                >
                                    <IconComponent className="w-5 h-5" />
                                    {item.label}
                                </button>
                            )}
                        </NavbarMenuItem>
                    );
                })}
            </NavbarMenu>
        </Navbar>
    );
};

export default Header;