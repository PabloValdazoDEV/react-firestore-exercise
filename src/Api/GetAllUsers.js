import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase-config.js";

const GetAllUsers = async () => {
  if (!db) {
    console.error("Firestore DB is not initialized!");
    return;
  }

  try {
    const usersCollectionRed = collection(db, "users");
    const querySnapshot = await getDocs(usersCollectionRed);
    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return users;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default GetAllUsers;
