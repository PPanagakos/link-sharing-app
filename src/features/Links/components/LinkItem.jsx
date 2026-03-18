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

const PLATFORM_URL_EXAMPLES = {
  Github: "https://github.com/your-username",
  Twitter: "https://x.com/your-username",
  Linkedln: "https://www.linkedin.com/in/your-username",
  Youtube: "https://www.youtube.com/@your-channel",
  Facebook: "https://www.facebook.com/your-page",
  Twitch: "https://www.twitch.tv/your-channel",
  "Dev.to": "https://dev.to/your-username",
  Codewars: "https://www.codewars.com/users/your-username",
  Codepen: "https://codepen.io/your-username",
  freeCodeCamp: "https://www.freecodecamp.org/your-username",
  GitLab: "https://gitlab.com/your-username",
  Hashnode: "https://hashnode.com/@your-username",
  StackOverflow: "https://stackoverflow.com/users/your-id",
};

function LinkItem({
  number,
  index,
  linkData,
  onRemove,
  onUpdate,
  error,
  onDragStart,
  onDrop,
}) {
  const [selectedPlatform, setSelectedPlatform] = useState(
    linkData.selectedPlatform
  );
  const [url, setUrl] = useState(linkData.url);

  useEffect(() => {
    onUpdate(index, { selectedPlatform, url, error: "" });
  }, [selectedPlatform, url, index, onUpdate]);

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
      onDragOver={(event) => event.preventDefault()}
      onDrop={onDrop}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={4}
      borderWidth="1px"
      borderColor="#E7E5F2"
      borderRadius="12px"
      mb={3}
      w="100%"
      background="linear-gradient(180deg, #FCFBFF 0%, #F8F7FF 100%)"
      boxShadow="0 2px 6px rgba(33, 18, 88, 0.05)"
    >
      <Box w="100%">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={3}
        >
          <Box
            display="flex"
            alignItems="center"
            draggable
            onDragStart={onDragStart}
            cursor="grab"
          >
            <Image src={Draganddrop} mr={2} alt="Drag link to reorder" />
            <Box className="fontSemiBold" fontSize="0.82rem" color="#4A475D">
              Link #{number}
            </Box>
            <Text ml={2} fontSize="xs" color="gray.500">
              Drag to reorder
            </Text>
          </Box>
          <Button
            className="fontRegular"
            color="#68657B"
            fontSize={13}
            variant="link"
            onClick={onRemove}
            _hover={{ color: "#633CFF", textDecoration: "none" }}
          >
            Remove
          </Button>
        </Box>

        <FormControl w="100%" isInvalid={error}>
          <FormLabel fontSize={11} color="#5A566F">
            Platform
          </FormLabel>
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

          <FormLabel fontSize={11} mt={2} color="#5A566F">
            Link
          </FormLabel>
          <Text fontSize="xs" color="gray.500" mb={1}>
            {PLATFORM_URL_EXAMPLES[selectedPlatform] ||
              "Use the full https:// URL for your profile."}
          </Text>
          <div>
            <Image position="absolute" mt={3} ml={3} src={linkIcon} alt="Link" />
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
