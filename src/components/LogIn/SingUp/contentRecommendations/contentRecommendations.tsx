import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./contentRecommendations.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import profileImg from "../../../../../public/img/ProfileImg.png";
import { useRegistration } from "../../RegistrationContext/RegistrationContext";

const ContentRecommendations: React.FC = () => {
  const { registrationData, setRegistrationData } = useRegistration();
  const [contentChoices, setContentChoices] = useState<string[]>(
    registrationData.interests || []
  );
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleCheckboxChange = (checkboxId: string) => {
    const index = contentChoices.indexOf(checkboxId);
    if (index === -1) {
      setContentChoices([...contentChoices, checkboxId]);
    } else {
      const updatedChoices = contentChoices.filter(
        (choice) => choice !== checkboxId
      );
      setContentChoices(updatedChoices);
    }
    setErrorMessage(""); 
  };

  const handleNextClick = () => {
    if (contentChoices.length === 0) {
      setErrorMessage(
        "Please select at least one content preference to proceed."
      );
    } else {
      setRegistrationData({
        ...registrationData,
        interests: contentChoices,
      });
      navigate(
        "/logIn/createAccount/artistOrViewer/chooseInterests/experience/subscription/profileSetup/culturalPreferences/contentRecommendations/notificationPreferences"
      );
    }
  };

  return (
    <div className={styles.loginBg}>
      <div className={`container ${styles.selection}`}>
        <div className="row mb-2 justify-content-center">
          <img
            src={profileImg}
            alt="Profile"
            className={`rounded-circle mt-3 ${styles.profileImage}`}
          />
         
          <div className="col-12">
            <h2 className={`text-white ${styles.h2Rec}`}>
              Content Recommendations
            </h2>

            <div className="col-12 text-center">
              {[
                "Action",
                "Comedy",
                "Drama",
                "Horror",
                "Fantasy",
                "Romance",
                "Thriller",
                "Documentary",
              ].map((choice, index) => (
                <React.Fragment key={index}>
                  <input
                    className={styles.customCheck}
                    id={`marking_${index + 1}`}
                    type="checkbox"
                    onChange={() => handleCheckboxChange(choice)}
                    checked={contentChoices.includes(choice)}
                  />
                  <label
                    className={styles.customCheckLabel}
                    htmlFor={`marking_${index + 1}`}
                  >
                    {choice}
                  </label>
                </React.Fragment>
              ))}
            </div>
            {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
            <div className="col-12 pt-1 pb-5 d-flex justify-content-center ">
              <Link
                to="/logIn/createAccount/artistOrViewer/chooseInterests/experience/subscription/profileSetup/culturalPreferences"
                style={{ color: "#ffffff", textDecoration: "none" }}
              >
                <button type="button" className="btn btn-success mx-2 px-4">
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    style={{ color: "#ffffff", marginRight: "15px" }}
                  />
                  Back
                </button>
              </Link>
              <button
                type="button"
                className="btn btn-success mx-2 px-4"
                onClick={handleNextClick}
              >
                Next
                <FontAwesomeIcon
                  icon={faArrowRight}
                  style={{ color: "#ffffff", marginLeft: "15px" }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentRecommendations;
