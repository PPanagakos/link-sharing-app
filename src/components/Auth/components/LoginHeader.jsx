import React from "react";
import CustomizableCard from "../../Cards/CustomizableCard";
import { VStack, useBreakpointValue } from "@chakra-ui/react";

function LoginHeader() {
  const paddingValue = useBreakpointValue({ base: 5, md: 1 });
  const marginLeftValue = useBreakpointValue({ base: "0", md: "170px" });
  const paddingBottomValue = "0";

  return (
    <VStack
      spacing={0}
      p={paddingValue}
      marginLeft={marginLeftValue}
      paddingBottom={paddingBottomValue}
    >
      <CustomizableCard
        title="Login"
        description="Add your details below to get back into the app"
      />
    </VStack>
  );
}

export default LoginHeader;
