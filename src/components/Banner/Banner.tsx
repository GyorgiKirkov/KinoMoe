import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faHeart,
  faPlus,
  faShareSquare,
  faVolumeXmark,
  faVolumeHigh,
  faMagnifyingGlass,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  ViberShareButton,
  ViberIcon,
  LinkedinShareButton,
  LinkedinIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";
import bannerStyles from "./Banner.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../SideBar/SideBar";
import MovieList from "../MovieList/MovieListSearch";

interface BannerProps {
  onSelectCategory: (category: string) => void;
}

const Banner: React.FC<BannerProps> = ({ onSelectCategory }) => {
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showSearchPopup, setShowSearchPopup] = useState<boolean>(false);
  const [showPlayPopup, setShowPlayPopup] = useState<boolean>(false);
  const [isHearted, setIsHearted] = useState<boolean>(false);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [showShareButtons, setShowShareButtons] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowVideo(true);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const hearted = localStorage.getItem("isHearted") === "true";
    const added = localStorage.getItem("isAdded") === "true";
    setIsHearted(hearted);
    setIsAdded(added);
  }, []);

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const category = event.target.value;
    setSelectedCategory(category);
    onSelectCategory(category === "showAll" ? "" : category);
  };

  const handleHeartToggle = () => {
    const newHeartedState = !isHearted;
    setIsHearted(newHeartedState);
    localStorage.setItem("isHearted", newHeartedState.toString());
  };

  const handleAddToggle = () => {
    const newAddedState = !isAdded;
    setIsAdded(newAddedState);
    localStorage.setItem("isAdded", newAddedState.toString());
  };

  const shareUrl = window.location.href;

  const toggleShareButtons = () => {
    setShowShareButtons(!showShareButtons);
  };

  return (
    <div className={bannerStyles.bannerContainer}>
      {!showVideo && (
        <div>
          <img
            src="../../../public/img/BannerImg.jpg"
            alt="Background"
            className={bannerStyles.bannerBackgroundImage}
          />
          <Sidebar />
          <div className={bannerStyles.textBox}>
            <h2 className={bannerStyles.h2Banner}>Balkankan</h2>
            <p className={bannerStyles.pBanner}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias,
              quidem nulla, impedit facilis itaque molestias voluptatem
              voluptates pariatur velit illum ipsam magnam excepturi in quo.
              Exercitationem tenetur molestiae necessitatibus, quia id incidunt
              architecto rem quas deleniti a eum, nostrum, alias vitae! Placeat
              autem, tempore praesentium hic maiores nostrum, sapiente
              temporibus cumque quaerat eveniet ipsa! Reprehenderit numquam
              culpa eos laborum illo.
            </p>
            <div className={bannerStyles.button}>
              <button
                className={bannerStyles.play}
                title="Play"
                onClick={() => setShowPlayPopup(true)}
              >
                <FontAwesomeIcon icon={faPlay} style={{ color: "#ffffff" }} />
                Watch
              </button>
              <button
                className={`${bannerStyles.favorite} ${
                  isHearted ? bannerStyles.liked : ""
                }`}
                title="Heart"
                onClick={handleHeartToggle}
              >
                <FontAwesomeIcon
                  icon={faHeart}
                  style={{ color: isHearted ? "red" : "#ffffff" }}
                />
              </button>
              <button
                className={`${bannerStyles.add} ${
                  isAdded ? bannerStyles.watchLater : ""
                }`}
                title="Plus"
                onClick={handleAddToggle}
              >
                <FontAwesomeIcon
                  icon={isAdded ? faCheck : faPlus}
                  style={{ color: "#ffffff" }}
                />
              </button>
              <button
                className={bannerStyles.share}
                title="Share"
                onClick={toggleShareButtons}
              >
                <FontAwesomeIcon
                  icon={faShareSquare}
                  style={{ color: "#ffffff" }}
                />
              </button>
              {showShareButtons && (
                <div className={bannerStyles.shareButtons}>
                  <FacebookShareButton
                    url={shareUrl}
                    title="Balkankan"
                    className={bannerStyles.customShareButton}
                  >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <WhatsappShareButton
                    url={shareUrl}
                    title="Balkankan"
                    className={bannerStyles.customShareButton}
                  >
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
                  <ViberShareButton
                    url={shareUrl}
                    title="Balkankan"
                    className={bannerStyles.customShareButton}
                  >
                    <ViberIcon size={32} round />
                  </ViberShareButton>
                  <LinkedinShareButton
                    url={shareUrl}
                    title="Balkankan"
                    className={bannerStyles.customShareButton}
                  >
                    <LinkedinIcon size={32} round />
                  </LinkedinShareButton>
                  <EmailShareButton
                    url={shareUrl}
                    subject="Balkankan"
                    body="Check out Balkankan"
                    className={bannerStyles.customShareButton}
                  >
                    <EmailIcon size={32} round />
                  </EmailShareButton>
                </div>
              )}
            </div>
          </div>
          <div className={bannerStyles.searchBox}>
            <div className="row">
              <div className={`col-8 ${bannerStyles.dropdown}`}>
                <select
                  name="category"
                  className={bannerStyles.dropdownSelect}
                  title="Select Category"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="">
                    {selectedCategory === "" ? "Select…" : "Show All"}
                  </option>
                  <option value="Popular">Popular</option>
                  <option value="New Release">New Release</option>
                  <option value="Podcast">Podcast</option>
                  <option value="Kids">Kids</option>
                </select>
              </div>
              <div className={`col-1 ${bannerStyles.search}`}>
                <button
                  className={bannerStyles.searchInput}
                  title="searchInput"
                  onClick={() => setShowSearchPopup(true)}
                >
                  <div className={bannerStyles.searchIcon}>
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      style={{ color: "#ffffff" }}
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showVideo && (
        <div className="videoBanner">
          <video
            autoPlay
            muted={isMuted}
            loop
            className={bannerStyles.bannerVideo}
          >
            <source
              src="../../../public/video/movieTriller.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <section className="container"></section>
          <Sidebar />
          <div className={bannerStyles.textBox}>
            <h2 className={bannerStyles.h2Banner}>Balkankan</h2>
            <p className={bannerStyles.pBanner}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias,
              quidem nulla, impedit facilis itaque molestias voluptatem
              voluptates pariatur velit illum ipsam magnam excepturi in quo.
              Exercitationem tenetur molestiae necessitatibus, quia id incidunt
              architecto rem quas deleniti a eum, nostrum, alias vitae! Placeat
              autem, tempore praesentium hic maiores nostrum, sapiente
              temporibus cumque quaerat eveniet ipsa! Reprehenderit numquam
              culpa eos laborum illo.
            </p>
            <div className={bannerStyles.button}>
              <button
                className={bannerStyles.play}
                onClick={() => setShowPlayPopup(true)}
              >
                <FontAwesomeIcon icon={faPlay} style={{ color: "#ffffff" }} />
                Watch
              </button>
              <button
                className={`${bannerStyles.favorite} ${
                  isHearted ? bannerStyles.liked : ""
                }`}
                title="Heart"
                onClick={handleHeartToggle}
              >
                <FontAwesomeIcon
                  icon={faHeart}
                  style={{ color: isHearted ? "red" : "#ffffff" }}
                />
              </button>
              <button
                className={`${bannerStyles.add} ${
                  isAdded ? bannerStyles.watchLater : ""
                }`}
                title="Plus"
                onClick={handleAddToggle}
              >
                <FontAwesomeIcon
                  icon={isAdded ? faCheck : faPlus}
                  style={{ color: "#ffffff" }}
                />
              </button>
              <button
                className={bannerStyles.share}
                title="Share"
                onClick={toggleShareButtons}
              >
                <FontAwesomeIcon
                  icon={faShareSquare}
                  style={{ color: "#ffffff" }}
                />
              </button>
              {showShareButtons && (
                <div className={bannerStyles.shareButtons}>
                  <FacebookShareButton
                    url={shareUrl}
                    title="Balkankan"
                    className={bannerStyles.customShareButton}
                  >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <WhatsappShareButton
                    url={shareUrl}
                    title="Balkankan"
                    className={bannerStyles.customShareButton}
                  >
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
                  <ViberShareButton
                    url={shareUrl}
                    title="Balkankan"
                    className={bannerStyles.customShareButton}
                  >
                    <ViberIcon size={32} round />
                  </ViberShareButton>
                  <LinkedinShareButton
                    url={shareUrl}
                    title="Balkankan"
                    className={bannerStyles.customShareButton}
                  >
                    <LinkedinIcon size={32} round />
                  </LinkedinShareButton>
                  <EmailShareButton
                    url={shareUrl}
                    subject="Balkankan"
                    body="Check out Balkankan"
                    className={bannerStyles.customShareButton}
                  >
                    <EmailIcon size={32} round />
                  </EmailShareButton>
                </div>
              )}
            </div>
          </div>
          <div className={bannerStyles.searchBox}>
            <div className="row">
              <div className={`col-8 ${bannerStyles.dropdown}`}>
                <select
                  name="category"
                  className={bannerStyles.dropdownSelect}
                  title="Select Category"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="">
                    {selectedCategory === "" ? "Select…" : "Show All"}
                  </option>
                  <option value="Popular">Popular</option>
                  <option value="New Release">New Release</option>
                  <option value="Podcast">Podcast</option>
                  <option value="Kids">Kids</option>
                </select>
              </div>
              <div className={`col-1 ${bannerStyles.search}`}>
                <button
                  className={bannerStyles.searchInput}
                  title="searchInput"
                  onClick={() => setShowSearchPopup(true)}
                >
                  <div className={bannerStyles.searchIcon}>
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      style={{ color: "#ffffff" }}
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
          <button
            className={`${bannerStyles.bannerButtonVolume} ${
              isMuted ? "" : bannerStyles.active
            }`}
            onClick={handleMuteToggle}
          >
            {isMuted ? (
              <FontAwesomeIcon
                icon={faVolumeXmark}
                style={{ color: "#ffffff" }}
              />
            ) : (
              <FontAwesomeIcon
                icon={faVolumeHigh}
                style={{ color: "#ffffff" }}
              />
            )}
          </button>
        </div>
      )}
      {showSearchPopup && (
        <MovieList onClose={() => setShowSearchPopup(false)} />
      )}
      {showPlayPopup && (
        <div className={bannerStyles.overlay}>
          <div className={bannerStyles.popup}>
            <button
              className={bannerStyles.closeButton}
              onClick={() => setShowPlayPopup(false)}
            >
              &times;
            </button>
            <video autoPlay controls className={bannerStyles.bannerVideo}>
              <source
                src="../../../public/video/movieTriller.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
