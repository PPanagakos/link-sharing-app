import { useState, useEffect } from "react";
import { collection, getDocs, writeBatch, doc } from "firebase/firestore";
import { db } from "../firebase/firebaseconfig";
import { useAuth } from "./useAuth";
import { useToast } from "@chakra-ui/react";

function useLinksManager() {
  const [links, setLinks] = useState([]);
  const [removedLinks, setRemovedLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();
  const toast = useToast();

  useEffect(() => {
    async function fetchLinks() {
      if (!currentUser) return;
      setLoading(true);
      try {
        const querySnapshot = await getDocs(
          collection(db, `users/${currentUser.uid}/links`)
        );
        const fetchedLinks = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLinks(fetchedLinks);
      } catch (err) {
        console.error("Error fetching links:", err);
        setError("Failed to fetch links");
      } finally {
        setLoading(false);
      }
    }

    fetchLinks();
  }, [currentUser]);

  const addLink = () =>
    setLinks((prevLinks) => [
      ...prevLinks,
      { selectedPlatform: "", url: "", isNew: true },
    ]);

  const updateLink = (index, updatedLinkData) =>
    setLinks((prev) =>
      prev.map((link, i) =>
        i === index ? { ...link, ...updatedLinkData } : link
      )
    );

  const removeLink = (linkId) => {
    setRemovedLinks((prev) => [
      ...prev,
      links.find((link) => link.id === linkId),
    ]);
    setLinks((current) => current.filter((link) => link.id !== linkId));
  };

  const saveLinks = async () => {
    const userId = currentUser.uid;
    if (!userId) return;

    const batch = writeBatch(db);

    links.forEach((link) => {
      if (link.isNew) {
        // Add new link
        const newDocRef = doc(collection(db, `users/${userId}/links`));
        batch.set(newDocRef, {
          selectedPlatform: link.selectedPlatform,
          url: link.url,
        });
      } else if (link.id) {
        // Update existing link
        const linkRef = doc(db, `users/${userId}/links`, link.id);
        batch.set(linkRef, {
          selectedPlatform: link.selectedPlatform,
          url: link.url,
        });
      }
    });

    // Handle removals
    removedLinks.forEach((link) => {
      if (link.id) {
        const linkRef = doc(db, `users/${userId}/links`, link.id);
        batch.delete(linkRef);
      }
    });

    try {
      await batch.commit();
      toast({
        title: "Success",
        description: "Links updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error updating links: ", error);
      toast({
        title: "Error",
        description: "There was an error updating the links.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return {
    links,
    setLinks,
    removedLinks,
    addLink,
    updateLink,
    removeLink,
    loading,
    saveLinks,
    error,
  };
}

export default useLinksManager;
