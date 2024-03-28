import React from "react";
import { VStack, Text, Button, Box, useMediaQuery } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";

function AuthFormFooter({ text, buttonText, buttonLink }) {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  return (
    <Box textAlign="center" m="20px">
      <VStack
        m="5"
        mx={isLargerThan768 && "50px"}
        maxW={isLargerThan768 ? "300px" : "250px"}
        fontSize="0.85rem"
        className="fontRegular"
      >
        <Text>
          {text}
          <Button
            as={RouterLink}
            to={buttonLink}
            color="var(--primary-purple-color)"
            fontSize="0.8rem"
            backgroundColor="#FFF"
          >
            {buttonText}
          </Button>
        </Text>
      </VStack>
    </Box>
  );
}

AuthFormFooter.propTypes = {
  text: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonLink: PropTypes.string.isRequired,
};

export default AuthFormFooter;
