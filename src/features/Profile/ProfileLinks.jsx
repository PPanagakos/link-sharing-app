import React from "react";
import { VStack } from "@chakra-ui/react";
import PlatformItem from "./PlatformItem";
import platformsData from "../../data/platforms.json";
import useLinksManager from "../../hooks/useLinksManager";

const ProfileLinks = () => {
  const { links, loading, error } = useLinksManager();

  if (loading) {
    return <VStack spacing={3}>Loading...</VStack>;
  }

  if (error) {
    return <VStack spacing={3}>{error}</VStack>;
  }

  const displayedPlatformItems = platformsData
    .filter((platform) =>
      links.some((link) => link.selectedPlatform === platform.label)
    )
    .map((platform) => ({
      ...platform,
      url: links.find((link) => link.selectedPlatform === platform.label)?.url,
    }));

  return (
    <VStack spacing={3}>
      {displayedPlatformItems.map(({ label, image, color, url }) => (
        <PlatformItem
          key={label}
          platform={{ label, image, color }}
          url={url}
        />
      ))}
    </VStack>
  );
};

export default ProfileLinks;
