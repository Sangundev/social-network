import { useEffect, useState } from "react";
import axios from "axios";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = username
          ? await axios.get(`/posts/profile/${username}`)
          : await axios.get("/posts/timeline/66f25ab2c36f065d1b324c91");
        setPosts(res.data);
        console.log("Fetched posts:", res.data); // Debug log
      } catch (err) {
        console.error("Error fetching posts:", err);
        alert("Could not fetch posts. Please try again later.");
      }
    };

    fetchPosts();
  }, [username]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.length > 0 ? (
          posts.map((p) => <Post key={p._id} post={p} />)
        ) : (
          <p>No posts to display</p>
        )}
      </div>
    </div>
  );
}
