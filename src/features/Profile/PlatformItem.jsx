import React from "react";
import rightArrow from "../../assets/images/icon-arrow-right.svg";
import { Flex, Image, Text, Box } from "@chakra-ui/react";

const PlatformItem = ({ platform, url }) => {
  if (!url) return null;

  const handleOpenUrl = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Box
      as="button"
      type="button"
      onClick={handleOpenUrl}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleOpenUrl();
        }
      }}
      cursor="pointer"
      borderRadius="md"
      _focusVisible={{
        outline: "2px solid var(--primary-purple-color)",
        outlineOffset: "2px",
      }}
      _hover={{ opacity: 0.9 }}
      transition="opacity 0.2s ease"
      width="100%"
    >
      <Flex
        width="100%"
        minHeight="46px"
        alignItems="center"
        justifyContent="space-between"
        bg={platform.color}
        p={3}
        borderRadius="md"
      >
        <Flex alignItems="center">
          <Image
            src={platform.image}
            alt={platform.label}
            boxSize="16px"
            mr={2}
            filter="brightness(0) invert(1)"
          />
          <Text fontSize="0.8rem" color="white" fontWeight="500">
            {platform.label}
          </Text>
        </Flex>
        <Image src={rightArrow} alt="right arrow" boxSize="16px" />
      </Flex>
    </Box>
  );
};

export default PlatformItem;
