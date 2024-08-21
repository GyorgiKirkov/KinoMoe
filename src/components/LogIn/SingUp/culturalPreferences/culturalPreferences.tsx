import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "./culturalPreferences.module.css";
import profileImg from "../../../../../public/img/ProfileImg.png";
import { useRegistration } from "../../RegistrationContext/RegistrationContext";

const CulturalPreferences: React.FC = () => {
  const { registrationData, setRegistrationData } = useRegistration();
  const [selectedCulturalPreferences, setSelectedCulturalPreferences] =
    useState<string[]>(registrationData.culturalPreferences || []);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleCheckboxChange = (checkboxId: string) => {
    const index = selectedCulturalPreferences.indexOf(checkboxId);
    if (index === -1) {
      setSelectedCulturalPreferences([
        ...selectedCulturalPreferences,
        checkboxId,
      ]);
    } else {
      const updatedPreferences = selectedCulturalPreferences.filter(
        (preference) => preference !== checkboxId
      );
      setSelectedCulturalPreferences(updatedPreferences);
    }
    setErrorMessage(''); 
  };

  const handleNextClick = () => {
    if (selectedCulturalPreferences.length === 0) {
      setErrorMessage('Please select at least one cultural preference to proceed.');
    } else {
      setRegistrationData({
        ...registrationData,
        culturalPreferences: selectedCulturalPreferences,
      });
      navigate(
        "/logIn/createAccount/artistOrViewer/chooseInterests/experience/subscription/profileSetup/culturalPreferences/contentRecommendations"
      );
    }
  };

  return (
    <div className={styles.loginBg}>
      <div className={`container ${styles.selection}`}>
        <div className="row mb-2 justify-content-center text-center">
          <img
            src={profileImg}
            alt="Profile"
            className={`rounded-circle mt-3 ${styles.profileImage}`}
          />
          <p className="text-white mt-2">Nickname</p>
          <div className="col-12">
            <h2 className="text-white">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Perspiciatis, inventore?
            </h2>
            <p className="text-white">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio,
              optio!
            </p>

            <div className="col-12 pt-5 pb-5">
              {[
                "Macedonia",
                "Balkan",
                "European",
                "Mediterranean",
                "Global",
              ].map((preference) => (
                <React.Fragment key={preference}>
                  <input
                    className={styles.customCheck}
                    id={`${preference}`}
                    type="checkbox"
                    onChange={() =>
                      handleCheckboxChange(`${preference}`)
                    }
                    checked={selectedCulturalPreferences.includes(
                      `${preference}`
                    )}
                  />
                  <label
                    className={styles.customCheckLabel}
                    htmlFor={`${preference}`}
                  >
                    {preference}
                  </label>
                </React.Fragment>
              ))}
            </div>
            {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
            <div className="col-12 pt-1 pb-5 d-flex justify-content-center ">
              <Link
                to="/logIn/createAccount/artistOrViewer/chooseInterests/experience/subscription/profileSetup"
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

export default CulturalPreferences;
