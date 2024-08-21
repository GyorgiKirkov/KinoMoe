import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import stylesArtist from './artistOrViewer.module.css';
import artistImg from '../../../../../public/img/artist.png';
import artistImgChecked from '../../../../../public/img/artistCheck.png';
import viewerImg from '../../../../../public/img/viewer.png';
import viewerImgCheck from '../../../../../public/img/viewerCheck.png';
import { useRegistration } from '../../RegistrationContext/RegistrationContext';

const ArtistViewer: React.FC = () => {
  const { registrationData, setRegistrationData } = useRegistration();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleOptionSelect = (option: 'artist' | 'viewer') => {
    setRegistrationData({ viewerOrArtist: option });
    setErrorMessage('');
  };

  const handleNextClick = () => {
    if (!registrationData.viewerOrArtist) {
      setErrorMessage('Please select an option to proceed.');
    } else {
      navigate("/logIn/createAccount/artistOrViewer/chooseInterests");
    }
  };

  return (
    <div className={stylesArtist.loginBg}>
      <div className={`container ${stylesArtist.selection}`}>
        <div className="moviesChoice row text-center">
          <h4>Join as a viewer or artist:</h4>

          <div className="col-12 pt-5 pb-5 d-flex justify-content-center">
            <div>
              <input
                className={stylesArtist.customCheck}
                id="marking_01"
                type="checkbox"
                checked={registrationData.viewerOrArtist === 'artist'}
                onChange={() => handleOptionSelect('artist')}
              />
              <label className={stylesArtist.customCheckLabel} htmlFor="marking_01">
                {registrationData.viewerOrArtist === 'artist' ? (
                  <img src={artistImgChecked} alt="Artist" />
                ) : (
                  <img src={artistImg} alt="Artist" />
                )}
              </label>
            </div>
            <div>
              <input
                className={stylesArtist.customCheck}
                id="marking_02"
                type="checkbox"
                checked={registrationData.viewerOrArtist === 'viewer'}
                onChange={() => handleOptionSelect('viewer')}
              />
              <label className={stylesArtist.customCheckLabel} htmlFor="marking_02">
                {registrationData.viewerOrArtist === 'viewer' ? (
                  <img src={viewerImgCheck} alt="Viewer" />
                ) : (
                  <img src={viewerImg} alt="Viewer" />
                )}
              </label>
            </div>
          </div>
        </div>
        {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
        <div className="d-flex justify-content-center">
          <Link to="/logIn/createAccount" style={{ color: '#ffffff', textDecoration: 'none' }}>
            <button type="button" className="btn btn-success mx-2 px-4">
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

export default ArtistViewer;
