import React from "react";
import { Text, Heading, Box, useMediaQuery } from "@chakra-ui/react";
import CustomButton from "../Button/CustomButton";

function CustomizableCard({ title, description, buttonText, onButtonClick }) {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  return (
    <Box w={isLargerThan768 && "600px"}>
      <Heading as="h3" fontSize={22} py={3}>
        {title}
      </Heading>
      <Text fontSize={15} className="secondary-black" mb={8}>
        {description}
      </Text>
      {buttonText && onButtonClick && (
        <CustomButton
          onClick={onButtonClick}
          className="primaryButton fontSemiBold"
        >
          {buttonText}
        </CustomButton>
      )}
    </Box>
  );
}

export default CustomizableCard;
