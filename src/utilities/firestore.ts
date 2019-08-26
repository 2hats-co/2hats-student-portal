import { firestore } from '../firebase';
import firebase from 'firebase/app';

/**
 * Create a document with an automatic ID. Returns a promise.
 * Document will have createdAt and updatedAt time.
 */
export const createDoc = (
  collection: string,
  docData: firebase.firestore.DocumentData
) =>
  firestore.collection(collection).add({
    ...docData,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  });

/**
 * Create a document with a specific ID. Returns a promise.
 * Document will have createdAt and updatedAt time.
 */
export const createDocWithId = (
  collection: string,
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
export const getDoc = async (
  collection: string,
  docId: string
): Promise<any> => {
  const doc = await firestore
    .collection(collection)
    .doc(docId)
    .get();
  const data = doc.data();
  return { id: doc.id, ...data };
};

/**
 * Get the data for documents (not a listener), given a collection
 * and optionally, filters.
 * Returns the array of document data when it is available. (async function)
 *
 * Uses the same procedure as `useCollection`
 */
export const getDocsFromQuery = async (
  collection: string,
  filters?: {
    field: string;
    operator: firebase.firestore.WhereFilterOp;
    value: any;
  }[],
  sorts?: { field: string; direction?: 'desc' | 'asc' }[]
): Promise<any> => {
  let query = firestore.collection(collection).limit(50);

  if (filters)
    filters.forEach(filter => {
      query = query.where(filter.field, filter.operator, filter.value);
    });

  if (sorts)
    sorts.forEach(order => {
      query = query.orderBy(order.field, order.direction);
    });

  const res = await query.get();

  return res.docs.map(queryDocSnapshot => ({
    ...queryDocSnapshot.data(),
    id: queryDocSnapshot.id,
  }));
};

/**
 * Update a document, given an collection and ID. Returns a promise.
 * Also sets updatedAt time.
 */
export const updateDoc = (
  collection: string,
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
 * Update a document WITHOUT updating the updatedAt time, given an collection
 * and ID. Returns a promise.
 *
 * DO NOT use this as the default. Use updateDoc instead.
 */
export const updateDocSilently = (
  collection: string,
  docId: string,
  properties: firebase.firestore.UpdateData
) =>
  firestore
    .collection(collection)
    .doc(docId)
    .update(properties);

/**
 * Delete a document, given an collection and ID. Returns a promise
 */
export const deleteDoc = (collection: string, docId: string) =>
  firestore
    .collection(collection)
    .doc(docId)
    .delete();

/**
 * Gets the first ID of the document that matches a particular query
 *
 * @returns {string | false} Either the ID of the document or `false`
 */
export const getFirstIdOfQuery = async (
  collectionPath: string,
  filters: {
    field: string | firebase.firestore.FieldPath;
    operator: firebase.firestore.WhereFilterOp;
    value: any;
  }[],
  sorts: {
    field: string | firebase.firestore.FieldPath;
    direction?: 'desc' | 'asc' | undefined;
  }[]
) => {
  let collection = firestore.collection(collectionPath);
  let query: firebase.firestore.Query = collection.limit(1);

  filters.forEach(filter => {
    query = collection.where(filter.field, filter.operator, filter.value);
  });
  sorts.forEach(sort => {
    query = query.orderBy(sort.field, sort.direction || 'asc');
  });

  const results = await query.get();

  if (results.empty) return false;
  return results.docs[0].id;
};
