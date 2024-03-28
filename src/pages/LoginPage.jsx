import React, { useEffect } from "react";
import LoginHeader from "../components/Auth/components/LoginHeader";
import LoginForm from "../components/Auth/components/LoginForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Box, Flex, VStack, useBreakpointValue } from "@chakra-ui/react";

function LoginPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const flexDirectionValue = useBreakpointValue({ base: "column", md: "row" });
  const bgValue = useBreakpointValue({
    base: "white",
    md: "rgb(244, 240, 240)",
  });
  const widthValue = useBreakpointValue({ base: "auto", md: "500px" });
  const boxShadowValue = useBreakpointValue({ base: "none", md: "md" });
  const borderRadiusValue = useBreakpointValue({ base: "none", md: "8px" });
  const marginTopValue = useBreakpointValue({ base: "4", md: "0" });
  const marginBottomValue = useBreakpointValue({ base: "150px", md: "100px" });

  useEffect(() => {
    if (currentUser) {
      navigate("/links");
    }
  }, [currentUser, navigate]);

  return (
    <Box
      height="650px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bg={bgValue}
    >
      <Flex
        direction={flexDirectionValue}
        align="center"
        justify="center"
        bg="white"
        w={widthValue}
        boxShadow={boxShadowValue}
        borderRadius={borderRadiusValue}
        p="4"
        mt={marginTopValue}
        marginBottom={marginBottomValue}
      >
        <VStack spacing="0" width="100%">
          <LoginHeader />
          <LoginForm />
        </VStack>
      </Flex>
    </Box>
  );
}

export default LoginPage;
