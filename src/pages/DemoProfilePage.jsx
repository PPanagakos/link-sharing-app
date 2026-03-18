import { Box, Center, Image, Text, VStack } from "@chakra-ui/react";
import PlatformItem from "../features/Profile/PlatformItem";
import platformsData from "../data/platforms";

const demoProfile = {
  firstName: "Avery",
  lastName: "Morgan",
  email: "demo@devlinks.app",
  photoURL:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
};

const demoLinks = [
  { selectedPlatform: "Github", url: "https://github.com/averymorgan" },
  { selectedPlatform: "Linkedln", url: "https://www.linkedin.com/in/averymorgan" },
  { selectedPlatform: "Twitter", url: "https://x.com/averymorgan" },
  { selectedPlatform: "Hashnode", url: "https://hashnode.com/@averymorgan" },
  { selectedPlatform: "Youtube", url: "https://www.youtube.com/@averymorgan" },
];

function DemoProfilePage() {
  const demoPlatformItems = demoLinks
    .map((link) => {
      const platform = platformsData.find(
        (platformItem) => platformItem.label === link.selectedPlatform
      );
      if (!platform) return null;
      return {
        ...platform,
        url: link.url,
      };
    })
    .filter(Boolean);

  return (
    <Center p={10} flexDirection="column" gap={4}>
      <Box
        borderRadius="full"
        border="2px"
        borderColor="var(--primary-purple-color)"
        boxSize="80px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Image
          src={demoProfile.photoURL}
          alt="Demo profile"
          boxSize="full"
          objectFit="cover"
          borderRadius="full"
        />
      </Box>
      <VStack spacing={1} textAlign="center">
        <Text fontSize="2xl" fontWeight="bold">
          {demoProfile.firstName} {demoProfile.lastName}
        </Text>
        <Text fontSize="sm" color="gray.500">
          {demoProfile.email}
        </Text>
        <Text fontSize="xs" color="gray.400">
          Public demo preview
        </Text>
      </VStack>
      <VStack spacing={3} mt={3}>
        {demoPlatformItems.map((item) => (
          <PlatformItem
            key={`${item.label}-${item.url}`}
            platform={{ label: item.label, image: item.image, color: item.color }}
            url={item.url}
          />
        ))}
      </VStack>
    </Center>
  );
}

export default DemoProfilePage;
