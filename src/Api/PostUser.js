import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase-config.js";

const PostUser = async (data) => {
  if (!db) {
    console.error("Firestore DB is not initialized!");
    return;
  }

  try {
    const newUsersCollection = collection(db, "users");
    const querySnapshot = await addDoc(newUsersCollection, { ...data });

  } catch (error) {
    console.error('Error al creado el registro, ID: ', error);
  }
};

export default PostUser;
