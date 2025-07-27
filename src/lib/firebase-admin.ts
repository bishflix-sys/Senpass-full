
import * as admin from 'firebase-admin';

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!serviceAccount) {
    throw new Error('The FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set. Please add it to your .env file.');
}

const parsedServiceAccount = JSON.parse(serviceAccount);

// Initialize Firebase Admin
const adminApp = () => {
    if (admin.apps.length) {
        return admin.app();
    }
    return admin.initializeApp({
        credential: admin.credential.cert(parsedServiceAccount)
    });
};

export { adminApp };
