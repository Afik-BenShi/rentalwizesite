import { getApp, initializeApp } from "firebase/app";
import {signInWithEmailAndPassword} from 'firebase/auth';
import { initializeAuth, getAuth, verifyPasswordResetCode, confirmPasswordReset} from 'firebase/auth';
import firebaseConfig from './authConfig.json'; 

function connectToFirebaseAuth() {
    let _app;
    try{
        _app = initializeApp(firebaseConfig);
        initializeAuth(_app);
    } catch (e) {
        console.error(e);
    }
    return _app;
}
const app = connectToFirebaseAuth();

export async function getEmailFromOOB(oob){
    const auth = getAuth(app);
    return await verifyPasswordResetCode(auth, oob);
}

export async function setNewPassword(pass, oob){
    const auth = getAuth(app);
    return await confirmPasswordReset(auth, oob, pass);
}

export async function authenticate(email, password) {
    try{
        const auth = getAuth(app);
        const creds = await signInWithEmailAndPassword(auth, email, password);
        const user = creds.user;
        return await user.getIdToken();
    } catch (e) {
        console.error("[authenticate]", e);
        return;
    }
}
