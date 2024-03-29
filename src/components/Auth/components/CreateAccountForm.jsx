import React, { useState } from "react";
import "../styles/Auth.css";
import CustomInputField from "../../InputField/CustomInputField";
import CustomButton from "../../Button/CustomButton";
import emailIcon from "../../../assets/images/icon-email.svg";
import passwordIcon from "../../../assets/images/icon-password.svg";
import { VStack, Box, useToast } from "@chakra-ui/react";
import AuthFormFooter from "./AuthFormFooter";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const CreateAccountForm = () => {
  const { createAccount, authError } = useAuth();
  const toast = useToast();
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setFormFields((prevState) => ({ ...prevState, [field]: value }));
    if (errors[field])
      setFormErrors((prevState) => ({ ...prevState, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formFields.email) newErrors.email = "Can't be empty";
    if (!formFields.password) newErrors.password = "Please check again";
    else if (formFields.password.length < 8)
      newErrors.password = "Password must be at least 8 characters long";
    if (formFields.password !== formFields.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      await createAccount(formFields.email, formFields.password);
      toast({
        title: "Account created.",
        description: "Your account has been successfully created",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      console.error("Failed to create an account:", error);
      toast({
        title: "Error creating account",
        description: authError,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box width="100%" maxWidth="470px" mx="auto" px={5}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={6}>
          <CustomInputField
            id="email"
            label="Email address"
            iconSrc={emailIcon}
            type="email"
            placeholder="e.g. alex@email.com"
            value={formFields.email}
            onChange={(e) => handleChange("email", e.target.value)}
            error={formErrors.email}
          />
          <CustomInputField
            id="password"
            label="Create Password"
            iconSrc={passwordIcon}
            type="password"
            placeholder="At least 8 characters"
            value={formFields.password}
            onChange={(e) => handleChange("password", e.target.value)}
            error={formErrors.password}
          />
          <CustomInputField
            id="confirm-password"
            label="Confirm Password"
            iconSrc={passwordIcon}
            type="password"
            placeholder="At least 8 characters"
            value={formFields.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
            error={formErrors.confirmPassword}
          />
          <CustomButton className="secondaryButton fontSemiBold auth-button">
            Create Account
          </CustomButton>
        </VStack>
      </form>
      <AuthFormFooter
        text="Already have an account?"
        buttonText="Login"
        buttonLink="/login"
      />
    </Box>
  );
};

export default CreateAccountForm;
