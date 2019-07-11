import { firestore } from '../firebase';
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

export const getFirstIdOfQuery = async (collectionPath, filters, sorts) => {
  let query = firestore.collection(collectionPath);
  filters.forEach(filter => {
    query = query.where(filter.field, filter.operator, filter.value);
  });
  sorts.forEach(sort => {
    query = query.orderBy(sort.field, sort.direction || 'asc');
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

export const createDocWithId = (collection, docId, docData) =>
  firestore
    .collection(collection)
    .doc(docId)
    .set({
      ...docData,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

export const getDoc = async (collection, docId) => {
  const doc = await firestore
    .collection(collection)
    .doc(docId)
    .get();

  return { id: doc.id, ...doc.data() };
};
