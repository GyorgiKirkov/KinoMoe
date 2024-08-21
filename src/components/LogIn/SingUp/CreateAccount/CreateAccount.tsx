// CreateAccount.tsx
import React from "react";
import styles from "./CreateAccount.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

interface CreateAccountProps {}

const CreateAccount: React.FC<CreateAccountProps> = () => {
  return (
    <div className={styles.loginBg}>
      <div
        className={`text-white container ${styles.bgLogIn} ${styles.centerItems} ${styles.roundedCorner}`}
      >
        <div className="row">
          <div className={`col-6 ${styles.logoLogIn}`}>
            <p className={styles.logoText}>
              KINO<span className={styles.logoTextSpam}>MOE</span>
            </p>
          </div>
          <div className={`col-6 p-5`}>
            <div className="row">
              <div className="col-10 offset-1">
                <h2 className="text-white">Create your account!</h2>
                <button
                  type="button"
                  className={`btn border border-white text-white w-100 rounded-pill mt-2 bg-transparent ${styles.googleLogo} ${styles.costumeButton}`}
                >
                  Sign up with Google
                </button>
                <button
                  type="button"
                  className={`btn border border-white text-white w-100 rounded-pill mt-3 bg-transparent ${styles.facebookLogo} ${styles.costumeButton}`}
                >
                  Sign up with Facebook
                </button>
                <button
                  type="button"
                  className={`btn border border-white text-white w-100 rounded-pill mt-3 bg-transparent ${styles.appleLogo} ${styles.costumeButton}`}
                >
                  Sign up with Apple
                </button>
                <div className={styles.orContainer}>
                  <hr className={styles.line1} />
                  <p className="text-white text-center">or</p>
                  <hr className={styles.line2} />
                </div>
                <form>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1"></label>
                    <input
                      type="email"
                      className={`form-control rounded-pill bg-transparent text-white ${styles.customInput1}`}
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Email address"
                    />
                    <small
                      id="emailHelp"
                      className="form-text text-muted text-center"
                    ></small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1"></label>
                    <input
                      type="password"
                      className={`form-control rounded-pill bg-transparent text-white ${styles.customInput}`}
                      id="exampleInputPassword1"
                      placeholder="Password"
                    />
                  </div>
                  <Link
                    to="/logIn/createAccount/artistOrViewer"
                    className={`btn btn-success w-100 rounded-pill mt-4 ${styles.bgGreen} ${styles.customButton}`}
                  >
                    Register
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
