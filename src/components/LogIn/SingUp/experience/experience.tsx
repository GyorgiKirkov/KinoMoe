import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./experience.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft, faEye } from "@fortawesome/free-solid-svg-icons";
import { useRegistration } from "../../RegistrationContext/RegistrationContext";

const Experience: React.FC = () => {
  const { registrationData, setRegistrationData } = useRegistration();
  const [showMeAround, setShowMeAround] = useState<boolean>(false);
  const [diveRightIn, setDiveRightIn] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleOptionSelect = (option: 'showMeAround' | 'diveRightIn') => {
    if (option === 'showMeAround') {
      setShowMeAround(!showMeAround);
      setDiveRightIn(false);  
    } else {
      setDiveRightIn(!diveRightIn);
      setShowMeAround(false);  
    }
    setErrorMessage('');
  };

  const handleNextClick = () => {
    if (!showMeAround && !diveRightIn) {
      setErrorMessage('Please select an option to proceed.');
    } else {
      setRegistrationData({ ...registrationData, experienceOption: showMeAround ? 'showMeAround' : 'diveRightIn' });
      navigate("/logIn/createAccount/artistOrViewer/chooseInterests/experience/subscription");
    }
  };

  return (
    <div className={styles.loginBg}>
      <div className={`container ${styles.selection}`}>
        <div className="moviesChoice row mb-2 text-center">
          <h2 className="text-white">How do you wish to engage with Kinomoe?</h2>

          <div className="col-12">
            <input
              className={styles.customCheck}
              id="marking_01"
              type="checkbox"
              checked={showMeAround}
              onChange={() => handleOptionSelect('showMeAround')}
            />
            <label
              className={`m-4 ${styles.customCheckLabel}`}
              htmlFor="marking_01"
            >
              <FontAwesomeIcon
                icon={faEye}
                style={{ color: "#ffffff", marginRight: "5px" }}
              />
              Show me around
            </label>

            <input
              className={styles.customCheck}
              id="marking_02"
              type="checkbox"
              checked={diveRightIn}
              onChange={() => handleOptionSelect('diveRightIn')}
            />
            <label
              className={styles.customCheckLabel}
              htmlFor="marking_02"
              title="Click for select/unselect"
            >
              Dive right in and explore
            </label>
          </div>
        </div>
        {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
        <div className="d-flex justify-content-center">
        <Link
          to="/logIn/createAccount/artistOrViewer/chooseInterests"
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
      </div>  </div>
  );
};

export default Experience;
