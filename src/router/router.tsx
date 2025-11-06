import { HeroUIProvider } from "@heroui/react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "../App";
import { ProtectedRoute } from "./protectedRouter";
import { lazy } from "react";
import { SuspensedView } from "../widget/suspenseView";
import { Layout } from "../layout/Layout";

export const Router = () => {

    // Lazy load pages for code splitting
    const Home = lazy(() => import('../pages/Home'));
    const Properties = lazy(() => import('../pages/Properties'));
    const PropertyDetail = lazy(() => import('../pages/PropertyDetail'));
    const Contact = lazy(() => import('../pages/Contact'));
    const Blog = lazy(() => import('../pages/Blog'));
    const BlogDetail = lazy(() => import('../pages/BlogDetail'));
    const Login = lazy(() => import('../pages/Login'));
    const Register = lazy(() => import('../pages/Register'));
    const Admin = lazy(() => import('../pages/Admin'));
    const Card = lazy(() => import('../pages/Card'));
    const Profile = lazy(() => import('../pages/Profile'));
    const NotFound = lazy(() => import('../pages/NotFound'));

    return (
        <BrowserRouter basename={''}>
            {/* <ScrollToTop /> */}
            <HeroUIProvider >
                <Routes>
                    <Route element={<App />}>
                        <Route element={<Layout />}>

                            {/*   <Route path="error/*" element={<ErrorsPage />} /> */}
                            <Route element={<Navigate to="/" replace />} />
                            <Route
                                path="/"
                                element={
                                    <SuspensedView>
                                        <Home />
                                    </SuspensedView>
                                } />
                            <Route
                                path="/card/*"
                                element={
                                    <SuspensedView>
                                        <Card />
                                    </SuspensedView>
                                }
                            />
                            <Route
                                path="/properties"
                                element={
                                    <SuspensedView>
                                        <Properties />
                                    </SuspensedView>
                                }
                            />
                            <Route
                                path="/properties/:id"
                                element={
                                    <SuspensedView>
                                        <PropertyDetail />
                                    </SuspensedView>
                                } />
                            <Route
                                path="/contact"
                                element={
                                    <SuspensedView>
                                        <Contact />
                                    </SuspensedView>
                                } />
                            <Route
                                path="/blog"
                                element={
                                    <SuspensedView>
                                        <Blog />
                                    </SuspensedView>
                                } />
                            <Route
                                path="/blog/:id"
                                element={
                                    <SuspensedView>
                                        <BlogDetail />
                                    </SuspensedView>
                                } />
                            <Route
                                path="/profile"
                                element={
                                    <SuspensedView>
                                        <ProtectedRoute>
                                            <Profile />
                                        </ProtectedRoute>
                                    </SuspensedView>
                                } />
                            <Route
                                path="/admin"
                                element={
                                    <SuspensedView>
                                        <ProtectedRoute adminOnly>
                                            <Admin />
                                        </ProtectedRoute>
                                    </SuspensedView>
                                } />
                            <Route path="*" element={<NotFound />} />
                            <Route
                                path="/login"
                                element={
                                    <SuspensedView>
                                        <Login />
                                    </SuspensedView>
                                } />
                            <Route
                                path="/register"
                                element={
                                    <SuspensedView>
                                        <Register />
                                    </SuspensedView>
                                } />
                        </Route>
                    </Route>
                </Routes>
            </HeroUIProvider>
        </BrowserRouter>
    )
}
