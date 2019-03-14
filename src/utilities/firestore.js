import { firestore } from '../store';
import firebase from 'firebase/app';

export const updateDoc = (collection, docId, properties) =>
  firestore
    .collection(collection)
    .doc(docId)
    .update({
      ...properties,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

export const deleteDoc = (collection, docId) =>
  firestore
    .collection(collection)
    .doc(docId)
    .delete();

export const getfirstIdOfQuery = async (collectionPath, filters) => {
  let query = firestore.collection(collectionPath);
  filters.forEach(filter => {
    query = query.where(filter.field, filter.operator, filter.value);
  });
  const results = await query.get();
  if (results.empty) {
    return false;
  } else {
    return results.docs[0].id;
  }
};

export const createDoc = (collection, docData) =>
  firestore.collection(collection).add({
    ...docData,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  });

export const getDoc = async (collection, docId) => {
  const doc = await firestore
    .collection(collection)
    .doc(docId)
    .get();
  return doc.data();
};
