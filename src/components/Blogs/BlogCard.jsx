import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ image, date, title, description, author }) => {
  return (
    <Link to={`/blogs`}>
      <div className="object-contain rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl">
        <img
          src={image}
          alt={title}
          className="h-64 w-full object-fill transition-transform duration-300 scale-105 hover:scale-110"
        />
        <div className="p-4 bg-white">
          <div className="flex justify-between text-sm text-gray-500">
            <p>{date}</p>
            <p>by {author}</p>
          </div>
          <h2 className="mt-2 text-lg font-semibold text-gray-800">{title}</h2>
          <p className="mt-2 text-gray-600 text-justify">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
