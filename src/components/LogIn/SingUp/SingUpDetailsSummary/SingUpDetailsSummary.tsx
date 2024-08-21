// SingUpDetailsSummary.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegistration } from '../../RegistrationContext/RegistrationContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./SingUpDetailsSummary.module.css";

const SingUpDetailsSummary: React.FC = () => {
  const { registrationData } = useRegistration();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      if (!response.ok) {
        throw new Error("Failed to save user data");
      }


      localStorage.setItem("user", JSON.stringify(registrationData));
      
     
      navigate("/logIn");
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  return (
    <div className={styles.summaryBg}>
      <div className={`container ${styles.summaryContainer}`}>
        <h2 className="text-center">Summary of Your Inputs</h2>
        <div className="row mt-4">
          <div className="col-12 text-center">
            <img
              src={registrationData.profileImage}
              alt="Profile"
              className="rounded-circle"
              style={{ width: "150px", height: "150px" }}
            />
          </div>
          <div className="col-12">
            <h6 className='text-dark'>Viewer or Artist</h6>
            <p  className='text-dark'>{registrationData.viewerOrArtist}</p>
          </div>
          <div className="col-12">
            <h6  className='text-dark'>Interests</h6>
            <p  className='text-dark'>{registrationData.interests.join(', ')}</p>
          </div>
          <div className="col-12">
            <h6  className='text-dark'>Cultural Preferences</h6>
            <p  className='text-dark'>{registrationData.culturalPreferences.join(', ')}</p>
          </div>
          <div className="col-12">
            <h6  className='text-dark'>Subscription Option</h6>
            <p  className='text-dark'>{registrationData.subscriptionOption}</p>
          </div>
          <div className="col-12">
            <h6  className='text-dark'>Email</h6>
            <p  className='text-dark'>{registrationData.email}</p>
          </div>
          <div className="col-12">
            <h6  className='text-dark'>About</h6>
            <p  className='text-dark'>{registrationData.about}</p>
          </div>
          <div className="col-12">
            <h6  className='text-dark'>Notification Preferences</h6>
            <p  className='text-dark'>{registrationData.notificationPreferences.join(', ')}</p>
          </div>
          <div className="col-12">
            <h6  className='text-dark'>Experience Option</h6>
            <p  className='text-dark'>{registrationData.experienceOption}</p>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12">
            <Link to="/logIn/createAccount/artistOrViewer/chooseInterests/experience/subscription/profileSetup/culturalPreferences/contentRecommendations/notificationPreferences/privacySettings">
              <button type="button" className="btn btn-success mx-2 px-4">
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  style={{ color: "#ffffff", marginRight: "15px" }}
                />
                Back
              </button>
            </Link>
            <button type="button" className="btn btn-success mx-2 px-4" onClick={handleSubmit}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingUpDetailsSummary;
