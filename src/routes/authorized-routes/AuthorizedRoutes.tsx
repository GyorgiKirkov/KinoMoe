import { Navigate, Route, Routes } from "react-router-dom";
import Profile from "../../components/LogIn/ProfileDetails/Profile";
import MoviePlayer from "../../components/video/MoviePlayer";
import MoviesHomePage from "../../pages/MoviesHomePage/MoviesHomePage";
import Community from "../../pages/Community/Community";
import Post from "../../pages/Post/PostPage";
 


export const AuthorizedRoutes = () => {
  return (
    <Routes>
      <Route path="/movies" element={<MoviesHomePage />} />
      <Route path="/movie/:id" element={<MoviePlayer />} />
      <Route path="/logIn/Profile/:userId" element={<Profile />} />
      <Route path="Community/:userId" element={<Community />} />
      <Route path="Community/Posts/:userId" element={<Post />} />
      <Route path="*" element={<Navigate to="/movies" />} />
    </Routes>
  );
};
