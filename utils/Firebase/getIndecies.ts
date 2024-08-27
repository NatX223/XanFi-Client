import { collection, getDocs } from "firebase/firestore";
import { GetIndecies } from "./types";
import { DocumentData } from "@firebase/firestore-types";
import { doc, getDoc } from 'firebase/firestore';

import { db } from "./firebaseConfig";

const dbInstanceIndex = collection(db, "Indecies");

export const getAllIndecies = async (): Promise<GetIndecies[]> => {
    const data = await getDocs(dbInstanceIndex);
    const result = data.docs.map(item => {
      return { ...item.data(), key: item.id };
    });
    console.log(result);    
    return result;
};

export const getIndex = async (id: string | any): Promise<DocumentData | null> => {
    try {
        const docRef = doc(dbInstanceIndex, id);
    
        // Fetch the document
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
          return docSnap.data();
        } else {
          console.log('No such document!');
          return null;
        }
      } catch (error) {
        console.error('Error fetching document: ', error);
        throw error;
      }
};