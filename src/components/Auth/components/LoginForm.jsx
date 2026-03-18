import React, { useState } from "react";
import { VStack, Box, useToast } from "@chakra-ui/react";
import "../styles/Auth.css";
import { useAuth } from "../../../hooks/useAuth";
import CustomInputField from "../../InputField/CustomInputField";
import emailIcon from "../../../assets/images/icon-email.svg";
import passwordIcon from "../../../assets/images/icon-password.svg";
import CustomButton from "../../Button/CustomButton";
import AuthFormFooter from "./AuthFormFooter";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const [demoLoading, setDemoLoading] = useState(false);
  const { login, loginWithDemoAccount, authError } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const handleInputChange = ({ target: { name, value } }) => {
    setFormData({ ...formData, [name]: value });
    if (formErrors[name]) setFormErrors({ ...formErrors, [name]: "" });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.email) errors.email = "Email can't be empty";
    if (!formData.password) errors.password = "Please check again";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      await login(formData.email, formData.password);
      toast({
        title: "Logged in successfully.",
        description: "You are now logged in.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      setFormErrors({
        ...formErrors,
        password: "Please check again",
      });
      toast({
        title: "Login failed",
        description: authError,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDemoLogin = async () => {
    try {
      setDemoLoading(true);
      await loginWithDemoAccount();
      toast({
        title: "Demo account ready",
        description: "Signed in with demo data so you can explore the app.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      const canUsePublicDemoFallback =
        error?.code === "auth/operation-not-allowed" ||
        error?.code === "auth/admin-restricted-operation" ||
        error?.code === "auth/unauthorized-domain" ||
        error?.code === "auth/network-request-failed" ||
        error?.code === "permission-denied" ||
        error?.code === "failed-precondition" ||
        error?.code === "unauthenticated";

      if (canUsePublicDemoFallback) {
        toast({
          title: "Demo preview mode",
          description:
            "Authentication is unavailable right now. Opened a public demo profile instead.",
          status: "info",
          duration: 5000,
          isClosable: true,
        });
        navigate("/demo");
        return;
      }

      toast({
        title: "Demo login failed",
        description:
          authError ||
          error?.message ||
          "Unable to access the demo account right now.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setDemoLoading(false);
    }
  };

  return (
    <Box width="100%" maxWidth="500px" mx="auto" px={5}>
      <form onSubmit={handleSubmit}>
        <VStack spacing="4">
          <CustomInputField
            id="email"
            label="Email address"
            iconSrc={emailIcon}
            type="email"
            placeholder="e.g. alex@email.com"
            value={formData.email}
            onChange={handleInputChange}
            name="email"
            error={formErrors.email}
          />
          <CustomInputField
            id="password"
            label="Password"
            iconSrc={passwordIcon}
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            name="password"
            error={formErrors.password}
          />
          <CustomButton
            type="submit"
            className="secondaryButton fontSemiBold auth-button"
          >
            Login
          </CustomButton>
          <CustomButton
            type="button"
            className="primaryButton fontSemiBold auth-button"
            onClick={handleDemoLogin}
            disabled={demoLoading}
          >
            {demoLoading ? "Signing in..." : "Try Demo Account"}
          </CustomButton>
        </VStack>
      </form>
      <AuthFormFooter
        text="Don't have an account?"
        buttonText="Create account"
        buttonLink="/create-account"
      />
    </Box>
  );
};

export default LoginForm;
