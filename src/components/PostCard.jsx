import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StorageService from "../appwrite/storageService";

function PostCard({ $id, title, featuredImage, content }) {
  const [textContent, setTextContent] = useState('');
  useEffect(() => {
    const htmlContent = `${content}`;
    // Create a temporary element to parse the HTML content
    const tempElement = document.createElement("div");
    tempElement.innerHTML = htmlContent;

    // Extract the text content
    setTextContent(tempElement.innerText);
  }, []);

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-white rounded-xl border-2 border-gray-300">
        <div className="w-full justify-center mb-4">
          <img
            src={StorageService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl object-cover h-50 w-full"
          />
        </div>
        <h3 className="font-inter-bold text-start text-sm text-orange-600 ms-4 me-4">
          BLOGS
        </h3>
        <h2 className="font-inter-bold text-start text-xl ms-4 me-4 py-2">
          {title}
        </h2>
        <p className="font-inter-regular text-start text-sm text-gray-600 ms-4 me-4 mb-4">
          {textContent.substring(0, 100)}...
        </p>
      </div>
    </Link>
  );
}

export default PostCard;
