import React, { useState } from "react";
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
import useUserProfile from "../../hooks/useUserProfile";

function UploadProfilePicture({ onImageUpload, photoURL }) {
  const { userProfile } = useUserProfile();
  const [imagePreview, setImagePreview] = useState(UploadImg);
  const [isHovering, setIsHovering] = useState(false);
  const toast = useToast();
  const auth = getAuth();

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
        borderRadius="6px"
        spacing={5}
        align="start"
      >
        <Text fontSize="0.8rem" className="fontRegular">
          Profile Picture
        </Text>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          h="180px"
          w="180px"
          borderRadius={6}
          backgroundColor="var(--light-purple-color)"
          style={{
            backgroundImage: isHovering
              ? `url(${userProfile?.Info?.photoURL})`
              : "",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <Image boxSize="10" src={imagePreview} alt="Profile" />
          <Button
            color="var(--primary-purple-color)"
            fontSize="0.8rem"
            background="none"
            onClick={() => document.getElementById("imageUpload").click()}
          >
            + Upload Image
          </Button>
        </Box>
        <Text fontSize="0.65rem" className="fontRegular">
          Image must be below 1MB. Use PNG or JPG format.
        </Text>
        <input
          type="file"
          id="imageUpload"
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
      borderRadius="6px"
      align="center"
      justify="space-between"
      width="600px"
    >
      <Text fontSize="0.8rem" marginRight="130px" alignSelf="center">
        Profile Picture
      </Text>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        h="180px"
        w="180px"
        borderRadius={6}
        backgroundColor="var(--light-purple-color)"
        style={{
          backgroundImage: isHovering
            ? `url(${userProfile?.Info?.photoURL})`
            : "",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Image boxSize="10" src={imagePreview} alt="Profile" />
        <Button
          color="var(--primary-purple-color)"
          fontSize="0.8rem"
          background="none"
          onClick={() => document.getElementById("imageUpload").click()}
        >
          + Upload Image
        </Button>
      </Box>
      <Text fontSize="0.65rem" width="130px" alignSelf="center">
        Image must be below 1MB. Use PNG or JPG format.
      </Text>
      <input
        type="file"
        id="imageUpload"
        style={{ display: "none" }}
        onChange={handleImageChange}
        accept="image/png, image/jpeg"
      />
    </Flex>
  );
}

export default UploadProfilePicture;
