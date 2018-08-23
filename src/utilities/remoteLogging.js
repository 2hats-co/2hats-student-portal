import {db,auth} from '../store'
import { COLLECTIONS } from '../constants/firestore';

function start(){
    console.log('starting remote logging')
    console.log(auth.currentUser.uid)
    db.collection(COLLECTIONS.remoteLogs).doc(auth.currentUser.uid).set({loggingEnabled:true})
}
function stop(){
    console.log('terminating remote logging')
    db.collection(COLLECTIONS.remoteLogs).doc(auth.currentUser.uid).set({loggingEnabled:false})

}
function clear(){
    console.log('clear remote logs')
    const batchSize =100
    var collectionRef = db.collection(COLLECTIONS.remoteLogs).doc(auth.currentUser.uid).collection('logs');
    var query = collectionRef.limit(batchSize)

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, batchSize, resolve, reject);
  });
}
function deleteQueryBatch(db, query, batchSize, resolve, reject) {
    query.get()
        .then((snapshot) => {
          // When there are no documents left, we are done
          if (snapshot.size == 0) {
            return 0;
          }
  
          // Delete documents in a batch
          var batch = db.batch();
          snapshot.docs.forEach((doc) => {
            batch.delete(doc.ref);
          });
  
          return batch.commit().then(() => {
            return snapshot.size;
          });
        }).then((numDeleted) => {
          if (numDeleted === 0) {
            resolve();
            return;
          }
  
          // Recurse on the next process tick, to avoid
          // exploding the stack.
          process.nextTick(() => {
            deleteQueryBatch(db, query, batchSize, resolve, reject);
          });
        })
        .catch(reject);
  }
  

async function log(message){
    const uid =auth.currentUser.uid
    const remoteLog = await db.collection(COLLECTIONS.remoteLogs).doc(uid).get()
    if(remoteLog.data().loggingEnabled){
      db.collection(COLLECTIONS.remoteLogs).doc(uid).collection('logs').doc(`${Date.now()}`).set({message:message})
    }
}

export const remoteConsole = {
    start,stop,log,clear
}