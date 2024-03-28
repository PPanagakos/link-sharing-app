import React from "react";
import { Box, Image, Text, VStack, Center } from "@chakra-ui/react";
import icon from "../../assets/images/icon-profile-details-header.svg";
import useUserProfile from "../../hooks/useUserProfile";

function ProfileInfo() {
  const { userProfile, error } = useUserProfile();

  if (error) {
    return (
      <Center p={10}>Error loading profile. Please try again later.</Center>
    );
  }

  if (!userProfile) {
    return (
      <Center p={10}>
        Please go to Profile Details and add some info to your profile!
      </Center>
    );
  }

  return (
    <Center p={10} flexDirection="column">
      <Box
        borderRadius="full"
        border="2px"
        borderColor="var(--primary-purple-color)"
        boxSize="70px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Image
          src={userProfile?.Info?.photoURL || icon}
          alt="Profile Picture"
          boxSize="full"
          objectFit="cover"
          borderRadius="full"
        />
      </Box>
      <VStack spacing={2} mt={4} textAlign="center">
        <Text fontSize="2xl" fontWeight="bold">
          {userProfile.Info.firstName} {userProfile.Info.lastName}
        </Text>
        <Text fontSize="sm" color="gray.500">
          {userProfile.Info.email}
        </Text>
      </VStack>
    </Center>
  );
}

export default ProfileInfo;
