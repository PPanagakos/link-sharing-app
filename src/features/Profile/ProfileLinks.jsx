import React from "react";
import { Box, Skeleton, Text, VStack } from "@chakra-ui/react";
import PlatformItem from "./PlatformItem";
import platformsData from "../../data/platforms";
import useLinksManager from "../../hooks/useLinksManager";

const ProfileLinks = ({ userId }) => {
  const { links, loading, error } = useLinksManager(userId);

  if (loading) {
    return (
      <VStack spacing={3} width="100%" pb={4}>
        {[...Array(4)].map((_, index) => (
          <Skeleton key={`profile-link-skeleton-${index}`} height="46px" width="100%" borderRadius="md" />
        ))}
      </VStack>
    );
  }

  if (error) {
    return (
      <VStack spacing={3} width="100%" pb={4}>
        <Text color="red.500" fontSize="sm" textAlign="center">
          {error}
        </Text>
      </VStack>
    );
  }

  const displayedPlatformItems = links
    .map((link) => {
      const matchingPlatform = platformsData.find(
        (platform) => platform.label === link.selectedPlatform
      );
      if (!matchingPlatform) return null;
      return {
        ...matchingPlatform,
        url: link.url,
        clientId: link.clientId ?? link.id,
      };
    })
    .filter(Boolean);

  return (
    <VStack spacing={3} width="100%" pb={4}>
      {displayedPlatformItems.length ? (
        displayedPlatformItems.map(({ label, image, color, url, clientId }) => (
          <PlatformItem
            key={clientId}
            platform={{ label, image, color }}
            url={url}
          />
        ))
      ) : (
        <Box
          width="100%"
          textAlign="center"
          bg="gray.50"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          py={4}
        >
          <Text fontSize="sm" color="gray.500">
            No links added yet.
          </Text>
        </Box>
      )}
    </VStack>
  );
};

export default ProfileLinks;
