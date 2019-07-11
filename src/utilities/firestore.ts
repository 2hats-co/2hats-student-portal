import { firestore } from '../firebase';
import firebase from 'firebase/app';
import { COLLECTIONS } from '@bit/twohats.common.constants';

/**
 * Create a document with an automatic ID. Returns a promise
 */
export const createDoc = (
  collection: COLLECTIONS,
  docData: firebase.firestore.DocumentData
) =>
  firestore.collection(collection).add({
    ...docData,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  });

/**
 * Create a document with a specific ID. Returns a promise
 */
export const createDocWithId = (
  collection: COLLECTIONS,
  docId: string,
  docData: firebase.firestore.DocumentData
) =>
  firestore
    .collection(collection)
    .doc(docId)
    .set({
      ...docData,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

/**
 * Get the data for a document (not a listener), given an collection and ID.
 * Returns the document data when it is available. (async function)
 */
export const getDoc = async (collection: COLLECTIONS, docId: string) => {
  const doc = await firestore
    .collection(collection)
    .doc(docId)
    .get();

  return { id: doc.id, ...doc.data() };
};

/**
 * Update a document, given an collection and ID. Returns a promise
 */
export const updateDoc = (
  collection: COLLECTIONS,
  docId: string,
  properties: firebase.firestore.UpdateData
) =>
  firestore
    .collection(collection)
    .doc(docId)
    .update({
      ...properties,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

/**
 * Delete a document, given an collection and ID. Returns a promise
 */
export const deleteDoc = (collection: COLLECTIONS, docId: string) =>
  firestore
    .collection(collection)
    .doc(docId)
    .delete();

// export const getFirstIdOfQuery = async (collectionPath, filters, sorts) => {
//   let query = firestore.collection(collectionPath);
//   filters.forEach(filter => {
//     query = query.where(filter.field, filter.operator, filter.value);
//   });
//   sorts.forEach(sort => {
//     query = query.orderBy(sort.field, sort.direction || 'asc');
//   });
//   const results = await query.get();
//   if (results.empty) {
//     return false;
//   } else {
//     return results.docs[0].id;
//   }
// };

export const getFirstIdOfQuery = () => {};
