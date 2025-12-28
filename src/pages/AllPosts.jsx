import React, { useState, useEffect } from "react";
import appwriteService from '../appwrite/config'
import { PostForm, PostCard } from "../../components";
import Container from "../../components/Container/container";

function AllPosts() {

    const [posts, setPosts] = useState([])
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts)
                setPosts(posts.documents)
        })
    }, [])

    return (
        <div>

            <div className="flex flex-wrap ">
                {
                    posts.map((post) => (
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard {...post} />
                        </div>
                    ))
                }
            </div>

        </div>
    );
}

export default AllPosts;