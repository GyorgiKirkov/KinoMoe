import { useState, useEffect } from "react";
import styles from "./Community.module.css";
import userImage from "../../../public/img/IgorDzambazov.png";
import Sidebar from "../../components/SideBar/SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp as faThumbsUpSolid,
  faThumbsDown as faThumbsDownSolid,
} from "@fortawesome/free-solid-svg-icons";
import {
  faThumbsUp as faThumbsUpRegular,
  faThumbsDown as faThumbsDownRegular,
} from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

interface Post {
  id: number;
  user: string;
  content: string;
  comments: number;
  likes: number;
  dislikes: number;
  userLiked?: boolean;
  userDisliked?: boolean;
}

const postsData: Post[] = [
  {
    id: 1,
    user: "Natasha",
    content: "Која е вистинската приказна за Балканик...",
    comments: 45,
    likes: 60,
    dislikes: 0,
  },
  {
    id: 2,
    user: "Igor Dzambazov",
    content: "Човек поголем од живот - Игор Џамбазов",
    comments: 22,
    likes: 35,
    dislikes: 6,
  },
  {
    id: 3,
    user: "Sime",
    content: "Дали мислите дека...",
    comments: 10,
    likes: 15,
    dislikes: 3,
  },
  {
    id: 4,
    user: "John Doe",
    content: "Мојата интерпретација на Трето полувреме",
    comments: 18,
    likes: 20,
    dislikes: 13,
  },
  {
    id: 5,
    user: "Jane Doe",
    content: "Кој беше Глумицата?",
    comments: 11,
    likes: 13,
    dislikes: 0,
  },
  {
    id: 6,
    user: "Ahmet",
    content: "Прекрасен филм",
    comments: 15,
    likes: 12,
    dislikes: 0,
  },
];

const Community = () => {
  const [posts, setPosts] = useState<Post[]>(postsData);

  useEffect(() => {
    const storedPosts = localStorage.getItem("posts");
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          if (!post.userLiked) {
            return {
              ...post,
              likes: post.likes + 1,
              dislikes: post.userDisliked ? post.dislikes - 1 : post.dislikes,
              userLiked: true,
              userDisliked: false,
            };
          } else {
            return { ...post, likes: post.likes - 1, userLiked: false };
          }
        }
        return post;
      })
    );
  };

  const handleDislike = (postId: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          if (!post.userDisliked) {
            return {
              ...post,
              dislikes: post.dislikes + 1,
              likes: post.userLiked ? post.likes - 1 : post.likes,
              userDisliked: true,
              userLiked: false,
            };
          } else {
            return {
              ...post,
              dislikes: post.dislikes - 1,
              userDisliked: false,
            };
          }
        }
        return post;
      })
    );
  };

  const currentUserId = 1; 

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1>Community</h1>
          <Link to={`/Community/Posts/${currentUserId}`}>
            <button className={styles.startDiscussion}>
              Start a discussion
            </button>
          </Link>
        </div>
        <input type="text" className={styles.search} placeholder="Search..." />
        <div className={styles.posts}>
          {posts.map((post) => (
            <div key={post.id} className={styles.post}>
              <img
                src={userImage}
                alt={post.user}
                className={styles.userImage}
              />
              <div className={styles.postContent}>
                <span className={styles.userName}>{post.user}</span>
                <p>{post.content}</p>
                <div className={styles.postInfo}>
                  <span>{post.comments} comments</span>
                  <div className={styles.likesDislikes}>
                    <span>
                      <button
                        onClick={() => handleLike(post.id)}
                        className={styles.iconButton}
                        title="Like"
                      >
                        <FontAwesomeIcon
                          icon={
                            post.userLiked ? faThumbsUpSolid : faThumbsUpRegular
                          }
                          style={{
                            color: post.userLiked ? "#00ff00" : "#e6e7ea",
                          }}
                        />
                      </button>
                      {post.likes}
                    </span>
                    <span>
                      <button
                        onClick={() => handleDislike(post.id)}
                        className={styles.iconButton}
                        title="Dislike"
                      >
                        <FontAwesomeIcon
                          icon={
                            post.userDisliked
                              ? faThumbsDownSolid
                              : faThumbsDownRegular
                          }
                          style={{
                            color: post.userDisliked ? "#ff0000" : "#e8e8e8",
                          }}
                        />
                      </button>
                      {post.dislikes}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className={styles.showMore}>Show more</button>
      </div>
      <div className={styles.sidebarRight}>
        <div className={styles.activitySummary}>
          <h3>Activity</h3>
          <div className={styles.summaryItem}>
            <div className={styles.icon}></div>
            <div>
              <span>Comments</span>
              <span>122</span>
            </div>
          </div>
          <div className={styles.summaryItem}>
            <div className={styles.icon}></div>
            <div>
              <span>Posts</span>
              <span>10</span>
            </div>
          </div>
          <div className={styles.summaryItem}>
            <div className={styles.icon}></div>
            <div>
              <span>Reactions</span>
              <span>200</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
