import React from "react";
import PostPageStyles from "./PostPage.module.css";
import userImage from "../../../public/img/IgorDzambazov.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faThumbsUp,faThumbsDown,faComment,} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../../components/SideBar/SideBar";


const post = {
  id: 1,
  user: "Igor Dzambazov",
  content: "Човек поголем од живот - Игор Џамбазов",
  mainComment:
    "Lorem ipsum dolor sit amet consectetur. In volutpat orci non justo. Maecenas adipiscing a elementum vel mauris amet aliquet.Lorem ipsum dolor sit amet consectetur. In volutpat orci non justo. Maecenas adipiscing a elementum vel mauris amet aliquet.Lorem ipsum dolor sit amet consectetur. In volutpat orci non justo. Maecenas adipiscing a elementum vel mauris amet aliquet.",
  comments: 6000,
  likes: 78,
  dislikes: 0,
};

const commentsData = [
  {
    id: 1,
    user: "Sime123",
    content: "I was under the impression that he came from a rich family",
    likes: 12,
    dislikes: 2,
  },
  {
    id: 2,
    user: "Stefan N",
    content: "Lorem ipsum amet...",
    likes: 1,
    dislikes: 0,
  },
  {
    id: 3,
    user: "Jimmy40",
    content: "I can't believe that bla bla...",
    likes: 58,
    dislikes: 1,
  },
  {
    id: 4,
    user: "Amari191",
    content: "I can't believe that bla bla...",
    likes: 215,
    dislikes: 10,
  },
];

const PostPage = () => {
  return (
    <div className={PostPageStyles.main}>
      <div className={PostPageStyles.sidebar}>
        <Sidebar />
      </div>
      <div className={PostPageStyles.mainContent}>
        <h1>Community/Post</h1>
        <div className={PostPageStyles.post}>
          <img
            src={userImage}
            alt={post.user}
            className={PostPageStyles.userImage}
          />
          <div className={PostPageStyles.postContent}>
            <span className={PostPageStyles.userName}>{post.user}</span>
            <p className={PostPageStyles.mainComment}>{post.mainComment}</p>
            <div className={PostPageStyles.postActions}>
              <span>
                <FontAwesomeIcon icon={faThumbsUp} /> {post.comments}
              </span>
              <span>
                <FontAwesomeIcon icon={faThumbsDown} /> {post.likes}
              </span>
            </div>
          </div>
        </div>
        <input
          type="text"
          className={`text-white ${PostPageStyles.commentInput}`}
          placeholder="Leave a comment..."
        />
        <button className={PostPageStyles.commentButton}>Post Comment</button>
        <div className={PostPageStyles.commentSection}>
          <h2>Comment Section</h2>
          {commentsData.map((comment) => (
            <div key={comment.id} className={PostPageStyles.comment}>
              <img
                src={userImage}
                alt={comment.user}
                className={PostPageStyles.userImage}
              />
              <div className={PostPageStyles.commentContent}>
                <span className={PostPageStyles.userName}>{comment.user}</span>
                <p className="text-white">{comment.content}</p>
                <div className={PostPageStyles.commentActions}>
                  <span>
                    <FontAwesomeIcon icon={faThumbsUp} /> {comment.likes}
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faThumbsDown} /> {comment.dislikes}
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faComment} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={PostPageStyles.sidebarRight}>
        <div className={PostPageStyles.participants}>
          <h3 className="text-white">Participants in this comment section</h3>
          <div className={PostPageStyles.participant}>
            <img
              src={userImage}
              alt="Sime"
              className={PostPageStyles.userImage}
            />
            <span>Sime</span>
          </div>
          <div className={PostPageStyles.participant}>
            <img
              src={userImage}
              alt="Stefan"
              className={PostPageStyles.userImage}
            />
            <span>Stefan</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
