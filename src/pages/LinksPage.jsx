import React from "react";
import LetsGetYouStarted from "../features/Links/components/LetsGetYouStarted";
import Links from "../features/Links/components/Links";
import LinksHeader from "../features/Links/components/LinksHeader";
import LinksFooter from "../features/Links/components/LinksFooter";
import { Flex, Text, VStack, useMediaQuery } from "@chakra-ui/react";
import Phone from "../features/Links/components/Phone";
import validatePlatformUrl from "../utils/validatePlatformUrl";
import useLinksManager from "../hooks/useLinksManager";

function LinksPage() {
  const {
    links,
    setLinks,
    addLink,
    updateLink,
    removeLink,
    reorderLinks,
    saveLinks,
    hasUnsavedChanges,
  } = useLinksManager();
  const [isLargerThan1024] = useMediaQuery("(min-width: 1024px)");

  // This function checks all links for validity before attempting to save.
  const handleSave = async () => {
    let allValid = true;
    const updatedLinks = links.map((link) => {
      const { isValid, error } = validatePlatformUrl(
        link.url,
        link.selectedPlatform
      );
      if (!isValid) {
        allValid = false;
      }
      return { ...link, error };
    });

    if (!allValid) {
      setLinks(updatedLinks);
      return;
    }

    await saveLinks();
  };

  return (
    <Flex>
      {isLargerThan1024 && <Phone />}
      <VStack
        flex="1"
        spacing={5}
        p={5}
        backgroundColor="#FFF"
        marginLeft="20px"
        marginRight="20px"
      >
        <LinksHeader addLink={addLink} />
        {!links.length ? (
          <LetsGetYouStarted />
        ) : (
          <Links
            links={links}
            removeLink={removeLink}
            updateLink={updateLink}
            reorderLinks={reorderLinks}
          />
        )}
        <LinksFooter
          onSave={handleSave}
          links={links}
          hasUnsavedChanges={hasUnsavedChanges}
        />
        {hasUnsavedChanges && (
          <Text width="100%" fontSize="xs" color="orange.500" textAlign="right">
            Unsaved changes
          </Text>
        )}
      </VStack>
    </Flex>
  );
}

export default LinksPage;
