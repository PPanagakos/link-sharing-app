import React from "react";
import { Image, Center, Box, Text, Heading } from "@chakra-ui/react";
import Icon from "../../../assets/images/illustration-empty.svg";

function LetsGetYouStarted() {
  const addNewLinkText =
    'Use the "Add new link" button to get started. Once you have more than one link, you can reorder and edit them. We\'re here to help you share your profiles with everyone!';
  return (
    <Box p={{ base: "0", md: "100px" }} bg="#FAFAFA">
      <Center>
        <Image
          src={Icon}
          alt="Let's get started illustration"
          maxW="100"
          transform={{ md: "scale(2)" }}
          marginBottom={{ md: "40px" }}
          marginTop="20px"
        />
      </Center>
      <Heading
        as="h3"
        textAlign="center"
        fontSize={{ base: "22px", md: "24px" }}
        py={5}
        fontWeight="bold"
      >
        Let's get you started
      </Heading>
      <Text
        textAlign="center"
        fontSize="0.9rem"
        maxWidth="400px"
        px={3}
        color="gray.600"
      >
        {addNewLinkText}
      </Text>
    </Box>
  );
}

export default LetsGetYouStarted;
