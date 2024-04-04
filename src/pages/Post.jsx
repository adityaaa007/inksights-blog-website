import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import databaseService from "../appwrite/databaseService";
import storageService from "../appwrite/storageService";
import Button from "../components/Button";
import Container from "../components/Container/Container";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { deletePost as deletePostFromState } from "../features/post/postSlice";
import Loader from "../components/Loader";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      setLoading(true);
      databaseService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");

        setLoading(false);
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    databaseService.deletePost(post.$id).then((status) => {
      if (status) {
        storageService.deleteFile(post.featuredImage);

        dispatch(deletePostFromState(post));
        navigate("/all-posts");
      }
    });
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative rounded-xl p-0">
          <img
            src={storageService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl bg-black"
          />

          {isAuthor && (
            <div className="absolute right-40 text-sm top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-orange-600" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-white" textColor="black" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-3xl font-black font-inter-bold mt-8">
            {post.title}
          </h1>
        </div>
        <div className="browser-css px-[10%]">{parse(post.content)}</div>
      </Container>
    </div>
  ) : (
    <Loader></Loader>
  );
}
