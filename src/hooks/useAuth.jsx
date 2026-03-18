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
import { db } from "../firebase/firebaseconfig";
import {
  collection,
  doc,
  getDocs,
  writeBatch,
  setDoc,
} from "firebase/firestore";
import mapFirebaseErrorToMessage from "../utils/mapfirebaseErrorToMessage";

const DEMO_PROFILE_DATA = {
  firstName: "Avery",
  lastName: "Morgan",
  email: "demo@devlinks.app",
  photoURL:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
};

const DEMO_LINKS = [
  { selectedPlatform: "Github", url: "https://github.com/averymorgan" },
  { selectedPlatform: "Linkedln", url: "https://www.linkedin.com/in/averymorgan" },
  { selectedPlatform: "Twitter", url: "https://x.com/averymorgan" },
  { selectedPlatform: "Hashnode", url: "https://hashnode.com/@averymorgan" },
  { selectedPlatform: "Youtube", url: "https://www.youtube.com/@averymorgan" },
];
const DEFAULT_DEMO_EMAIL = "demo@devlinks.app";
const DEFAULT_DEMO_PASSWORD = "DemoAccount123!";

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
  const configuredDemoEmail = (
    import.meta.env.VITE_DEMO_EMAIL || DEFAULT_DEMO_EMAIL
  ).toLowerCase();

  const seedDemoData = useCallback(async (userId) => {
    if (!userId) return;

    const userDocRef = doc(db, `users/${userId}`);
    await setDoc(
      userDocRef,
      {
        Info: DEMO_PROFILE_DATA,
      },
      { merge: true }
    );

    const demoLinksRef = collection(db, `users/${userId}/links`);
    const linksSnapshot = await getDocs(demoLinksRef);
    const batch = writeBatch(db);

    linksSnapshot.docs.forEach((linkDoc) => {
      batch.delete(doc(db, `users/${userId}/links`, linkDoc.id));
    });

    DEMO_LINKS.forEach((link, order) => {
      const linkDocRef = doc(demoLinksRef);
      batch.set(linkDocRef, { ...link, order });
    });

    await batch.commit();
  }, []);

  const login = useCallback(
    async (email, password) => {
      try {
        setAuthError(null);
        const credentials = await signInWithEmailAndPassword(auth, email, password);
        const normalizedEmail = email.trim().toLowerCase();

        // Ensure demo account always resets on every login, even if user
        // signs in via normal email/password form.
        if (normalizedEmail === configuredDemoEmail) {
          await seedDemoData(credentials.user.uid);
        }

        return credentials;
      } catch (error) {
        handleError(error);
        throw error;
      }
    },
    [auth, configuredDemoEmail, seedDemoData]
  );

  const loginWithDemoAccount = useCallback(async () => {
    const demoEmail = configuredDemoEmail;
    const demoPassword = import.meta.env.VITE_DEMO_PASSWORD || DEFAULT_DEMO_PASSWORD;

    try {
      let credentials;
      try {
        credentials = await login(demoEmail, demoPassword);
      } catch (error) {
        const shouldCreateDemoAccount =
          error?.code === "auth/user-not-found" ||
          error?.code === "auth/invalid-credential" ||
          error?.code === "auth/invalid-login-credentials";

        if (!shouldCreateDemoAccount) {
          throw error;
        }

        try {
          await createUserWithEmailAndPassword(auth, demoEmail, demoPassword);
        } catch (createError) {
          handleError(createError);
          if (createError?.code !== "auth/email-already-in-use") {
            throw createError;
          }
        }

        credentials = await login(demoEmail, demoPassword);
      }
      return credentials;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }, [auth, configuredDemoEmail, login]);

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
    loginWithDemoAccount,
  };
}
