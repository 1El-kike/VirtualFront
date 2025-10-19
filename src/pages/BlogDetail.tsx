import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import api from '../utils/api';
import type { BlogPost } from '../types';

const BlogDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: post, isLoading, error } = useQuery({
        queryKey: ['blog-post', id],
        queryFn: async () => {
            const response = await api.get(`/blog-posts/${id}`);
            return response.data as BlogPost;
        },
        enabled: !!id,
    });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-xl">Cargando artículo...</div>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-xl text-red-500">Artículo no encontrado.</div>
            </div>
        );
    }

    const formattedDate = new Date(post.createdAt).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="min-h-screen bg-gray-100 opacity-0 animate-fade-in">
            <Helmet>
                <title>{post.title} - Blog Inmobiliaria Virtual</title>
                <meta name="description" content={post.content.substring(0, 160) + '...'} />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.content.substring(0, 160) + '...'} />
                <meta property="og:image" content={post.image || 'https://inmobiliariavirtual.com/default-blog.jpg'} />
                <meta property="og:url" content={`https://inmobiliariavirtual.com/blog/${post.id}`} />
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <button
                    onClick={() => navigate('/blog')}
                    className="mb-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline focus:outline-gray-500"
                    aria-label="Volver al blog"
                >
                    ← Volver al Blog
                </button>
                <article className="bg-white rounded-lg shadow-md p-8">
                    {post.image && (
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-64 object-cover rounded-lg mb-6"
                            loading="lazy"
                        />
                    )}
                    <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                    <div className="text-sm text-gray-600 mb-6">
                        <p>Por: {post.author.email}</p>
                        <p>Publicado el: {formattedDate}</p>
                    </div>
                    <div className="prose prose-lg max-w-none">
                        {post.content.split('\n').map((paragraph, index) => (
                            <p key={index} className="mb-4">{paragraph}</p>
                        ))}
                    </div>
                </article>
            </div>
        </div>
    );
};

export default BlogDetail;