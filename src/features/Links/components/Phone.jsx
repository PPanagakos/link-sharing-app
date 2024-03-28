import React from "react";
import { Box, Image, Text, VStack, Center } from "@chakra-ui/react";
import phoneImg from "../../../assets/images/illustration-phone-mockup.svg";
import useUserProfile from "../../../hooks/useUserProfile";
import ProfileLinks from "../../Profile/ProfileLinks";
import useLinksManager from "../../../hooks/useLinksManager";

function Phone() {
  const { userProfile } = useUserProfile();
  const { links } = useLinksManager();

  return (
    <Center
      backgroundColor="#FFF"
      w="600px"
      height="750px"
      justifyContent="center"
      alignItems="center"
      position="relative"
      marginLeft="20px"
    >
      <Image src={phoneImg} alt="Phone" maxHeight={550} position="relative" />
      <VStack
        backgroundColor="white"
        position="absolute"
        top="210px"
        left="50%"
        transform="translate(-50%, -28%)"
        align="center"
        height="270px"
        width="200px"
        padding="30px"
      >
        {userProfile?.Info?.photoURL ? (
          <Image
            src={userProfile.Info.photoURL}
            alt="Profile Picture"
            boxSize="70px"
            objectFit="cover"
            borderRadius="full"
          />
        ) : (
          <Box
            border="2px solid var(--primary-purple-color)"
            boxSize="70px"
            borderRadius="full"
          />
        )}
        <Text fontSize="large" noOfLines={1} backgroundColor="white">
          {userProfile?.Info?.firstName} {userProfile?.Info?.lastName}
        </Text>
        <Text fontSize="12px" noOfLines={1} backgroundColor="white">
          {userProfile?.Info?.email}
        </Text>
        <Box
          position="absolute"
          top="200px"
          background={links ? "white" : "transparent"}
          padding={links ? "20px" : "0px"}
          left="50%"
          transform="translateX(-50%)"
          zIndex="1"
          width="230px"
          maxHeight="270px"
          overflowY="scroll"
        >
          <ProfileLinks />
        </Box>
      </VStack>
    </Center>
  );
}

export default Phone;
