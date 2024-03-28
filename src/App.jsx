import React from "react";
import "./styles/fonts.css";
import "./styles/typography.css";
import "./styles/colors.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { MainLayout } from "./layouts/MainLayout";
import { appRoutes } from "./routes";
import { Center, Spinner } from "@chakra-ui/react";

function App() {
  const { currentUser, authLoading } = useAuth();

  if (authLoading) {
    return (
      <Center h="100vh">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );
  }

  return (
    <div className="app-container">
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Navigate replace to="/links" />} />
            {appRoutes.map(({ path, component: Component, publicRoute }) =>
              publicRoute ? (
                <Route key={path} path={path} element={<Component />} />
              ) : (
                <Route
                  key={path}
                  path={path}
                  element={
                    currentUser ? (
                      <Component />
                    ) : (
                      <Navigate replace to="/login" />
                    )
                  }
                />
              )
            )}
          </Routes>
        </MainLayout>
      </Router>
    </div>
  );
}

export default App;
