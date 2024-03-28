import LoginPage from "../pages/LoginPage";
import CreateAccountPage from "../pages/CreateAccountPage";
import LinksPage from "../pages/LinksPage";
import ProfileDetailsPage from "../pages/ProfileDetailsPage";
import ProfilePage from "../pages/ProfilePage";

export const appRoutes = [
  { path: "/login", component: LoginPage, publicRoute: true },
  { path: "/create-account", component: CreateAccountPage, publicRoute: true },
  { path: "/links", component: LinksPage },
  { path: "/profile-details", component: ProfileDetailsPage },
  { path: "/profile", component: ProfilePage },
];
