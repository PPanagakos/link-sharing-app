import { useState, useEffect, useCallback } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  updateEmail,
  signOut,
} from "firebase/auth";
import "../firebase/firebaseconfig";
import mapFirebaseErrorToMessage from "../utils/mapfirebaseErrorToMessage";

export function useAuth() {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const auth = getAuth();

  const handleError = (error) => {
    const errorMessage = mapFirebaseErrorToMessage(error);
    setAuthError(errorMessage);
  };

  const login = async (email, password) => {
    try {
      setAuthError(null);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      handleError(error);
      throw error;
    }
  };

  const createAccount = useCallback(
    async (email, password) => {
      try {
        setAuthError(null);
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (error) {
        handleError(error);
        throw error;
      }
    },
    [auth]
  );

  const logout = useCallback(async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
      handleError(error);
    }
  }, [auth]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  const updateUserProfile = useCallback(
    async ({ displayName, email }) => {
      if (!currentUser) return;
      try {
        await updateProfile(currentUser, { displayName });
        if (email && email !== currentUser.email) {
          await updateEmail(currentUser, email);
        }
        await currentUser.reload();
        setCurrentUser(auth.currentUser);
      } catch (error) {
        console.error("Error updating user profile:", error);
        handleError(error);
        throw error;
      }
    },
    [currentUser, auth]
  );

  return {
    currentUser,
    authError,
    loading,
    authLoading,
    login,
    createAccount,
    logout,
    updateUserProfile,
  };
}
