import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCdL2ZNmTWQQ_bChJbuKD2AwaddkyIzVvc",
  authDomain: "blogging-website-9a298.firebaseapp.com",
  projectId: "blogging-website-9a298",
  storageBucket: "blogging-website-9a298.appspot.com",
  messagingSenderId: "917514671703",
  appId: "1:917514671703:web:514a78d55d7eb5af66b512"
};

const app = initializeApp(firebaseConfig);

//Google Auth
const provider = new GoogleAuthProvider();

const auth = getAuth();

export const authWithGoogle = async () => {

    let user = null;

    await signInWithPopup(auth, provider)
    .then((result) => {
        user = result.user
    })
    .catch((err) => {
        console.log(err);
    })

    return user;

}