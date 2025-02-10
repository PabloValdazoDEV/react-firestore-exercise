import { doc, deleteDoc } from "firebase/firestore"; 
import { db } from '../config/firebase-config';

async function DeleteUser(documentId) {
  await deleteDoc(doc(db, "users", documentId));
}

export default DeleteUser