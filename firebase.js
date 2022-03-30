// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import { 
    getFirestore,
    collection,
    addDoc,
    getDocs,
    onSnapshot,
    doc,
    deleteDoc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js"

import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-storage.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBXA-iO-VDsJ1Mmhvm1Zgc-R8ynR-31Tiw",
    authDomain: "todolist-37d98.firebaseapp.com",
    projectId: "todolist-37d98",
    storageBucket: "todolist-37d98.appspot.com",
    messagingSenderId: "12209993327",
    appId: "1:12209993327:web:a29d4ac99e9e9fa2e3ff9a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(app);
// Create reference for authentication
const auth = getAuth(app);


const db = getFirestore()

export const saveTask = (title, description, duedate, registerdate) => {
    addDoc(collection(db, 'tasks'), {
        title,
        description,
        duedate,
        registerdate
    });
}

export const getTasks = () => getDocs(collection(db, 'tasks'))

export const onGetTasks = (callback) => onSnapshot (collection(db,'tasks'), callback)

export const deleteTask = (id) => deleteDoc(doc(db, 'tasks',id));

export const getTask = id => getDoc(doc(db,'tasks',id));

export const updateTask = (id, newFields) => updateDoc(doc(db,'tasks',id), newFields);

export const uploadImage = (imgFile,name, idTask) => {
    const storageRef = ref(storage, name);
    let imageUrl = `https://firebasestorage.googleapis.com/v0/b/todolist-37d98.appspot.com/o/${name}?alt=media`;

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, imgFile).then((snapshot) => {                
        
        let jsonData = {
            imgURL: imageUrl,        
        }      
        updateDoc(doc(db,'tasks',idTask), jsonData);
    });

    return true;
}