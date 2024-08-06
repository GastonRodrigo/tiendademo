import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {

    apiKey: "AIzaSyBN6Z6BiFyVQzYbaGgSnrcAU9WDAw1ypJE",
  
    authDomain: "akor-75756.firebaseapp.com",
  
    projectId: "akor-75756",
  
    storageBucket: "akor-75756.appspot.com",
  
    messagingSenderId: "226784326055",
  
    appId: "1:226784326055:web:afd5fcf456491ebbd28682"
  
  };
  

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
