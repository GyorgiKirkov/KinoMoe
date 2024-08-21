import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "../../../store/user-store";
import ProfileStyles from "./Profile.module.css";
import Sidebar from "../../SideBar/SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDropbox,
  faSlack,
  faJediOrder,
} from "@fortawesome/free-brands-svg-icons";
import { faShieldHalved, faMedal } from "@fortawesome/free-solid-svg-icons";
import DonutChart from "../../Chart/Chart";

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3000/user/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }
        const data = await response.json();
        const transformedData: User = {
          ...data,
          competedProfile: data.competedProfile === "true",
        };
        setUser(transformedData);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUser();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const commentThreshold = 10;
  const sharedMoviesThreshold = 20;
  const invitesThreshold = 10;
  const timeSpendThreshold = 100;

  return (
    <>
      <div className={`${ProfileStyles.BannerImg}`}>
        <Sidebar />
      </div>
      <div className={ProfileStyles.banner}></div>

      <div className={`container-fluid ${ProfileStyles.main}`}>
        <div className={ProfileStyles.mainProfile}>
          <div className={ProfileStyles.profileContent}>
            <div className={ProfileStyles.profileDetails}>
              <img
                src={user.profileImage}
                alt={`${user.fullname}'s profile`}
                className={ProfileStyles.img}
              />
              <h2 className="text-white">{user.fullname}</h2>
              <p className="text-white">Movie Enjoyer</p>
              <p className="text-white">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <h3>Badges:</h3>
              <div className={ProfileStyles.badges}>
                {user.commentsNumber > 10 && (
                  <FontAwesomeIcon
                    icon={faSlack}
                    className={ProfileStyles.icon}
                  />
                )}
                {user.shardMovies >= 20 && (
                  <FontAwesomeIcon
                    icon={faShieldHalved}
                    className={ProfileStyles.icon}
                  />
                )}
                {user.invites >= 10 && (
                  <FontAwesomeIcon
                    icon={faJediOrder}
                    className={ProfileStyles.icon}
                  />
                )}
                {user.timeSpendOnWatching > 100 && (
                  <FontAwesomeIcon
                    icon={faMedal}
                    className={ProfileStyles.icon}
                  />
                )}
                {user.competedProfile && (
                  <FontAwesomeIcon
                    icon={faDropbox}
                    className={ProfileStyles.icon}
                  />
                )}
              </div>
              <div className={ProfileStyles.progress}>
                <div className="row">
                  <DonutChart
                    value={user.commentsNumber || 0}
                    maxValue={commentThreshold}
                    label="Comments"
                  />
                  <DonutChart
                    value={user.shardMovies || 0}
                    maxValue={sharedMoviesThreshold}
                    label="Movies Shared"
                  />
                </div>
                <div className="row">
                  <DonutChart
                    value={user.invites || 0}
                    maxValue={invitesThreshold}
                    label="Invites Sent"
                  />
                  <DonutChart
                    value={user.timeSpendOnWatching || 0}
                    maxValue={timeSpendThreshold}
                    label="Watch Time"
                  />
                </div>
              </div>
            </div>
            <div className={ProfileStyles.content}>
              <div className={ProfileStyles.comments}>
                <h3>Comments by {user.username}:</h3>
                <div className={ProfileStyles.comment}>
                  <p>
                    <strong>{user.username}</strong>: Lorem ipsum dolor sit amet
                    consectetur. Aliquam massa cursus ac morbi nisl lectus nisl
                    eu aliquam.
                  </p>
                </div>
                <div className={ProfileStyles.comment}>
                  <p>
                    <strong>{user.username}</strong>: Lorem ipsum dolor sit amet
                    consectetur...
                  </p>
                </div>
              </div>
              <div className={ProfileStyles.watched}>
                <h3>What {user.username}'s watched:</h3>
                <div className={ProfileStyles.movies}>
                  {user.favoriteMovies && user.favoriteMovies.length > 0 ? (
                    user.favoriteMovies.map((movieId: string) => (
                      <img
                        key={movieId}
                        src={`/path/to/movies/${movieId}.jpg`}
                        alt={`Movie ${movieId}`}
                      />
                    ))
                  ) : (
                    <p>No movies watched yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
