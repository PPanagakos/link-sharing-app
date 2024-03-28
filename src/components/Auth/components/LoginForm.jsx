import React, { useState } from "react";
import { VStack, Box, useToast } from "@chakra-ui/react";
import "../styles/Auth.css";
import { useAuth } from "../../../hooks/useAuth";
import CustomInputField from "../../InputField/CustomInputField";
import emailIcon from "../../../assets/images/icon-email.svg";
import passwordIcon from "../../../assets/images/icon-password.svg";
import CustomButton from "../../Button/CustomButton";
import AuthFormFooter from "./AuthFormFooter";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const { login, authError } = useAuth();
  const toast = useToast();

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
          <CustomButton className="secondaryButton fontSemiBold auth-button">
            Login
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
