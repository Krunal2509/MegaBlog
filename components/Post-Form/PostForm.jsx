import React from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import appwriteService from "../../src/appwrite/config";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      content: post?.Content || "",
      status: post?.status || "active",
    },
  });

  const submit = async (data) => {
    try {
      if (!data.content || data.content.trim() === "") {
        alert("Content is required");
        return;
      }

      if (post) {
        const file = data.image?.[0]
          ? await appwriteService.uploadFile(data.image[0])
          : null;

        if (file) await appwriteService.deleteFile(post.featuredImg);

        const dbPost = await appwriteService.updatePost(post.$id, {
          title: data.title,
          content: data.content,
          featuredImage: file ? file.$id : post.featuredImg,
          status: data.status,
        });

        if (dbPost) navigate(`/post/${dbPost.$id}`);
      } else {
        // Check if userData exists before accessing $id
        if (!userData || !userData.$id) {
          alert("User not authenticated. Please login again.");
          navigate("/login");
          return;
        }

        const file = data.image?.[0]
          ? await appwriteService.uploadFile(data.image[0])
          : null;

        if (!file) {
          alert("Featured image is required");
          return;
        }

        const dbPost = await appwriteService.createPost({
          title: data.title,
          content: data.content,
          featuredImage: file.$id,
          status: data.status,
          userId: userData.$id,
        });

        if (dbPost) navigate(`/post/${dbPost.$id}`);
      }
    } catch (error) {
      console.error("Error submitting post:", error);
      alert(`Error: ${error.message || "Failed to submit post. Please try again."}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />

        <RTE
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      <div className="w-1/3 px-2">
        <Input
          label="Featured Image"
          type="file"
          className="mb-4"
          accept="image/*"
          {...register("image", { required: !post })}
        />

        {post && post.featuredImg && (
          <img
            src={appwriteService.getFilePreview(post.featuredImg)}
            className="rounded-lg mb-4"
          />
        )}

        <Select
          label="Status"
          options={["active", "inactive"]}
          className="mb-4"
          {...register("status", { required: true })}
        />

        <Button className="w-full" type="submit">
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
