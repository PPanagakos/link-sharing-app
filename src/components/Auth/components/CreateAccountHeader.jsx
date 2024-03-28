import React from "react";
import { VStack, useBreakpointValue } from "@chakra-ui/react";
import CustomizableCard from "../../Cards/CustomizableCard";

function CreateAccountHeader() {
  const paddingValue = useBreakpointValue({ base: 5, md: 1 });
  const marginLValue = useBreakpointValue({ md: "200px" });
  const marginRValue = useBreakpointValue({ base: "30px" });

  return (
    <VStack
      spacing={5}
      p={paddingValue}
      marginLeft={marginLValue}
      marginRight={marginRValue}
    >
      <CustomizableCard
        title="Create Account"
        description="Let's get you started sharing your links!"
      />
    </VStack>
  );
}

export default CreateAccountHeader;
