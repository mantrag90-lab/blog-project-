import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userid === userData.$id : false;
    const imageUrl = post?.featuredImages
        ? appwriteService.getFilePreview(post.featuredImages)
        : "";

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImages);
                navigate("/");
            }
        });
    };

    return post ? (
        <article className="pb-16">
            <Container>
                <div className="mx-auto max-w-4xl pt-10 sm:pt-16">
                    <Link to="/" className="mb-9 inline-flex items-center gap-2 text-sm font-medium text-stone-500 transition hover:text-[#416b4d]"><span aria-hidden="true">←</span> Back to stories</Link>
                    <p className="mb-4 text-xs font-semibold uppercase tracking-[.18em] text-[#416b4d]">A Fieldnotes story</p>
                    <h1 className="max-w-4xl font-serif text-4xl font-medium leading-[1.1] tracking-[-.04em] text-stone-900 sm:text-6xl">{post.title}</h1>
                    <div className="mt-6 flex flex-wrap items-center gap-3 border-b border-stone-200 pb-7 text-sm text-stone-500">
                        <span className="grid h-9 w-9 place-items-center rounded-full bg-[#e4e9df] font-serif text-lg text-[#416b4d]">f.</span>
                        <span>From the Fieldnotes community</span><span className="text-stone-300">·</span><span>Take your time</span>
                        {isAuthor && <span className="ml-auto flex gap-2"><Link to={`/edit-post/${post.$id}`}><Button bgColor="bg-stone-100" textColor="text-stone-700" className="hover:bg-stone-200">Edit story</Button></Link><Button bgColor="bg-rose-50" textColor="text-rose-700" className="hover:bg-rose-100" onClick={deletePost}>Delete</Button></span>}
                    </div>
                </div>
                {imageUrl && <div className="mx-auto mt-8 max-w-5xl overflow-hidden rounded-2xl bg-[#eceae3] sm:mt-12 sm:rounded-3xl"><img src={imageUrl} alt={post.title} className="block max-h-[68vh] w-full object-cover" /></div>}
                <div className="reading-copy mx-auto mt-10 max-w-[720px] sm:mt-14">{parse(post.content)}</div>
                <div className="mx-auto mt-14 max-w-[720px] border-t border-stone-200 pt-7">
                    <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#416b4d] hover:gap-3">Discover another story <span aria-hidden="true">→</span></Link>
                </div>
            </Container>
        </article>
    ) : null;
}
