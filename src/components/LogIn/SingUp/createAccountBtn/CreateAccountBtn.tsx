// CreateAccount.tsx
import React, { useEffect } from "react";
import { useRegistration } from "../../RegistrationContext/RegistrationContext";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./CreateAccount.module.css";

const CreateAccountBtn: React.FC = () => {
  const { resetRegistrationData } = useRegistration();

  useEffect(() => {
    resetRegistrationData();
  }, [resetRegistrationData]);

  return (
    <div>
      <p>Start your registration process by selecting an option below.</p>
      <div className={`container text-center ${style.createAccountBtn}`}>
        <h1>Create a New Account</h1>
      </div>
    </div>
  );
};

export default CreateAccountBtn;
