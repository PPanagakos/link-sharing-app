import { useState, useEffect, useCallback, useMemo } from "react";
import { collection, getDocs, writeBatch, doc } from "firebase/firestore";
import { db } from "../firebase/firebaseconfig";
import { useAuth } from "./useAuth";
import { useToast } from "@chakra-ui/react";

const createClientId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `link-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

function useLinksManager(userIdOverride = null) {
  const [links, setLinks] = useState([]);
  const [baselineLinks, setBaselineLinks] = useState([]);
  const [removedLinks, setRemovedLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();
  const toast = useToast();
  const targetUserId = userIdOverride ?? currentUser?.uid;

  const normalizeLinksForComparison = useCallback(
    (linksToNormalize) =>
      linksToNormalize.map((link, index) => ({
        id: link.id ?? null,
        selectedPlatform: link.selectedPlatform ?? "",
        url: link.url ?? "",
        order: index,
      })),
    []
  );

  const fetchLinks = useCallback(async () => {
    if (!targetUserId) return;
    setLoading(true);
    setError(null);
    try {
      const querySnapshot = await getDocs(collection(db, `users/${targetUserId}/links`));
      const fetchedLinks = querySnapshot.docs
        .map((linkDoc) => ({
          id: linkDoc.id,
          clientId: linkDoc.id,
          ...linkDoc.data(),
        }))
        .sort((a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER));
      setLinks(fetchedLinks);
      setBaselineLinks(fetchedLinks);
    } catch (err) {
      console.error("Error fetching links:", err);
      setError("Failed to fetch links");
    } finally {
      setLoading(false);
    }
  }, [targetUserId]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  const addLink = () =>
    setLinks((prevLinks) => [
      ...prevLinks,
      { clientId: createClientId(), selectedPlatform: "", url: "", isNew: true },
    ]);

  const updateLink = (index, updatedLinkData) =>
    setLinks((prev) =>
      prev.map((link, i) =>
        i === index ? { ...link, ...updatedLinkData } : link
      )
    );

  const removeLink = (linkToRemove) => {
    if (!linkToRemove) return;

    if (linkToRemove.id) {
      setRemovedLinks((prev) => [...prev, linkToRemove]);
    }

    setLinks((current) =>
      current.filter((link) =>
        linkToRemove.clientId
          ? link.clientId !== linkToRemove.clientId
          : link.id !== linkToRemove.id
      )
    );
  };

  const reorderLinks = (startIndex, endIndex) => {
    if (startIndex === endIndex || startIndex < 0 || endIndex < 0) return;
    setLinks((prevLinks) => {
      const reordered = [...prevLinks];
      const [movedLink] = reordered.splice(startIndex, 1);
      reordered.splice(endIndex, 0, movedLink);
      return reordered;
    });
  };

  const saveLinks = async () => {
    const userId = currentUser?.uid;
    if (!userId) return;

    const batch = writeBatch(db);

    links.forEach((link, index) => {
      if (link.isNew) {
        // Add new link
        const newDocRef = doc(collection(db, `users/${userId}/links`));
        batch.set(newDocRef, {
          selectedPlatform: link.selectedPlatform,
          url: link.url,
          order: index,
        });
      } else if (link.id) {
        // Update existing link
        const linkRef = doc(db, `users/${userId}/links`, link.id);
        batch.set(linkRef, {
          selectedPlatform: link.selectedPlatform,
          url: link.url,
          order: index,
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
      setRemovedLinks([]);
      await fetchLinks();
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

  const hasUnsavedChanges = useMemo(() => {
    const currentSnapshot = JSON.stringify(normalizeLinksForComparison(links));
    const baselineSnapshot = JSON.stringify(
      normalizeLinksForComparison(baselineLinks)
    );
    return currentSnapshot !== baselineSnapshot;
  }, [links, baselineLinks, normalizeLinksForComparison]);

  return {
    links,
    setLinks,
    removedLinks,
    addLink,
    updateLink,
    removeLink,
    reorderLinks,
    loading,
    saveLinks,
    error,
    fetchLinks,
    hasUnsavedChanges,
  };
}

export default useLinksManager;
