import React from "react";
import { Box, Button, Flex, Text, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../Button/CustomButton";
import "./Navbar.css";
import { useAuth } from "../../hooks/useAuth";

function ProfilePageNavbar() {
  const navigate = useNavigate();
  const toast = useToast();
  const { currentUser } = useAuth();

  const redirectHandler = () => {
    return navigate("/profile-details");
  };

  const handleShareProfile = async () => {
    if (!currentUser?.uid) return;
    const shareUrl = `${window.location.origin}/u/${currentUser.uid}`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        duration: 5000,
        isClosable: true,
        render: () => (
          <Box color="white" p={3} bg="green.500" borderRadius="md">
            <Text fontWeight="600" mb={1}>
              Profile link copied
            </Text>
            <Text fontSize="sm" noOfLines={1} mb={2}>
              {shareUrl}
            </Text>
            <Button
              size="sm"
              variant="outline"
              colorScheme="whiteAlpha"
              onClick={() => window.open(shareUrl, "_blank", "noopener,noreferrer")}
            >
              Open profile
            </Button>
          </Box>
        ),
      });
    } catch (error) {
      toast({
        title: "Unable to copy link",
        description: "Please copy it manually from the address bar.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box className="navbarBackground">
      <Box className="navbarContainer">
        <Flex className="navbarFlex">
          <CustomButton
            className="primaryButton profile-details-buttons"
            onClick={redirectHandler}
          >
            Back to Editor
          </CustomButton>
          <CustomButton
            className="secondaryButton profile-details-buttons"
            onClick={handleShareProfile}
          >
            Share Link
          </CustomButton>
        </Flex>
      </Box>
    </Box>
  );
}

export default ProfilePageNavbar;
