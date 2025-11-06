
import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut} from "firebase/auth";
import { 
    addDoc, 
    collection, 
    getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";



const firebaseConfig = {
  apiKey: "AIzaSyBfNbr58GKo0NCejc6xvhahVwZ7CS8evZ8",
  authDomain: "netflix-clone-fbd1e.firebaseapp.com",
  projectId: "netflix-clone-fbd1e",
  storageBucket: "netflix-clone-fbd1e.firebasestorage.app",
  messagingSenderId: "365951543070",
  appId: "1:365951543070:web:aa063a00e4f8498ecdcb0f"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup =async (name, email, password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user= res.user;
        await addDoc (collection(db, "user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
       toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    console.log("Logged in as:", res.user.email);
    return res; 
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};


const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};