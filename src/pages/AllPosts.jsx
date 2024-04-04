import React, { useState, useEffect } from "react";
import Container from "../components/Container/Container";
import PostCard from "../components/PostCard";
import databaseService from "../appwrite/databaseService";
import { useDispatch, useSelector } from "react-redux";
import { addPost} from "../features/post/postSlice";
import Loader from "../components/Loader";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  const prevPosts = useSelector((state) => state.post.posts);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // getting posts from state if they exist
    if (prevPosts.length != 0) {
      setPosts(prevPosts);
    } else {
      setLoading(true);
      databaseService.getPosts([]).then((posts) => {
        if (posts) {
          setPosts(posts.documents);
          const data = posts.documents;

          // storing in state when post state is not set yet
          if (prevPosts.length == 0)
            data.map((post) => dispatch(addPost(post)));
        }

        setLoading(false);
      });
    }
  }, []);

  return !loading ? (
    <div className="w-full py-2">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  ) : (
    <Loader text="Loading blogs"></Loader>
  );
}

export default AllPosts;
