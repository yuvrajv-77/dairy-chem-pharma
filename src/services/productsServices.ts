import { db, storage } from "@/config/firebaseConfig";
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const uploadProductImage = async (file: File, path: string) => {
  try {
    const storageRef = ref(storage, `${path}/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (e) {
    console.error('Error uploading image: ', e);
    throw e;
  }
}

export const deleteProduct = async (productId: string) => {
  try {
    const productRef = doc(db, 'products', productId);
    await deleteDoc(productRef);
  } catch (e) {
    console.error('Error deleting product: ', e);
    throw e;
  }
}

export const updateProduct = async (productId: string, productData: any, imageFile?: File) => {
  try {
    const productRef = doc(db, 'products', productId);
    
    let imageUrl = productData.imageUrl;
    
    if (imageFile) {
       imageUrl = await uploadProductImage(imageFile, `products/${productId}`);
    }
    
    const dataToUpdate = { ...productData, imageUrl, updatedAt: new Date().toISOString() };
    delete dataToUpdate.id; // Ensure ID is not stored as a field inside the document

    await updateDoc(productRef, dataToUpdate);
  } catch (e) {
    console.error('Error updating product: ', e);
    throw e;
  }
}

export const getProducts = async () => {
  try {
    const itemCollectionRef = collection(db, 'products');
    const querySnapshot = await getDocs(itemCollectionRef);
    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  } catch (e) {
    console.error('Error getting products: ', e);
    throw e;
  }
}

export const getProductById = async (productId: string) => {
  try {
    const productRef = doc(db, 'products', productId);
    const productSnap = await getDoc(productRef);

    if (productSnap.exists()) {
      return {
        ...productSnap.data(),
        id: productSnap.id,
      };
    } else {
      return null;
    }
  } catch (e) {
    console.error('Error getting product: ', e);
    throw e;
  }
}

export const addProduct = async (productData: any, imageFile?: File) => {
  try {
    const itemCollectionRef = collection(db, 'products');
    const productDoc = doc(itemCollectionRef);
    const productId = productDoc.id;
    
    let imageUrl = productData.imageUrl || '';
    
    if (imageFile) {
       imageUrl = await uploadProductImage(imageFile, `products/${productId}`);
    }
    
    await setDoc(productDoc, {
      ...productData,
      imageUrl,
      createdAt: new Date().toISOString()
    });
    
    return productId;
  } catch (e) {
    console.error('Error adding product: ', e);
    throw e;
  }
}