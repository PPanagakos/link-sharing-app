import React from "react";
import CustomizableCard from "../../../components/Cards/CustomizableCard";
import { Box } from "@chakra-ui/react";

function LinksHeader({ addLink }) {
  return (
    <Box className="test">
      <CustomizableCard
        title="Customize your links"
        description="Add/edit/remove links below and then share all your profiles with the world!"
        buttonText="+ Add new link"
        onButtonClick={addLink}
      />
    </Box>
  );
}

export default LinksHeader;
