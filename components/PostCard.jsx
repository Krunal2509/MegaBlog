import React from "react";
import appwriteService from "../src/appwrite/config";
import { Link } from "react-router";

function PostCard({ $id, title, featuredImg }) {
  return (
    <Link to={`/post/${$id}`} className="block">
      <div className="w-[260px] bg-gray-500 rounded-xl p-4">
        
        {featuredImg && (
          <img
            src={appwriteService.getFilePreview(featuredImg)}
            alt={title}
            className="w-full h-[140px] object-cover rounded-lg"
          />
        )}

        <h2 className="mt-3 text-lg font-bold text-white line-clamp-2">
          {title}
        </h2>

      </div>
    </Link>
  );
}

export default PostCard;
