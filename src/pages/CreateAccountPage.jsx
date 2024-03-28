import React from "react";
import CreateAccountHeader from "../components/Auth/components/CreateAccountHeader";
import CreateAccountForm from "../components/Auth/components/CreateAccountForm";
import { Flex, Box, useBreakpointValue } from "@chakra-ui/react";

function CreateAccountPage() {
  const justifyContentValue = useBreakpointValue({
    base: "flex-start",
    md: "center",
  });
  const marginTopValue = useBreakpointValue({ base: "0", md: "50px" });
  const backgroundColorValue = useBreakpointValue({
    base: "white",
    md: "rgb(244, 240, 240)",
  });
  const widthValue = useBreakpointValue({ base: "auto", md: "500px" });
  const boxShadowValue = useBreakpointValue({ base: "none", md: "md" });
  const borderRadiusValue = useBreakpointValue({ base: "none", md: "8px" });
  const marginBottomValue = useBreakpointValue({ base: "0", md: "50px" });

  return (
    <Box
      height="600px"
      display="flex"
      flexDirection="column"
      justifyContent={justifyContentValue}
      alignItems="center"
      marginTop={marginTopValue}
      bg={backgroundColorValue}
    >
      <Flex
        direction="column"
        align="center"
        justify="center"
        bg="white"
        w={widthValue}
        boxShadow={boxShadowValue}
        borderRadius={borderRadiusValue}
        p="2"
        mt={{ base: "4", md: "0" }}
        marginBottom={marginBottomValue}
      >
        <CreateAccountHeader />
        <CreateAccountForm />
      </Flex>
    </Box>
  );
}

export default CreateAccountPage;
