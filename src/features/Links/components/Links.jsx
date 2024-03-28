import React from "react";
import { Box } from "@chakra-ui/react";
import LinkItem from "./LinkItem";
import "../styles/Links.css";

function Links({ links, removeLink, updateLink }) {
  return (
    <Box className="links-container" w="100%" maxW={650}>
      {links.map((link, index) => (
        <LinkItem
          key={link.id}
          number={index + 1}
          linkData={link}
          onRemove={() => removeLink(link.id)}
          onUpdate={updateLink}
          error={link.error}
        />
      ))}
    </Box>
  );
}

export default Links;
