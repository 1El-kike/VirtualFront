import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import type { BlogPost } from '../types';
import BlogCard from '../components/BlogCard';

const Blog: React.FC = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const postsPerPage = 9;

    const { data: posts, isLoading, error } = useQuery({
        queryKey: ['blog-posts'],
        queryFn: async () => {
            const response = await api.get('/blog-posts');
            return response.data as BlogPost[];
        },
    });

    const publishedPosts = posts?.filter(post => post.published) || [];
    const totalPages = Math.ceil(publishedPosts.length / postsPerPage);
    const startIndex = (page - 1) * postsPerPage;
    const paginatedPosts = publishedPosts.slice(startIndex, startIndex + postsPerPage);

    const handleCardClick = (id: number) => {
        navigate(`/blog/${id}`);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-xl">Cargando artículos...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-xl text-red-500">Error al cargar los artículos.</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 opacity-0 animate-fade-in">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center mb-8">Blog</h1>
                {publishedPosts.length === 0 ? (
                    <div className="text-center text-lg text-gray-600">
                        No hay artículos publicados aún.
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {paginatedPosts.map((post) => (
                                <BlogCard
                                    key={post.id}
                                    post={post}
                                    onClick={() => handleCardClick(post.id)}
                                />
                            ))}
                        </div>
                        {totalPages > 1 && (
                            <div className="flex justify-center space-x-4">
                                <button
                                    onClick={() => setPage(page - 1)}
                                    disabled={page === 1}
                                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                                >
                                    Anterior
                                </button>
                                <span className="px-4 py-2">
                                    Página {page} de {totalPages}
                                </span>
                                <button
                                    onClick={() => setPage(page + 1)}
                                    disabled={page === totalPages}
                                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                                >
                                    Siguiente
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Blog;