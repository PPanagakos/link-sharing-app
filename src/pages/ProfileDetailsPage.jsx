import React, { useState, useEffect, useCallback } from "react";
import { Flex, Text, VStack, useToast, useMediaQuery } from "@chakra-ui/react";
import useUserProfile from "../hooks/useUserProfile";
import Phone from "../features/Links/components/Phone";
import UploadProfilePicture from "../features/ProfileDetails/UploadProfilePicture";
import ProfileDetailsHeader from "../features/ProfileDetails/ProfileDetailsHeader";
import ProfileDetailsForm from "../features/ProfileDetails/ProfileDetailsForm";
import ProfileDetailsFooter from "../features/ProfileDetails/ProfileDetailsFooter";

function ProfileDetailsPage() {
  const { userProfile, updateUserProfile } = useUserProfile();
  const [errors, setErrors] = useState({});
  const toast = useToast();
  const [isLargerThan1024] = useMediaQuery("(min-width: 1024px)");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    photoURL: "",
  });
  const [initialFormData, setInitialFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    photoURL: "",
  });

  useEffect(() => {
    if (userProfile?.Info) {
      const { firstName, lastName, email, photoURL } = userProfile.Info;
      const profileValues = { firstName, lastName, email, photoURL };
      setFormData(profileValues);
      setInitialFormData(profileValues);
    }
  }, [userProfile]);

  const hasUnsavedChanges =
    formData.firstName !== initialFormData.firstName ||
    formData.lastName !== initialFormData.lastName ||
    formData.email !== initialFormData.email ||
    formData.photoURL !== initialFormData.photoURL;

  const validateForm = useCallback(() => {
    let newErrors = {};
    if (!formData.firstName) newErrors.firstName = "Can't be empty";
    if (!formData.lastName) newErrors.lastName = "Can't be empty";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleFieldChange = useCallback((name, value) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!validateForm()) return;
    try {
      await updateUserProfile(formData);
      setInitialFormData(formData);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [formData, validateForm, updateUserProfile, toast]);

  return (
    <Flex>
      {isLargerThan1024 && <Phone />}
      <VStack
        flex="1"
        spacing={4}
        p={5}
        backgroundColor="#FFF"
        marginLeft="20px"
        marginRight="20px"
      >
        <ProfileDetailsHeader />
        <UploadProfilePicture
          onImageUpload={(url) => handleFieldChange("photoURL", url)}
          photoURL={formData.photoURL}
        />
        <ProfileDetailsForm
          formData={formData}
          onFieldChange={handleFieldChange}
          errors={errors}
        />
        <ProfileDetailsFooter onSave={handleSubmit} hasUnsavedChanges={hasUnsavedChanges} />
        {hasUnsavedChanges && (
          <Text width="100%" fontSize="xs" color="orange.500" textAlign="right">
            Unsaved changes
          </Text>
        )}
      </VStack>
    </Flex>
  );
}

export default ProfileDetailsPage;
