import "./post.css";
import { MoreVert } from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "axios";
import { formatDistanceToNow } from 'date-fns';
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const [likeCount, setLikeCount] = useState(post.likes.length || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  // Fetch user data based on post's userId
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users?userId=${post.userId}`);
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    setIsLiked(!isLiked);
  };

  // Validate post data
  if (!post || Object.keys(post).length === 0) {
    return <div>No post data available</div>;
  }

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={user.profilePicture || `${PF}/defaultProfile.png`} // Default profile image
                alt={`${user.username}'s profile`}
              />
            </Link>
            <span className="postUsername">{user.username || "Unknown User"}</span>
            <span className="postDate">
              {post.createdAt ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }) : "Date not available"}
            </span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.desc || "No description available"}</span>
          {post.img && <img className="postImg" src={post.img} alt="Post content" />}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src="assets/like.png" onClick={likeHandler} alt="Like" />
            <img className="likeIcon" src="assets/heart.png" onClick={likeHandler} alt="Heart" />
            <span className="postLikeCounter">{likeCount} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comments?.length || 0} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
