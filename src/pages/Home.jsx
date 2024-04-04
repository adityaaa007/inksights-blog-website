import React, { useEffect, useState } from "react";
import databaseService from "../appwrite/databaseService";
import Container from "../components/Container/Container";
import PostCard from "../components/PostCard";
import { useSelector } from "react-redux";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import blogAnim from "../assets/blog_anim.json";
import blogAnim2 from "../assets/blog_anim2.json";

function Home() {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);

  // useEffect(() => {
  //   databaseService.getPosts().then((posts) => {
  //     if (posts) {
  //       setPosts(posts.documents);
  //     }
  //   });
  // }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <Player
                autoplay
                loop
                src={authStatus ? blogAnim : blogAnim2}
                style={{ height: "350px", width: "350px" }}
              >
                <Controls
                  visible={false}
                  buttons={["play", "repeat", "frame", "debug"]}
                />
              </Player>
              <h1 className="text-2xl font-inter-bold text-orange-600">
                {authStatus
                  ? `Hi ${userData.name}!`
                  : null} </h1>
              <h1 className="text-xl mt-1 font-inter-regular">
                {authStatus
                  ? "Go to All Posts to see blogs"
                  : "Login to read posts"}
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
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
  );
}

export default Home;
