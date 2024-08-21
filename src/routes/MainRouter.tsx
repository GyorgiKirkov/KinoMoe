import { useUserStore } from "../store/user-store";
import { AuthorizedRoutes } from "./authorized-routes/AuthorizedRoutes";
import { UnauthorizedRoutes } from "./unauthorized-routes/UnauthorizedRoutes";

export const MainRouter = () => {
  const user = useUserStore((state) => state.user);

  if (user) {
    return <AuthorizedRoutes />;
  } else {
    return <UnauthorizedRoutes />;
  }
};
