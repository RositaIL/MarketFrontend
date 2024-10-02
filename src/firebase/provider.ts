
import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { FireBaseAuth } from "./config";
import { FirebaseError } from "firebase/app";

const googleProvider = new GoogleAuthProvider();

export const singInWithGoole = async () => {
    try {
        const response = await signInWithPopup(FireBaseAuth, googleProvider);
        const user: User = response.user;
        const token = user.accessToken;
        localStorage.setItem('token', token);
        return {
            accessToken: token,
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
        }
    } catch (error) {
        if (error instanceof FirebaseError) {
            console.log(error)
            return error.code
        } else {
            console.log(error)
        }
    }

}

export const logoutFirebase = async () => {
    return await FireBaseAuth.signOut();
}