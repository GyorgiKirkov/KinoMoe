import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRegistration } from "../../RegistrationContext/RegistrationContext";
import profileImg from "../../../../../public/img/ProfileImg.png";
import styles from "./privacySettings.module.css";

const PrivacySettings: React.FC = () => {
  const { registrationData, setRegistrationData } = useRegistration();
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState<string>(registrationData.privacySetting || "");

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    setRegistrationData({ ...registrationData, privacySetting: option });
  };

  const handleSubmit = () => {
    localStorage.setItem('registrationData', JSON.stringify(registrationData));
    navigate("/logIn/createAccount/artistOrViewer/chooseInterests/experience/subscription/profileSetup/culturalPreferences/contentRecommendations/notificationPreferences/privacySettings/singUpDetailsSummary");
  };

  return (
    <div className={styles.loginBg}>
      <div className={`container ${styles.selection}`}>
        <div className="row mb-2 justify-content-center text-center">
          <img
            src={profileImg}
            alt="Profile"
            className="rounded-circle mt-3"
            style={{ width: '180px', height: '150px' }}
          />

          <div className="col-12">
            <h2 className={`mb-0 ${styles.h2Ps}`}>Select your privacy settings</h2>
            <p className="text-white">Choose who sees your profile:</p>

            <div className="col-12 mb-5 mt-5">
              <input
                className={styles.customCheck}
                id="marking_01"
                type="radio"
                name="privacy"
                checked={selectedOption === "friends"}
                onChange={() => handleOptionChange("friends")}
              />
              <label
                className={styles.customCheckLabel}
                htmlFor="marking_01"
              >
                My friends
              </label>

              <input
                className={styles.customCheck}
                id="marking_02"
                type="radio"
                name="privacy"
                checked={selectedOption === "public"}
                onChange={() => handleOptionChange("public")}
              />
              <label
                className={styles.customCheckLabel}
                htmlFor="marking_02"
              >
                Public
              </label>

              <input
                className={styles.customCheck}
                id="marking_03"
                type="radio"
                name="privacy"
                checked={selectedOption === "only_me"}
                onChange={() => handleOptionChange("only_me")}
              />
              <label
                className={styles.customCheckLabel}
                htmlFor="marking_03"
              >
                Only me
              </label>
            </div>

            <div className="d-flex justify-content-center">
              <Link
                to="/logIn/createAccount/artistOrViewer/chooseInterests/experience/subscription/profileSetup/culturalPreferences/contentRecommendations/notificationPreferences"
                style={{ color: '#ffffff', textDecoration: 'none' }}
              >
                <button type="button" className="btn btn-success mx-2 px-4">
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    style={{ color: '#ffffff', marginRight: '15px' }}
                  />
                  Back
                </button>
              </Link>
              <button
                type="button"
                className="btn btn-success mx-2 px-4"
                onClick={handleSubmit}
              >
                Next
                <FontAwesomeIcon
                  icon={faArrowRight}
                  style={{ color: '#ffffff', marginLeft: '15px' }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;
