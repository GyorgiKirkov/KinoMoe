import React, { useState } from 'react';
import styles from './ChooseInterests.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useRegistration } from '../../RegistrationContext/RegistrationContext';

const ChooseInterests: React.FC = () => {
  const { registrationData, setRegistrationData } = useRegistration();
  const [showAdditionalOptions, setShowAdditionalOptions] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const userId = "user123"; // Replace this with the actual user ID

  const handleMoreOptionsChange = () => {
    setShowAdditionalOptions(!showAdditionalOptions);
  };

  const handleInterestChange = (interest: string) => {
    const updatedInterests = registrationData.interests.includes(interest)
      ? registrationData.interests.filter((i) => i !== interest)
      : [...registrationData.interests, interest];
    setRegistrationData({ interests: updatedInterests });
  };

  const handleNextClick = () => {
    if (registrationData.interests.length === 0) {
      setErrorMessage('Please select at least one interest.');
    } else {
      navigate("/logIn/createAccount/artistOrViewer/chooseInterests/experience");
    }
  };

  return (
    <div className={styles.loginBg}>
      <div className={`container ${styles.selection}`}>
        <div className="moviesChoice row">
          <h2 className='text-white'>
            Tell us what movies you like, Select your interests to tailor your Kinomoe universe
          </h2>

          <div className="col-12 pt-5 pb-5 text-center">
            {['Cinema', 'Visual Arts', 'Dance', 'Theatre', 'Music', 'Literature'].map((interest, index) => (
              <React.Fragment key={`${userId}_interest_${index}`}>
                <input
                  className={styles.customCheck}
                  id={`${userId}_interest_${index}`}
                  type="checkbox"
                  checked={registrationData.interests.includes(interest)}
                  onChange={() => handleInterestChange(interest)}
                />
                <label
                  className={styles.customCheckLabel}
                  htmlFor={`${userId}_interest_${index}`}
                >
                  {interest}
                </label>
              </React.Fragment>
            ))}

            <input
              className={styles.customCheck}
              id={`${userId}_more_options`}
              type="checkbox"
              checked={showAdditionalOptions}
              onChange={handleMoreOptionsChange}
            />
            <label
              className={styles.customCheckLabel}
              htmlFor={`${userId}_more_options`}
            >
              More Options
            </label>

            {showAdditionalOptions && (
              <div className="col-12">
                {['Label for Check 8', 'Label for Check 9', 'Label for Check 10', 'Label for Check 11', 'Label for Check 12'].map(
                  (label, index) => (
                    <React.Fragment key={`${userId}_additional_${index}`}>
                      <input
                        className={styles.customCheck}
                        id={`${userId}_additional_${index}`}
                        type="checkbox"
                        checked={registrationData.interests.includes(label)}
                        onChange={() => handleInterestChange(label)}
                      />
                      <label
                        className={styles.customCheckLabel}
                        htmlFor={`${userId}_additional_${index}`}
                      >
                        {label}
                      </label>
                    </React.Fragment>
                  )
                )}
              </div>
            )}
          </div>
        </div>
        {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
        <div className="d-flex justify-content-center">
          <Link to="/logIn/createAccount/artistOrViewer" style={{ color: '#ffffff', textDecoration: 'none' }}>
            <button type="button" className="btn btn-success mx-2 px-4 ">
              <FontAwesomeIcon icon={faArrowLeft} style={{ color: '#ffffff', marginRight: '15px' }} />
              Back
            </button>
          </Link>
          <button
            type="button"
            className="btn btn-success mx-2 px-4"
            onClick={handleNextClick}
          >
            Next
            <FontAwesomeIcon icon={faArrowRight} style={{ color: '#ffffff', marginLeft: '15px' }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChooseInterests;
