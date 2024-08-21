import React, { useEffect, useRef, useState } from "react";
import MediaStyles from "./MoviePlayer.module.css";
import Video from "../../../public/video/movieTriller.mp4";
import userImage from "../../../public/img/IgorDzambazov.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faForward,
  faBackward,
  faVolumeHigh,
  faVolumeXmark,
  faExpand,
} from "@fortawesome/free-solid-svg-icons";
import { faComments } from "@fortawesome/free-regular-svg-icons";
import Sidebar from "../SideBar/SideBar";

interface Comment {
  id: string;
  text: string;
  time: number;
  user: string;
}

interface User {
  id: string;
  name: string;
  image: string;
}

const users: User[] = [
  {
    id: "a1a2a3",
    name: "Ahmet",
    image: userImage,
  },
  {
    id: "qeeqwe",
    name: "Jhon",
    image: userImage,
  },
  {
    id: "a1aqweqweqw2a3",
    name: "Jane",
    image: userImage,
  },
];

const comments: Comment[] = [
  {
    id: "123a",
    text: "LOL",
    time: 10,
    user: "a1a2a3",
  },
  {
    id: "124",
    text: "Haha very funny",
    time: 15,
    user: "qeeqwe",
  },
  {
    id: "125",
    text: "This is a second comment",
    time: 20,
    user: "a1aqweqweqw2a3",
  },
];

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};

const MoviePlayer: React.FC = () => {
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showComments, setShowComments] = useState(false); 
  const [newComment, setNewComment] = useState("");
  const [allComments, setAllComments] = useState<Comment[]>(comments);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const updateCurrentTime = () => {
      if (videoRef.current) {
        setCurrentTime(videoRef.current.currentTime);
      }
    };

    const updateDuration = () => {
      if (videoRef.current) {
        setTotalDuration(videoRef.current.duration);
      }
    };

    videoRef.current?.addEventListener("timeupdate", updateCurrentTime);
    videoRef.current?.addEventListener("loadedmetadata", updateDuration);

    return () => {
      videoRef.current?.removeEventListener("timeupdate", updateCurrentTime);
      videoRef.current?.removeEventListener("loadedmetadata", updateDuration);
    };
  }, []);

  const handleAddComment = () => {
    const newCommentObj: Comment = {
      id: Date.now().toString(),
      text: newComment,
      time: currentTime,
      user: "a1a2a3", 
    };
    setAllComments([...allComments, newCommentObj]);
    setNewComment("");
  };

  const getUserById = (userId: string): User | undefined => {
    return users.find((user) => user.id === userId);
  };

  const handleForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10;
    }
  };

  const handleBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10;
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Number(event.target.value);
      setCurrentTime(Number(event.target.value));
    }
  };

  const handleFullScreen = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      if (videoElement.requestFullscreen) {
        videoElement.requestFullscreen();
      } else if ((videoElement as any).webkitRequestFullscreen) {
        (videoElement as any).webkitRequestFullscreen();
      } else if ((videoElement as any).msRequestFullscreen) {
        (videoElement as any).msRequestFullscreen();
      }
    }
  };

  return (
    <>
      <Sidebar />

      <div className={MediaStyles.video}>
        <div className={MediaStyles.videoWrapper}>
          <video ref={videoRef}>
            <source src={Video} />
          </video>

          <input
            type="range"
            className={MediaStyles.progressBar}
            min="0"
            max={totalDuration}
            value={currentTime}
            onChange={handleSeek}
            aria-label="Progress Bar"
            style={
              {
                "--progress-value": `${(currentTime / totalDuration) * 100}%`,
              } as React.CSSProperties
            }
          />

          <div className={MediaStyles.controls}>
            <div className={MediaStyles.timeDisplay}>
              {formatTime(currentTime)} / {formatTime(totalDuration)}
            </div>
            <div className={MediaStyles.playbackControls}>
              <button
                className={MediaStyles.controlButton}
                onClick={handleBackward}
                title="Rewind 10 seconds"
              >
                <FontAwesomeIcon
                  icon={faBackward}
                  style={{ color: "#ffffff" }}
                />
              </button>
              <button
                className={MediaStyles.controlButton}
                onClick={() => {
                  setVideoIsPlaying((prev) => !prev);
                  videoRef.current?.[videoIsPlaying ? "pause" : "play"]();
                }}
                title={videoIsPlaying ? "Pause" : "Play"}
              >
                <FontAwesomeIcon
                  icon={videoIsPlaying ? faPause : faPlay}
                  style={{ color: "#ffffff" }}
                />
              </button>
              <button
                className={MediaStyles.controlButton}
                onClick={handleForward}
                title="Forward 10 seconds"
              >
                <FontAwesomeIcon
                  icon={faForward}
                  style={{ color: "#fafafa" }}
                />
              </button>
            </div>
            <div className={MediaStyles.otherControls}>
              <button
                className={MediaStyles.controlButton}
                onClick={handleMuteToggle}
                title={isMuted ? "Unmute" : "Mute"}
              >
                <FontAwesomeIcon
                  icon={isMuted ? faVolumeXmark : faVolumeHigh}
                  style={{ color: "#ffffff" }}
                />
              </button>
              <button
                className={MediaStyles.controlButton}
                onClick={handleFullScreen}
                title="Fullscreen"
              >
                <FontAwesomeIcon icon={faExpand} style={{ color: "#ffffff" }} />
              </button>
              <button
                className={MediaStyles.controlButton}
                onClick={() => {
                  setShowComments((prev) => !prev);
                }}
                title="Toggle Comments"
              >
                <FontAwesomeIcon
                  icon={faComments}
                  style={{ color: "#ff0000" }}
                />
              </button>
            </div>
          </div>

          {showComments && (
            <div className={MediaStyles.chatBox}>
              <div className={MediaStyles.comments}>
                {allComments.map((comment) => {
                  const showComment =
                    videoRef.current &&
                    videoRef.current.currentTime >= comment.time - 6 &&
                    videoRef.current.currentTime <= comment.time + 3;
                  const user = getUserById(comment.user);
                  return (
                    <div
                      className={`${MediaStyles.commentBox} ${
                        showComment ? MediaStyles.show : MediaStyles.hide
                      }`}
                      key={comment.id}
                    >
                      {user && (
                        <div className={MediaStyles.commentHeader}>
                          <img
                            src={user.image}
                            alt={user.name}
                            className={MediaStyles.userImage}
                          />
                          <span className={MediaStyles.userName}>
                            {user.name}
                          </span>
                        </div>
                      )}
                      <div className={MediaStyles.commentText}>
                        {comment.text}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className={MediaStyles.commentInputWrapper}>
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className={MediaStyles.commentInput}
                  placeholder="Write a comment..."
                  aria-label="Write a comment"
                />
                <button
                  onClick={handleAddComment}
                  className={MediaStyles.commentSubmit}
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MoviePlayer;
