// App.tsx or RegistrationProcess.tsx (depending on your structure)
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RegistrationProvider } from "../RegistrationContext/RegistrationContext";
import Experience from "../SingUp/experience/experience";
import Subscription from "../SingUp/subscriptionOptions/subscriptionOptions";
import ProfileSetup from "../SingUp/profileSetup/profileSetup";
import CulturalPreferences from "../SingUp/culturalPreferences/culturalPreferences";
import ContentRecommendations from "../SingUp/contentRecommendations/contentRecommendations";
import PrivacySettings from "../SingUp/privacySettings/privacySettings";
import CreateAccount from "../SingUp/CreateAccount/CreateAccount";
import ArtistOrViewer from "../SingUp/artistOrViewerLogIn/artistOrViewerLogin";
import ChooseInterests from "../SingUp/chooseInterests/chooseInterests";
import NotificationPreferences from "../SingUp/notificationPreferences/notificationPreferences";
import SingUpDetailsSummary from "../SingUp/SingUpDetailsSummary/SingUpDetailsSummary";

const RegistrationProcess: React.FC = () => {
  return (
    <RegistrationProvider>
      <Router>
        <Routes>
          <Route path="/logIn/createAccount" element={<CreateAccount />} />
          <Route path="/logIn/createAccount/artistOrViewer" element={<ArtistOrViewer />} />
          <Route path="/logIn/createAccount/artistOrViewer/chooseInterests" element={<ChooseInterests />} />
          <Route path="/logIn/createAccount/artistOrViewer/chooseInterests/experience" element={<Experience />} />
          <Route path="/logIn/createAccount/artistOrViewer/chooseInterests/experience/subscription" element={<Subscription />} />
          <Route path="/logIn/createAccount/artistOrViewer/chooseInterests/experience/subscription/profileSetup" element={<ProfileSetup />} />
          <Route path="/logIn/createAccount/artistOrViewer/chooseInterests/experience/subscription/profileSetup/culturalPreferences" element={<CulturalPreferences />} />
          <Route path="/logIn/createAccount/artistOrViewer/chooseInterests/experience/subscription/profileSetup/culturalPreferences/contentRecommendations" element={<ContentRecommendations />} />
          <Route path="/logIn/createAccount/artistOrViewer/chooseInterests/experience/subscription/profileSetup/culturalPreferences/contentRecommendations/notificationPreferences" element={<NotificationPreferences />} />
          <Route path="/logIn/createAccount/artistOrViewer/chooseInterests/experience/subscription/profileSetup/culturalPreferences/contentRecommendations/notificationPreferences/privacySettings" element={<PrivacySettings />} />
          <Route path="/logIn/createAccount/artistOrViewer/chooseInterests/experience/subscription/profileSetup/culturalPreferences/contentRecommendations/notificationPreferences/privacySettings/singUpDetailsSummary" element={<SingUpDetailsSummary />} />
        </Routes>
      </Router>
    </RegistrationProvider>
  );
};

export default RegistrationProcess;
