import React from 'react';
import type { BlogPost } from '../types';
import { getImageUrl } from '../utils/imageHelper';

interface BlogCardProps {
    post: BlogPost;
    onClick: () => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, onClick }) => {
    const excerpt = post.content.length > 150 ? post.content.substring(0, 150) + '...' : post.content;
    const formattedDate = new Date(post.createdAt).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg opacity-0 animate-fade-in"
            onClick={onClick}
        >
            <img
                src={post.image ? getImageUrl(post.image) : '/placeholder-image.jpg'} // Placeholder si no hay imagen
                alt={post.title}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-2">{excerpt}</p>
                <p className="text-sm text-gray-500">{formattedDate}</p>
            </div>
        </div>
    );
};

export default BlogCard;