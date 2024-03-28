import React from "react";
import rightArrow from "../../assets/images/icon-arrow-right.svg";
import { Flex, Image, Text, Box } from "@chakra-ui/react";

const PlatformItem = ({ platform, url }) => {
  const handleOpenUrl = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Box onClick={handleOpenUrl} cursor="pointer">
      <Flex
        width="200px"
        height="35px"
        alignItems="center"
        justifyContent="space-between"
        bg={platform.color}
        p={2}
        borderRadius="md"
      >
        <Flex alignItems="center">
          <Image
            src={platform.image}
            alt={platform.label}
            boxSize="15px"
            mr="1"
            filter="brightness(0) invert(1)"
          />
          <Text fontSize="0.6rem" color="white">
            {platform.label}
          </Text>
        </Flex>
        <Image src={rightArrow} alt="right arrow" boxSize="15px" />
      </Flex>
    </Box>
  );
};

export default PlatformItem;
