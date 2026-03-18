import LoginPage from "../pages/LoginPage";
import CreateAccountPage from "../pages/CreateAccountPage";
import LinksPage from "../pages/LinksPage";
import ProfileDetailsPage from "../pages/ProfileDetailsPage";
import ProfilePage from "../pages/ProfilePage";
import DemoProfilePage from "../pages/DemoProfilePage";

export const appRoutes = [
  { path: "/login", component: LoginPage, publicRoute: true },
  { path: "/create-account", component: CreateAccountPage, publicRoute: true },
  { path: "/demo", component: DemoProfilePage, publicRoute: true },
  { path: "/links", component: LinksPage },
  { path: "/profile-details", component: ProfileDetailsPage },
  { path: "/profile", component: ProfilePage },
  { path: "/u/:userId", component: ProfilePage, publicRoute: true },
];
