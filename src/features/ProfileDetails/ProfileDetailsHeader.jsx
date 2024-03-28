import React from "react";
import { VStack } from "@chakra-ui/react";
import CustomizableCard from "../../components/Cards/CustomizableCard";

function ProfileDetailsHeader() {
  return (
    <VStack spacing={5} p={0}>
      <CustomizableCard
        title="Profile Details"
        description="Add your details to create a personal touch to your profile."
      />
    </VStack>
  );
}

export default ProfileDetailsHeader;
