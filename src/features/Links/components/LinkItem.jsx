import React, { useState, useEffect } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Button,
  Image,
  Input,
  Text,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import "../styles/Links.css";
import platforms from "../../../data/platforms";
import Draganddrop from "../../../assets/images/icon-drag-and-drop.svg";
import linkIcon from "../../../assets/images/icon-link.svg";
import { ChevronDownIcon } from "@chakra-ui/icons";

function LinkItem({ number, linkData, onRemove, onUpdate, error }) {
  const [selectedPlatform, setSelectedPlatform] = useState(
    linkData.selectedPlatform
  );
  const [url, setUrl] = useState(linkData.url);
  const [urlError, setUrlError] = useState("");

  useEffect(() => {
    if (!urlError) {
      onUpdate(number - 1, { selectedPlatform, url });
    }
  }, [selectedPlatform, url, urlError]);

  const renderPlatformMenuButton = () => (
    <MenuButton
      width="100%"
      color="#5a5555"
      border="1px solid #D9D9D9"
      background="white"
      _active={{ backgroundColor: "white" }}
      _hover={{ background: "white" }}
      as={Button}
      rightIcon={<ChevronDownIcon color="#633CFF" boxSize="24px" />}
    >
      {selectedPlatform ? (
        <Box display="flex" alignItems="center">
          <Image
            mr={3}
            boxSize="16px"
            src={platforms.find((p) => p.label === selectedPlatform)?.image}
            alt={selectedPlatform}
          />
          {selectedPlatform}
        </Box>
      ) : (
        "Select platform"
      )}
    </MenuButton>
  );

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={4}
      borderWidth="1px"
      borderRadius="md"
      mb={3}
      w="100%"
      backgroundColor="#FAFAFA"
    >
      <Box w="100%">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={3}
        >
          <Box display="flex" alignItems="center">
            <Image src={Draganddrop} mr={2} />
            <Box className="fontSemiBold" fontSize="0.8rem">
              Link #{number}
            </Box>
          </Box>
          <Button
            className="fontRegular"
            color="gray"
            fontSize={13}
            variant="link"
            onClick={() => onRemove(linkData.id)}
          >
            Remove
          </Button>
        </Box>

        <FormControl w="100%" isInvalid={error}>
          <FormLabel fontSize={10}>Platform</FormLabel>
          <Menu>
            {renderPlatformMenuButton()}
            <MenuList>
              {platforms.map((platform) => (
                <MenuItem
                  _hover={{
                    color: "#633CFF",
                  }}
                  backgroundColor="white"
                  key={platform.label}
                  onClick={() => setSelectedPlatform(platform.label)}
                >
                  <Image mr={3} src={platform.image} alt={platform.label} />
                  {platform.label}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>

          <FormLabel fontSize={10} mt={2}>
            Link
          </FormLabel>
          <div>
            <Image position="absolute" mt={3} ml={3} src={linkIcon}></Image>
            <Input
              position="relative"
              border="1px solid #D9D9D9"
              textAlign="left"
              textIndent={20}
              placeholder={`Enter ${selectedPlatform || ""} link`}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              _focus={{
                borderColor: "var(--primary-purple-color)",
                boxShadow:
                  "0 0 0 2px var(--light-purple-color), 0 0 22px 8px var(--light-purple-color)",
              }}
              borderColor={error ? "red.500" : "gray.200"}
            />
            {error && (
              <Text
                color="red.500"
                fontSize="sm"
                position="absolute"
                right="10px"
                top="85%"
                transform="translateY(-50%)"
              >
                {error}
              </Text>
            )}
          </div>
        </FormControl>
      </Box>
    </Box>
  );
}

export default LinkItem;
