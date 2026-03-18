import React, { useEffect, useId, useState } from "react";
import {
  Box,
  Button,
  Image,
  Text,
  VStack,
  Flex,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import UploadImg from "../../assets/images/icon-upload-image.svg";
import {
  getStorage,
  ref as firebaseRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";

function UploadProfilePicture({ onImageUpload, photoURL }) {
  const [imagePreview, setImagePreview] = useState(photoURL || UploadImg);
  const [isHovering, setIsHovering] = useState(false);
  const toast = useToast();
  const auth = getAuth();
  const inputId = useId();

  useEffect(() => {
    if (photoURL) {
      setImagePreview(photoURL);
    }
  }, [photoURL]);

  const layoutStyle = useBreakpointValue({
    base: "column",
    md: "row",
  });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));

    if (
      file.size > 1024 * 1024 ||
      !["image/png", "image/jpeg"].includes(file.type)
    ) {
      toast({
        title: "Invalid image.",
        description: "Image must be below 1MB and in PNG or JPG format.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const storage = getStorage();
    const currentUser = auth.currentUser;
    if (!currentUser) {
      toast({
        title: "Upload Failed",
        description: "You must be logged in to upload a profile picture.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const storageRef = firebaseRef(
      storage,
      `profile_pictures/${currentUser.uid}/${file.name}`
    );

    try {
      await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(storageRef);
      onImageUpload(photoURL);
    } catch (error) {
      console.error("Error uploading file:", error);
      setImagePreview(UploadImg);
    }
  };

  // Component layout for screen widths under 768px
  if (layoutStyle === "column") {
    return (
      <VStack
        p={5}
        backgroundColor="#FAFAFA"
        borderRadius="12px"
        border="1px solid"
        borderColor="#ECECF2"
        spacing={4}
        align="start"
        width="100%"
        maxW="600px"
      >
        <Text fontSize="0.8rem" fontWeight="600">
          Profile Picture
        </Text>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          h="160px"
          w="160px"
          borderRadius={10}
          cursor="pointer"
          border="1px dashed"
          borderColor="var(--primary-purple-color)"
          backgroundColor="var(--light-purple-color)"
          style={{
            backgroundImage: isHovering
              ? `url(${photoURL || imagePreview})`
              : "",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onClick={() => document.getElementById(inputId)?.click()}
        >
          <Image boxSize="10" src={imagePreview} alt="Profile" />
          <Button
            color="var(--primary-purple-color)"
            fontSize="0.8rem"
            background="none"
            onClick={() => document.getElementById(inputId)?.click()}
          >
            + Upload Image
          </Button>
        </Box>
        <Text fontSize="0.7rem" color="gray.600">
          Image must be below 1MB. Use PNG or JPG format.
        </Text>
        <input
          type="file"
          id={inputId}
          style={{ display: "none" }}
          onChange={handleImageChange}
          accept="image/png, image/jpeg"
        />
      </VStack>
    );
  }

  // Alternative layout for screen widths of 768px and above
  return (
    <Flex
      direction={layoutStyle}
      p={5}
      backgroundColor="#FAFAFA"
      borderRadius="12px"
      border="1px solid"
      borderColor="#ECECF2"
      align="center"
      justify="space-between"
      width="100%"
      maxW="600px"
    >
      <Text fontSize="0.8rem" fontWeight="600" marginRight="60px" alignSelf="center">
        Profile Picture
      </Text>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        h="160px"
        w="160px"
        borderRadius={10}
        cursor="pointer"
        border="1px dashed"
        borderColor="var(--primary-purple-color)"
        backgroundColor="var(--light-purple-color)"
        style={{
          backgroundImage: isHovering
            ? `url(${photoURL || imagePreview})`
            : "",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => document.getElementById(inputId)?.click()}
      >
        <Image boxSize="10" src={imagePreview} alt="Profile" />
        <Button
          color="var(--primary-purple-color)"
          fontSize="0.8rem"
          background="none"
          onClick={() => document.getElementById(inputId)?.click()}
        >
          + Upload Image
        </Button>
      </Box>
      <Text fontSize="0.7rem" color="gray.600" width="130px" alignSelf="center">
        Image must be below 1MB. Use PNG or JPG format.
      </Text>
      <input
        type="file"
        id={inputId}
        style={{ display: "none" }}
        onChange={handleImageChange}
        accept="image/png, image/jpeg"
      />
    </Flex>
  );
}

export default UploadProfilePicture;
