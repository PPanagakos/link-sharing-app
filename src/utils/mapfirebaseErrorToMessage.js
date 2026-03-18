const mapFirebaseErrorToMessage = (error) => {
  switch (error.code) {
    case "auth/wrong-password":
      return "The password is invalid or the user does not have a password.";
    case "auth/user-not-found":
      return "There is no user record corresponding to this identifier. The user may have been deleted.";
    case "auth/invalid-login-credentials":
      return "Invalid login credentials. Please check your email and password.";
    case "auth/invalid-credential":
      return "Invalid credentials. Please try again.";
    case "auth/user-disabled":
      return "The user account has been disabled by an administrator.";
    case "auth/email-already-in-use":
      return "The email address is already in use by another account.";
    case "auth/weak-password":
      return "The password is too weak. Please use a stronger password.";
    case "auth/invalid-email":
      return "The email address is badly formatted.";
    case "auth/operation-not-allowed":
      return "Email/password accounts are not enabled. Enable email/password accounts in the Firebase Console, under the Auth tab.";
    case "auth/admin-restricted-operation":
      return "This authentication method is disabled in Firebase. Enable Anonymous auth in Firebase Authentication settings.";
    case "auth/unauthorized-domain":
      return "This domain is not authorized for Firebase Authentication. Add your local/dev domain in Firebase Authentication settings.";
    case "permission-denied":
      return "Permission denied by Firestore rules. Allow authenticated users (including anonymous) to write demo data.";
    default:
      console.error(`Unhandled auth error: ${error.code}`, error);
      return "An unexpected error occurred. Please try again.";
  }
};
export default mapFirebaseErrorToMessage;
