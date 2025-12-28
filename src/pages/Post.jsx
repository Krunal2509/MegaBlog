import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../../components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [imageError, setImageError] = useState(false);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                    setImageError(false);
                }
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                if (post.featuredImg) {
                    appwriteService.deleteFile(post.featuredImg);
                }
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    {post.featuredImg && (
                        imageError ? (
                            <div className="w-full h-64 flex items-center justify-center bg-gray-200 rounded-xl">
                                <p className="text-gray-500">Image failed to load</p>
                            </div>
                        ) : (
                            <img
                                src={appwriteService.getFilePreview(post.featuredImg)}
                                alt={post.title}
                                className="rounded-xl w-full h-auto max-h-[600px] object-contain"
                                onError={() => {
                                    console.error("Image failed to load. FileId:", post.featuredImg);
                                    setImageError(true);
                                }}
                                onLoad={() => {
                                    setImageError(false);
                                }}
                            />
                        )
                    )}

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {post.Content && parse(post.Content)}
                    </div>
            </Container>
        </div>
    ) : null;
}