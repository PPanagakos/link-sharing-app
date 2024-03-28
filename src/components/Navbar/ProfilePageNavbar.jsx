import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../Button/CustomButton";
import "./Navbar.css";

function ProfilePageNavbar() {
  const navigate = useNavigate();

  const redirectHandler = () => {
    return navigate("/profile-details");
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
          <CustomButton className="secondaryButton profile-details-buttons">
            Share Link
          </CustomButton>
        </Flex>
      </Box>
    </Box>
  );
}

export default ProfilePageNavbar;
