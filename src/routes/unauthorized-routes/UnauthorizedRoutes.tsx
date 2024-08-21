import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../../pages/home/Homepage";
import LogInPage from "../../components/LogIn/Login";
import CreateAccount from "../../components/LogIn/SingUp/CreateAccount/CreateAccount";
import ArtistOrViewer from "../../components/LogIn/SingUp/artistOrViewerLogIn/artistOrViewerLogin";
import ChooseInterests from "../../components/LogIn/SingUp/chooseInterests/chooseInterests";
import Experience from "../../components/LogIn/SingUp/experience/experience";
import Subscription from "../../components/LogIn/SingUp/subscriptionOptions/subscriptionOptions";
import ProfileSetup from "../../components/LogIn/SingUp/profileSetup/profileSetup";
import CulturalPreferences from "../../components/LogIn/SingUp/culturalPreferences/culturalPreferences";
import ContentRecommendations from "../../components/LogIn/SingUp/contentRecommendations/contentRecommendations";
import NotificationPreferences from "../../components/LogIn/SingUp/notificationPreferences/notificationPreferences";
import PrivacySettings from "../../components/LogIn/SingUp/privacySettings/privacySettings";
import SingUpDetailsSummary from "../../components/LogIn/SingUp/SingUpDetailsSummary/SingUpDetailsSummary";
import ArtistDetails from "../../components/ArtistDetails/ArtistDetails";

export const UnauthorizedRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<HomePage />} />
      <Route path="/logIn" element={<LogInPage />} />
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
      <Route path="/movieHomePage/meetArtists/:artistId" element={<ArtistDetails />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
