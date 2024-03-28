const mapFirebaseErrorToMessage = (error) => {
  switch (error.code) {
    case "auth/wrong-password":
      return "The password is invalid or the user does not have a password.";
    case "auth/user-not-found":
      return "There is no user record corresponding to this identifier. The user may have been deleted.";
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
    default:
      console.error(`Unhandled auth error: ${error.code}`, error);
      return "An unexpected error occurred. Please try again.";
  }
};
export default mapFirebaseErrorToMessage;
