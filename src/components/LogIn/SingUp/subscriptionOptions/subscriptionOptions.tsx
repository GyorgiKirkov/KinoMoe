import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./subscriptionOptions.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { RegistrationContext } from "../../RegistrationContext/RegistrationContext";

const Subscription: React.FC = () => {
  const context = useContext(RegistrationContext);
  

  if (!context || !context.registrationData) {
    throw new Error('RegistrationContext or registrationData is undefined');
  }

  const { registrationData, setRegistrationData } = context;
  const [selectedOption, setSelectedOption] = useState<string>(registrationData.subscriptionOption || "");
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleOptionClick = (option: string) => {
    const newOption = option === selectedOption ? "" : option;
    setRegistrationData({ ...registrationData, subscriptionOption: newOption });
    setSelectedOption(newOption);
    setErrorMessage('');
  };

  const handleNextClick = () => {
    if (!selectedOption) {
      setErrorMessage('Please select a subscription option to proceed.');
    } else {
      navigate("/logIn/createAccount/artistOrViewer/chooseInterests/experience/subscription/profileSetup");
    }
  };

  return (
    <div className={styles.loginBg}>
      <div className={`container ${styles.selection}`}>
        <div className="moviesChoice row mb-2">
          <div className="payoption container">
            <div className="row justify-content-center align-self-stretch my-5">
              <div className={`col-4 p-4 ${selectedOption === "ads" ? styles.selectedCard : ""}`} onClick={() => handleOptionClick("ads")}>
                <div className={styles.card}>
                  <div className="card bg-transparent text-white border-0">
                    <div className={`card-header ${styles.card_header}`}>
                      Watch with ads
                    </div>
                    <div className="card-body border-0">
                      <h5 className={`card-title border-0 ${styles.card_title}`}>
                        Free
                      </h5>
                      <ul className={`mb-4 ${styles.text}`}>
                        <li>Access to a Vast Library</li>
                        <li>Unlimited Streaming</li>
                        <li>Multiple Devices</li>
                        <li>No Subscription Fee</li>
                      </ul>
                    </div>
                    <div className="card-footer border-0">
                      <button type="button" className={`btn btn-primary btn-lg btn-block border-0 w-100 mt-4 ${styles.btnLendingOne}`}>
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`col-4 p-4 ${selectedOption === "without_ads" ? styles.selectedCard : ""}`} onClick={() => handleOptionClick("without_ads")}>
                <div className={styles.card}>
                  <div className={`card mb-3 bg-transparent border-0 text-white ${styles.carBox}`}>
                    <div className={styles.optionalChoice}>Optional choice</div>
                    <div className={`card-header ${styles.card_header}`}>
                    Pay to watch
                    </div>
                    <div className="card-body border-0">
                      <h5 className={`card-title border-0 ${styles.card_title}`}>
                        499den./month
                      </h5>
                      <ul className={styles.text}>
                        <li>Access to a Vast Library</li>
                        <li>Unlimited Streaming</li>
                        <li>Multiple Devices</li>
                        <li>Watch without ads</li>
                        <li>Offline Viewing</li>
                      </ul>
                    </div>
                    <div className="card-footer border-0">
                      <button type="button" className={`btn btn-primary btn-lg btn-block border-0 w-100 ${styles.btnLending}`}>
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`col-4 p-4 ${selectedOption === "with_points" ? styles.selectedCard : ""}`} onClick={() => handleOptionClick("with_points")}>
                <div className={styles.card}>
                  <div className="card mb-3 bg-transparent text-white border-0">
                    <div className={`card-header ${styles.card_header}`}>
                    Engage and receive points
                    </div>
                    <div className="card-body border-0">
                      <h5 className={`card-title border-0 ${styles.card_title}`}>
                        Watch with points
                      </h5>
                      <ul className={`mb-4 ${styles.text}`}>
                        <li>Earn points when you engage</li>
                        <li>Claim rewards with earned points</li>
                        <li>No Subscription Fee</li>
                      </ul>
                    </div>
                    <div className="card-footer border-0">
                      <button type="button" className={`btn btn-primary btn-lg btn-block border-0 w-100 mt-5 ${styles.btnLendingThree}`}>
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12">
            {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
            <div className="d-flex justify-content-center">
              <Link
                to="/logIn/createAccount/artistOrViewer/chooseInterests/experience"
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

export default Subscription;
