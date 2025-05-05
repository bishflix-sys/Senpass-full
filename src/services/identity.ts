/**
 * Represents user profile information.
 */
export interface UserProfile {
  /**
   * The user's full name.
   */
  name: string;
  /**
   * The user's address.
   */
  address: string;
  /**
   * The user's contact email.
   */
  email: string;
   /**
    * The user's date of birth. Optional.
    */
   dateOfBirth?: string;
   /**
    * The user's national ID. Optional.
    */
   nationalId?: string;
  /**
   * Other user details.
   */
  [key: string]: any;
}

/**
 * Asynchronously retrieves user profile information.
 *
 * @param userId The ID of the user to retrieve.
 * @returns A promise that resolves to a UserProfile object.
 */
export async function getUserProfile(userId: string): Promise<UserProfile> {
  // TODO: Implement this by calling a real API.
  console.log(`Fetching profile for user: ${userId}`); // Added for demonstration
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 50));

  return {
    name: 'Abdoulaye Sene', // Changed name here
    address: '123 Rue de Thiong, Dakar',
    email: 'abdoulaye.sene@email.sn', // Updated email to match name for consistency
    dateOfBirth: '1990-08-21', // Optionally update DOB
    nationalId: 'SN123456789' // Optionally update National ID
  };
}

/**
 * Asynchronously verifies user identity.
 *
 * @param userId The ID of the user to verify.
 * @returns A promise that resolves to a boolean.
 */
export async function verifyUserIdentity(userId: string): Promise<boolean> {
  // TODO: Implement this by calling a real API.
  console.log(`Verifying identity for user: ${userId}`);
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
  return Math.random() > 0.1; // Simulate 90% success rate
}

/**
 * Asynchronously signs a document digitally.
 *
 * @param userId The ID of the user to sign with.
 * @param document The document to sign.
 * @returns A promise that resolves to a signature string or null if failed.
 */
export async function signDocument(userId: string, document: string): Promise<string | null> {
  // TODO: Implement this by calling a real API.
  console.log(`Signing document for user: ${userId}. Document: ${document.substring(0, 30)}...`);
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate delay
  if (Math.random() > 0.05) { // Simulate 95% success rate
     return `SIGNED-${userId}-${Date.now()}`;
  } else {
     return null;
  }
}

/**
 * Asynchronously sends a notification to the user.
 *
 * @param userId The ID of the user to notify.
 * @param message The message to send.
 * @returns A promise that resolves when the message has been sent.
 */
export async function sendNotification(userId: string, message: string): Promise<void> {
  // TODO: Implement this by calling a real API or using a notification service.
  console.log(`Sending notification to ${userId}: ${message}`);
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate sending delay
  // In a real app, this might interact with Firebase Cloud Messaging, email, or SMS services.
}
