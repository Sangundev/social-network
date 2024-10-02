import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";

export default function Feed() {
  const [posts, setPosts] = useState([]); // State to store multiple posts

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("posts/timeline/66f25ab2c36f065d1b324c91");
        console.log(res);
        setPosts(res.data)
      } catch (err) {
        console.error("Error fetching posts:", err); // Log the error for debugging
      }
    };
    
    fetchPosts();
  }, []);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => (
          <Post key={p._id} post={p} /> // Use p._id as key if available
        ))}
      </div>
    </div>
  );
}
