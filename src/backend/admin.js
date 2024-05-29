import { auth } from 'firebase-admin';
import { initializeApp, cert } from "firebase-admin/app";
import {getSecret} from 'wix-secrets-backend';
import wixData from 'wix-data';

const init = async () => {
    const serviceAccount = await getSecret('firebase-admin');

    initializeApp({
        credential: cert(JSON.parse(serviceAccount)),
    });
}
export async function askToBeRemoved(token){
    try{
        init();
        const decodedToken = await auth().verifyIdToken(token);
        await wixData.insert('usersToRemove', {
            userid: decodedToken.user_id,
            email: decodedToken.email,
        });
        return true;
    }catch (error){
        console.error('[askToBeRemoved]', error);
        return false;
    }
    return false;
}