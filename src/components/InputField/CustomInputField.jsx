import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Image,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";

const CustomInputField = ({
  id,
  label,
  iconSrc,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  error,
}) => {
  const [isLessThan768] = useMediaQuery("(max-width: 768px)");

  // Adjust placeholder based on error status and screen width
  const adjustedPlaceholder = error && isLessThan768 ? "" : placeholder;

  return (
    <FormControl id={id} isInvalid={!!error}>
      <FormLabel fontSize="sm" color={error ? "red.500" : "gray.700"}>
        {label}
      </FormLabel>
      <InputGroup>
        {iconSrc && (
          <InputLeftElement pointerEvents="none">
            <Image src={iconSrc} alt={`${id}-icon`} boxSize="4" />
          </InputLeftElement>
        )}
        <Input
          type={type}
          placeholder={adjustedPlaceholder}
          borderColor={error ? "red.500" : "gray.200"}
          _hover={{ borderColor: error ? "red.600" : "gray.300" }}
          _focus={{
            borderColor: "var(--primary-purple-color)",
            boxShadow: error
              ? "none"
              : "0 0 0 2px var(--light-purple-color), 0 0 22px 8px var(--light-purple-color)",
          }}
          value={value}
          onChange={onChange}
          name={name}
          paddingRight={iconSrc ? "40px" : "16px"}
        />
      </InputGroup>
      {error && (
        <Text
          position="absolute"
          right="0"
          top="70%"
          transform="translateY(-50%)"
          color="red.500"
          fontSize="xs"
          paddingRight="3"
          zIndex="1000"
        >
          {error}
        </Text>
      )}
    </FormControl>
  );
};

export default CustomInputField;
