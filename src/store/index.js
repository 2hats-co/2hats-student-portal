import { applyMiddleware, createStore, compose } from 'redux'
import { reduxFirestore } from 'redux-firestore'
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import logger from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { productionConfig, stagingConfig } from '../config/firebase'

import rootReducer from '../reducers'

if (process.env.GCLOUD_PROJECT === 'production2hats') {
	firebase.initializeApp(productionConfig)
} else {
	firebase.initializeApp(stagingConfig)
}

export function configureStore(initialState, history) {
	const enhancers = []
	// Provide timestamp settings to silence warning about deprecation
	firebase.firestore().settings({ timestampsInSnapshots: true })
	// Dev tools store enhancer
	const devToolsExtension = window.devToolsExtension;
	if (typeof devToolsExtension === 'function') {
		enhancers.push(devToolsExtension());
	}

	// const persistConfig = {
	// 	key: 'root',
	// 	storage,
	// }
	//const persistedReducer = persistReducer(persistConfig, rootReducer)
	const createStoreWithMiddleware = compose(
		// Add redux firestore store enhancer
		reduxFirestore(firebase),
		applyMiddleware(logger),
		...enhancers
	)(createStore)

	const store = createStoreWithMiddleware(rootReducer);

	return store;
}
export const auth = firebase.auth();
export const firebaseStorage = firebase.storage().ref();
export const db = firebase.firestore();
export const googleProvider = new firebase.auth.GoogleAuthProvider();