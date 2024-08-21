import React, { useRef, useState, ChangeEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft, faCamera } from "@fortawesome/free-solid-svg-icons";
import styles from "./profileSetup.module.css";
import profileImg from "../../../../../public/img/ProfileImg.png";
import { useRegistration } from "../../RegistrationContext/RegistrationContext";

const ProfileSetup: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string>(profileImg);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { registrationData, setRegistrationData } = useRegistration();
  const [formValid, setFormValid] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setSelectedImage(reader.result as string);
          setRegistrationData({ profileImage: reader.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRegistrationData({ [name]: value });
  };


  useEffect(() => {
    const { email, password, confirmPassword, about, fullname, username } = registrationData;
    const isFormValid = email.trim() !== '' && password.trim() !== '' && confirmPassword.trim() !== '' && about.trim() !== '' && fullname.trim() !== '' && username.trim() !== '';
    setFormValid(isFormValid);
  }, [registrationData]);

  const handleNextClick = () => {
    if (formValid) {
      navigate("/logIn/createAccount/artistOrViewer/chooseInterests/experience/subscription/profileSetup/culturalPreferences");
    }
  };

  return (
    <div className={styles.loginBg}>
      <div className={`container align-self-center ${styles.selection}`} style={{ width: "1596px" }}>
        <div className="moviesChoice row mb-2">
          <div className={`col-5 ${styles.imgButton}`}>
            <div className={`${styles.boxImg}`} style={{ position: "relative", display: "inline-block" }}>
              <img
                src={selectedImage}
                alt="Profile"
                className="rounded-circle mt-3"
                style={{ width: "300px", height: "300px" }}
              />
              <button onClick={() => fileInputRef.current?.click()} className={`${styles.btnImg}`}>
                Upload Photo <FontAwesomeIcon icon={faCamera} style={{ color: "#f5f5f5" }} />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileInputChange}
              />
            </div>
          </div>

          <form className="col">
            <div className="form-row">
              <div className="form-group col-md-6 w-100">
                <label htmlFor="inputFullName"></label>
                <input
                  type="text"
                  className="form-control"
                  id="inputFullName"
                  name="fullname"
                  placeholder="Full Name"
                  value={registrationData.fullname}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-6 w-100">
                <label htmlFor="inputUsername"></label>
                <input
                  type="text"
                  className="form-control"
                  id="inputUsername"
                  name="username"
                  placeholder="Username"
                  value={registrationData.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-6 w-100">
                <label htmlFor="inputEmail4"></label>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail4"
                  name="email"
                  placeholder="Email"
                  value={registrationData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-6 w-100">
                <label htmlFor="inputPassword4"></label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword4"
                  name="password"
                  placeholder="Password"
                  value={registrationData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-6 w-100">
                <label htmlFor="inputConfirmPassword4"></label>
                <input
                  type="password"
                  className="form-control"
                  id="inputConfirmPassword4"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={registrationData.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1"></label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows={3}
                name="about"
                placeholder="Tell us about yourself...."
                value={registrationData.about}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </form>
        </div>
        <div className="col-12 mt-5 d-flex justify-content-center">
          <Link
            to="/logIn/createAccount/artistOrViewer/chooseInterests/experience/subscription"
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
          <button type="button" className="btn btn-success mx-2 px-4" onClick={handleNextClick} disabled={!formValid}>
            Next
            <FontAwesomeIcon
              icon={faArrowRight}
              style={{ color: "#ffffff", marginLeft: "15px" }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
