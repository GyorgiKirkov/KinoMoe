import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Homepage.module.css";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const artists = [
    {
      id: "56",
      name: "Igor Dzambazov",
      image: "../../../public/img/IgorDzambazov.png",
    },
    {
      id: "57",
      name: "Rade Sherbedzia",
      image: "../../../public/img/RadeSherbedzia.png",
    },
    {
      id: "58",
      name: "Toni Mihajlovski",
      image: "../../../public/img/ToniMihajlovski.png",
    },
  ];

  return (
    <div className={`landingPage text-white text-center ${styles.bgHomePage}`}>
      <div className="banner">
        <div className={styles.HomeBG}>
          <div className={`container ${styles.selection}`}>
            <div className="row mb-2 logoLogIn justify-content-center">
              <div className="col-12 col-md-4">
                <img
                  src="../../../public/img/LOGOtransperent.png"
                  alt="Logo"
                  className={`${styles.logoImg}`}
                />
              </div>
              <div className="col-12">
                <div className={`${styles.bannerText}`}>
                  <p
                    className={`text-uppercase text-white ${styles.h2lending}`}
                  >
                    explore, engage & express yourself
                  </p>
                  <p className="text-white">
                    Watch, learn, collaborate beyond the screen
                  </p>
                  <div className="col-12 mb-4">
                    <Link to="/logIn">
                      <button
                        type="button"
                        className={`btn btn-success px-4 ${styles.btnBanner}`}
                      >
                        SignUp/LogIn
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img
            src="../../../public/img/BannerImg.png"
            alt="mirrorCover"
            className="bannerImg"
          />
        </div>
      </div>

      <section className={`mainContent ${styles.bgHomePage}`}>
        <div className="movies mb-5 mt-5">
          <div className="rooms row container-fluid justify-content-center text-white">
            <div className="movieRoom col-12 col-md-4">
              <Link to="/">
                <p className={`text-white ${styles.textCategory}`}>
                  Movie Room
                </p>
                <img
                  src="../../../public/img/MovieRoom.png"
                  alt="movieRoom"
                  className="img-fluid MovieRoomImg"
                />
              </Link>
            </div>
            <div className="kidsRoom col-12 col-md-4">
              <Link to="/">
                <p className={`text-white ${styles.textCategory}`}>Kids Room</p>
                <img
                  src="../../../public/img/KidsRoom.png"
                  alt="kidsRoom"
                  className="img-fluid KidsRoom"
                />
              </Link>
            </div>
            <div className="docRoom col-12 col-md-4">
              <Link to="/">
                <p className={`text-white ${styles.textCategory}`}>
                  Documentary Room
                </p>
                <img
                  src="../../../public/img/DocRoom.png"
                  alt="docRoom"
                  className="img-fluid DocRoom"
                />
              </Link>
            </div>
            <div className="row justify-content-center">
              <div className="podcast col-12 col-md-4">
                <Link to="/">
                  <p className={`text-white ${styles.textCategory}`}>Podcast</p>
                  <img
                    src="../../../public/img/Podcast.png"
                    alt="podcast"
                    className="img-fluid Podcast"
                  />
                </Link>
              </div>
              <div className="tvSeries col-12 col-md-4">
                <Link to="/">
                  <p className={`text-white ${styles.textCategory}`}>
                    TV Series Room
                  </p>
                  <img
                    src="../../../public/img/TvSeries.png"
                    alt="tvSeries"
                    className="img-fluid TvSeries"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
  
        <div className="meetArtists container-fluid mt-5 mb-5">
          <div className="row justify-content-center">
            <h4>MEET THE ARTISTS</h4>
            {artists.map((artist) => (
              <div key={artist.id} className={`col-12 col-md-4 ${styles.artistCard}`}>
                <Link to={`/movieHomePage/meetArtists/${artist.id}`}>
                  <h2 className={`text-white ${styles.artistCard}`}>
                    {artist.name}
                  </h2>
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className={`img-fluid ${styles.artistImg}`}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
  
        <div className={`container-fluid my-5 ${styles.imgMovieBox}`}>
          <img
            src="../../../public/img/movieMarkovski.png"
            alt="movieMarkovski"
            className={` img-fluid ${styles.imgMovie}`}
          />
        </div>
  
        <div className="payoption container">
          <div className="row justify-content-center align-self-stretch">
            <div className="col-12 col-md-4 mb-4">
              <div className={`${styles.card}`}>
                <div className="card bg-transparent text-white border-0">
                  <div className={`card-header ${styles.card_header}`}>
                    Watch with ads
                  </div>
                  <div className="card-body border-0 p-2 ">
                    <h5 className={`card-title border-0 ${styles.card_title}`}>
                      Free
                    </h5>
                    <ul className={`${styles.text}`}>
                      <li> Access to a Vast Library</li>
                      <li> Unlimited Streaming</li>
                      <li> Multiple Devices</li>
                      <li> No Subscription Fee</li>
                    </ul>
                  </div>
                </div>
                <button
                  type="button"
                  className={`btn btn-primary btn-lg btn-block border-0 w-100 ${styles.btnLending}`}
                >
                  Register
                </button>
              </div>
            </div>
            <div className="col-12 col-md-4 ">
              <div className={`${styles.card}`}>
                <div className="card  bg-transparent border-0 text-white">
                  <div className={styles.optionalChoice}>Optional choice</div>
                  <div className={`card-header ${styles.card_header}`}>
                    Watch with ads
                  </div>
                  <div className="card-body border-0">
                    <h5 className={`card-title border-0  ${styles.card_title}`}>
                      499den./month
                    </h5>
                    <ul className={`${styles.text}`}>
                      <li>Access to a Vast Library</li>
                      <li>Unlimited streaming</li>
                      <li>Multiple devices</li>
                      <li>Watch without ads</li>
                      <li>Offline Viewing</li>
                    </ul>
                  </div>
                </div>{" "}
                <button
                  type="button"
                  className={`btn btn-primary btn-lg btn-block border-0 w-100 ${styles.btnLending}`}
                >
                  Register
                </button>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className={`${styles.card}`}>
                <div className="card  bg-transparent text-white border-0">
                  <div className={`card-header ${styles.card_header}`}>
                    Watch with ads
                  </div>
                  <div className="card-body border-0 ">
                    <h5 className={`card-title border-0  ${styles.card_title}`}>
                      Watch with points
                    </h5>
                    <ul className={`${styles.text}`}>
                      <li>Earn points when you engage</li>
                      <li>Claim rewards with earned points</li>
                      <li>No Subscription Fee</li>
                    </ul>
                  </div>
                </div>{" "}
                <button
                  type="button"
                  className={`btn btn-primary btn-lg btn-block border-0 w-100 ${styles.btnLending}`}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    
      <section className="footer container-fluid">
        <div className="row align-items-center justify-content-between">
          <div className="col-12 col-md-2 text-white">
            <h5>KINOMOE.MK © 2024</h5>
          </div>
          <div className={`col-12 col-md-2 ${styles.kinoFooter}`}>
            <img src="../../../public/img/LOGOtransperent.png" alt="Logo" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
