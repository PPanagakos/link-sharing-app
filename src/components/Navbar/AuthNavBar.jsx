import React from "react";
import devLinksLogo from "../../assets/images/logo-devlinks-large.svg";
import { Box, Image } from "@chakra-ui/react";
function AuthNavBar() {
  return (
    <Box
      bg={{ base: "#fff", md: "none" }}
      display={{ md: "flex" }}
      justifyContent="center"
    >
      <Image
        marginTop={{ base: "20px", md: "120px" }}
        marginLeft={{ base: "20px", md: "0" }}
        src={devLinksLogo}
        alt="devlinks logo"
      />
    </Box>
  );
}

export default AuthNavBar;
