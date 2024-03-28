import LoginPage from "../Pages/LoginPage";
import CreateAccountPage from "../Pages/CreateAccountPage";
import LinksPage from "../Pages/LinksPage";
import ProfileDetailsPage from "../Pages/ProfileDetailsPage";
import ProfilePage from "../Pages/ProfilePage";

export const appRoutes = [
  { path: "/login", component: LoginPage, publicRoute: true },
  { path: "/create-account", component: CreateAccountPage, publicRoute: true },
  { path: "/links", component: LinksPage },
  { path: "/profile-details", component: ProfileDetailsPage },
  { path: "/profile", component: ProfilePage },
];
