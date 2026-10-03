import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const submit = async (data) => {
        setError("");
        setSubmitting(true);
        try {
            if (post) {
                const file = data.image?.[0] ? await appwriteService.uploadFile(data.image[0]) : null;

                if (file) {
                    appwriteService.deleteFile(post.featuredImages);
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImages: file ? file.$id : post.featuredImages,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                } else {
                    setError("Failed to update post. Please try again.");
                }
            } else {
                const currentUserId = userData?.$id;
                if (!currentUserId) {
                    setError("Your session has expired. Please sign in again before submitting.");
                    return;
                }

                if (!data.image?.[0]) {
                    setError("Please select a featured image.");
                    setSubmitting(false);
                    return;
                }

                const file = await appwriteService.uploadFile(data.image[0]);

                if (file) {
                    const fileId = file.$id;
                    const dbPost = await appwriteService.createPost({
                        title: data.title,
                        slug: data.slug,
                        content: data.content,
                        featuredImages: fileId,
                        status: data.status,
                        userid: currentUserId,
                    });

                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    } else {
                        setError("Failed to create post. Please try again.");
                    }
                } else {
                    setError("Failed to upload image. Please try again.");
                }
            }
        } catch (err) {
            console.error("PostForm :: submit :: error", err);
            setError(err?.message || "Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-")
                .substring(0, 36);

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit, () => setError("Please fill in all required fields."))} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            {error && (
                <div className="lg:col-span-2">
                    <p className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{error}</p>
                </div>
            )}
            <div className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-7">
                <div className="mb-6 border-b border-stone-100 pb-5"><p className="text-xs font-semibold uppercase tracking-[.16em] text-[#416b4d]">Your draft</p><h2 className="mt-2 font-serif text-2xl text-stone-900">Shape your story</h2><p className="mt-1 text-sm text-stone-500">A clear title and a little care go a long way.</p></div>
                <Input
                    label="Story title"
                    placeholder="Give your story a thoughtful title"
                    className="mb-5"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Story address"
                    placeholder="your-story-title"
                    className="mb-5"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <aside className="h-fit rounded-2xl border border-stone-200 bg-white p-5 sm:p-6">
                <p className="mb-5 text-xs font-semibold uppercase tracking-[.16em] text-[#416b4d]">Publishing</p>
                <Input
                    label="Cover image"
                    type="file"
                    className="mb-5 file:mr-3 file:rounded-full file:border-0 file:bg-[#e6ece3] file:px-3 file:py-2 file:text-xs file:font-semibold file:text-[#416b4d]"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImages)}
                            alt={post.title}
                            className="mb-5 aspect-video w-full rounded-xl object-cover"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" className="w-full" disabled={submitting}>
                    {submitting ? "Saving…" : (post ? "Save changes" : "Publish story")}
                </Button>
                <p className="mt-3 text-center text-xs leading-5 text-stone-400">Take a final look through your story before sharing it.</p>
            </aside>
        </form>
    );
}
