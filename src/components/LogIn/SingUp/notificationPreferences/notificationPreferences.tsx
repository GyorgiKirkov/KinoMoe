import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./notificationPreferences.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRegistration } from "../../RegistrationContext/RegistrationContext";

const NotificationPreferences: React.FC = () => {
  const { registrationData, setRegistrationData } = useRegistration();
  const [selectedOptions, setSelectedOptions] = useState<string[]>(registrationData.notificationPreferences);
  const navigate = useNavigate();

  const handleCheckboxChange = (checkboxId: string) => {
    if (checkboxId === "No Notifications") {
      setSelectedOptions(["No Notifications"]);
    } else {
      setSelectedOptions((prevOptions) =>
        prevOptions.includes(checkboxId)
          ? prevOptions.filter((option) => option !== checkboxId)
          : [...prevOptions, checkboxId].filter((option) => option !== "No Notifications")
      );
    }
  };

  const handleNextClick = () => {
    if (selectedOptions.length === 0) {
      setSelectedOptions(["Sign up for Email Notifications", "App Push Notifications"]);  // why not  :D
      setRegistrationData({ notificationPreferences: ["Sign up for Email Notifications", "App Push Notifications"] });
    } else {
      setRegistrationData({ notificationPreferences: selectedOptions });
    }
    navigate("/logIn/createAccount/artistOrViewer/chooseInterests/experience/subscription/profileSetup/culturalPreferences/contentRecommendations/notificationPreferences/privacySettings");
  };

  return (
    <div className={styles.loginBg}>
      <div className={`container px-5 ${styles.selection}`}>
        <div className="moviesChoice mb-2 px-5" >
          <h2 className={`text-white ${styles.text}`}>Stay in the loop!</h2>
          <p className="text-white pb-3 pt-4">
            Set your preferences for updates and announcements.
          </p>

          <section title="squaredOne">
            <div className="row">
              <div className={`${styles.squaredOne}`}>
                <div className="col-2">
                  <input
                    type="checkbox"
                    id="Sign up for Email Notifications"
                    name="check"
                    onChange={() => handleCheckboxChange("Sign up for Email Notifications")}
                    checked={selectedOptions.includes("Sign up for Email Notifications")}
                    disabled={selectedOptions.includes("squaredThree")}
                  />
                  <label htmlFor="Sign up for Email Notifications" className="text-white"></label>
                </div>
              </div>
              <div className="col-8 d-flex align-items-center">
                <p className="text-white">Sign up for Email Notifications</p>
              </div>
            </div>
          </section>

          <section title="squaredTwo">
            <div className="row">
              <div className={`${styles.squaredTwo}`}>
                <div className="col-2">
                  <input
                    type="checkbox"
                    id="App Push Notifications"
                    name="check"
                    onChange={() => handleCheckboxChange("App Push Notifications")}
                    checked={selectedOptions.includes("App Push Notifications")}
                    disabled={selectedOptions.includes("No Notifications")}
                  />
                  <label htmlFor="App Push Notifications" className="text-white"></label>
                </div>
              </div>
              <div className="col-8 d-flex align-items-center">
                <p className="text-white">App Push Notifications</p>
              </div>
            </div>
          </section>

          <section title="squaredThree">
            <div className="row">
              <div className={`${styles.squaredThree}`}>
                <div className="col-2">
                  <input
                    type="checkbox"
                    id="No Notifications"
                    name="check"
                    onChange={() => handleCheckboxChange("No Notifications")}
                    checked={selectedOptions.includes("No Notifications")}
                  />
                  <label htmlFor="No Notifications" className="text-white"></label>
                </div>
              </div>
              <div className="col-8 d-flex align-items-center">
                <p className="text-white">No Notifications</p>
              </div>
            </div>
          </section>

          <div className="col-12 pb-5 pt-3 d-flex justify-content-center ">
            <Link
              to="/logIn/createAccount/artistOrViewer/chooseInterests/experience/subscription/profileSetup/culturalPreferences/contentRecommendations"
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
  );
};

export default NotificationPreferences;
