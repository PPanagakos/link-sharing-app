import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import { db } from "../firebase/firebaseconfig";
import { doc, setDoc, getDoc } from "firebase/firestore";

const useUserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [profileError, setProfileError] = useState("");
  const { currentUser } = useAuth();

  const updateUserProfile = async (profileData) => {
    if (!currentUser) {
      setProfileError("No authenticated user found.");
      return;
    }

    try {
      const userDocRef = doc(db, `users/${currentUser.uid}`);
      await setDoc(userDocRef, { Info: profileData }, { merge: true });
      setUserProfile({ ...userProfile, Info: profileData });
    } catch (error) {
      console.error("Error updating user profile:", error);
      setProfileError(error.message);
    }
  };

  const fetchUserProfile = async () => {
    if (!currentUser) return;

    try {
      const docRef = doc(db, `users/${currentUser.uid}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserProfile(docSnap.data());
      } else {
        setUserProfile(null);
        setProfileError("No such document!");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setProfileError(error.message);
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (currentUser && isMounted) {
      fetchUserProfile();
    }
    return () => {
      isMounted = false;
    };
  }, [currentUser]);
  return { userProfile, fetchUserProfile, updateUserProfile, profileError };
};

export default useUserProfile;
