import React, { useState } from "react";
import LetsGetYouStarted from "../features/Links/components/LetsGetYouStarted";
import Links from "../features/Links/components/Links";
import LinksHeader from "../features/Links/components/LinksHeader";
import LinksFooter from "../features/Links/components/LinksFooter";
import { Flex, VStack, useMediaQuery } from "@chakra-ui/react";
import Phone from "../features/Links/components/Phone";
import isValidUrl from "../utils/isValidUrl";
import useLinksManager from "../Hooks/useLinksManager";

function LinksPage() {
  const { links, setLinks, addLink, updateLink, removeLink, saveLinks } =
    useLinksManager();
  const [isValid, setIsValid] = useState(true);
  const [isLargerThan1024] = useMediaQuery("(min-width: 1024px)");

  const handleValidate = (isValid) => {
    setIsValid(isValid);
  };

  // This function checks all links for validity before attempting to save.
  const handleSave = async () => {
    let allValid = true;
    const updatedLinks = links.map((link) => {
      let error = "";
      if (!link.url) {
        error = "Can't be empty";
        allValid = false;
      } else if (!isValidUrl(link.url)) {
        error = "Please check the URL";
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
            onValidate={handleValidate}
            error={links.error}
          />
        )}
        <div style={{ borderBottom: "1px solid gray" }}></div>
        <LinksFooter onSave={handleSave} links={links} />
      </VStack>
    </Flex>
  );
}

export default LinksPage;
