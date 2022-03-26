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

const db = getFirestore()

export const saveTask = (title, description) => {
    addDoc(collection(db, 'tasks'), {
        title,
        description
    });
}

export const getTasks = () => getDocs(collection(db, 'tasks'))

export const onGetTasks = (callback) => onSnapshot (collection(db,'tasks'), callback)

export const deleteTask = (id) => deleteDoc(doc(db, 'tasks',id));

export const getTask = id => getDoc(doc(db,'tasks',id));

export const updateTask = (id, newFields) => updateDoc(doc(db,'tasks',id), newFields);