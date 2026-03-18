import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Stack,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";

function ProfileDetailsForm({ formData, onFieldChange, errors }) {
  const handleChange = ({ target: { name, value } }) =>
    onFieldChange(name, value);
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const fields = [
    { label: "First name", name: "firstName", placeholder: "e.g. John" },
    { label: "Last name", name: "lastName", placeholder: "e.g. Appleseed" },
    { label: "Email", name: "email", placeholder: "e.g. email@example.com" },
  ];

  return (
    <Box
      borderRadius={12}
      p={{ base: 4, md: 5 }}
      width={isLargerThan768 ? "600px" : "100%"}
      backgroundColor="#FAFAFA"
      border="1px solid"
      borderColor="#ECECF2"
    >
      <Stack direction="column" spacing={3}>
        {fields.map(({ label, name, placeholder }) => (
          <FormControl
            key={name}
            isRequired={name === "firstName" || name === "lastName"}
            isInvalid={errors[name]}
          >
            <FormLabel htmlFor={name} fontSize="0.8rem">
              {label}
            </FormLabel>
            <Input
              size="md"
              height="40px"
              id={name}
              name={name}
              type="text"
              value={formData[name]}
              onChange={handleChange}
              placeholder={placeholder}
              backgroundColor="white"
              _focus={{
                borderColor: "var(--primary-purple-color)",
                boxShadow:
                  "0 0 0 2px var(--light-purple-color), 0 0 22px 8px var(--light-purple-color)",
              }}
              borderColor={errors[name] ? "red.500" : "gray.200"}
            />
            {errors[name] && (
              <Text color="red.500" fontSize="sm">
                {errors[name]}
              </Text>
            )}
          </FormControl>
        ))}
      </Stack>
    </Box>
  );
}

export default ProfileDetailsForm;
