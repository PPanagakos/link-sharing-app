import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import LinkItem from "./LinkItem";
import "../styles/Links.css";

function Links({ links, removeLink, updateLink, reorderLinks }) {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const shouldConstrainHeight = links.length > 4;

  const handleDrop = (dropIndex) => {
    if (draggedIndex === null) return;
    reorderLinks(draggedIndex, dropIndex);
    setDraggedIndex(null);
  };

  return (
    <Box
      className="links-container"
      w="100%"
      maxW={650}
      maxH={shouldConstrainHeight ? { base: "450px", lg: "400px" } : "none"}
      overflowY={shouldConstrainHeight ? "auto" : "visible"}
    >
      {links.map((link, index) => (
        <LinkItem
          key={link.clientId}
          number={index + 1}
          index={index}
          linkData={link}
          onRemove={() => removeLink(link)}
          onUpdate={updateLink}
          error={link.error}
          onDragStart={() => setDraggedIndex(index)}
          onDrop={() => handleDrop(index)}
        />
      ))}
    </Box>
  );
}

export default Links;
