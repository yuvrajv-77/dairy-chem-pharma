import { db } from "@/config/firebaseConfig";
import type { Blog } from "@/routes/admin/_admin/blogs";
import { addDoc, collection, getDocs, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

export const getBlogsFromFirestore = async () => {

  try {
    const blogCollectionRef = collection(db, 'blogs');
    const querySnapshot = (await getDocs(blogCollectionRef));
    const allBlogs = querySnapshot.docs.map(doc => (  // dont use forEach
      // console.log(doc.id, doc.data())
      {
        id: doc.id,
        title: doc.data().title,
        description: doc.data().description,
        body: doc.data().body,
        createdAt: doc.data().createdAt,
        imageUrl: doc.data().imageUrl,
        comments: doc.data().comments,
      }
      // {
      //   id: doc.id, 
      //   ...doc.data()
      // }

    ));
    return allBlogs;

  } catch (e) {
    console.error('Error getting blogs: ', e);
  }
}

export const getBlogById = async (id: string) => {
  try {
    const docRef = doc(db, 'blogs', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Blog;
    } else {
      return null;
    }
  } catch (e) {
    console.error('Error getting blog: ', e);
    return null;
  }
};

export const addBlogToFirestore = async (blogData: Blog) => {
  try {
    const blogCollectionRef = collection(db, 'blogs');
    const docRef = await addDoc(blogCollectionRef, {
      ...blogData

    });
    // console.log('Blog added with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding blog: ', e);
  }
};

export const updateBlog = async (id: string, blogData: Partial<Blog>) => {
  try {
    const docRef = doc(db, 'blogs', id);
    await updateDoc(docRef, {
      ...blogData,
      updatedAt: new Date().toISOString()
    });
  } catch (e) {
    console.error('Error updating blog: ', e);
    throw e;
  }
};

export const deleteBlog = async (id: string) => {
  try {
    const docRef = doc(db, 'blogs', id);
    await deleteDoc(docRef);
  } catch (e) {
    console.error('Error deleting blog: ', e);
    throw e;
  }
};
