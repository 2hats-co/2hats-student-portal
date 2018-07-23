import Firebase from 'firebase';
window.firebase = Firebase;


export function callRemoteMethodOnFirestore(methodName, request, callback) {
    const db = Firebase.firestore();
    const uid = Firebase.auth().getUid();
    if (!request.uid && uid) {
        request.uid = uid;
    }
    request = getSimpleObj(request)
    console.log(methodName, "request", request)
    return db.collection('remoteMethod').doc('request').collection(methodName).add(request).then((snapshot) => {
        console.log('request successfully added ...', snapshot);
        const key = snapshot.id;
        var tt = setTimeout(() => {
            //db.ref(`remoteMethod/response/${methodName}/${key}`).off();
            callback({ code: 'Timeout, please try again' });
        }, 25000);
        db.collection('remoteMethod').doc('response').collection(methodName).doc(key).onSnapshot(querySnapshot => {
            if (querySnapshot.data() === undefined) {
                console.log('querySnapshot loading ...');
            } else {
                console.log('querySnapshot received ...', querySnapshot.data());
                callback(querySnapshot.data());
                if (querySnapshot.data().customToken) {
                    clearTimeout(tt);
                    let promises = [];
                    promises.push(db.collection('remoteMethod').doc('request').collection(methodName).doc(key).delete());
                    promises.push(db.collection('remoteMethod').doc('response').collection(methodName).doc(key).delete());
                    return Promise.all(promises);
                }
            }
        })
        // const receiveResponse = Promise.race([
        //     // first 
        //     db.collection('remoteMethod').doc('response').collection(methodName).doc(key).onSnapshot(querySnapshot => {
        //         if (querySnapshot.data() === undefined) {
        //             console.log('querySnapshot loading ...');
        //         } else {
        //             console.log('querySnapshot received ...', querySnapshot.data());
        //             callback(querySnapshot.data());
        //             let promises = [];
        //             promises.push(db.collection('remoteMethod').doc('request').collection(methodName).doc(key).delete());
        //             promises.push(db.collection('remoteMethod').doc('response').collection(methodName).doc(key).delete());
        //             return Promise.all(promises);
        //         }
        //     }),
        //     // new Promise(function (resolve, reject) {
        //     //     setTimeout(resolve, 2000, 'Timeout, please try again 1');
        //     // }),
        //     // second
        //     new Promise(function (resolve, reject) {
        //         setTimeout(() => reject(new Error('Timeout, please try again 2')), 2000)
        //     })
        // ]);

        // receiveResponse.then((doc) => {
        //     console.log('finishing fetching data ...', doc);
        // }).catch((e) => {
        //     console.log('error ...', e)
        // })
    });
}
function cleanNull(obj) {
    for (let k in obj) {
        // console.log(typeof obj[k])
        if (!obj[k]) {
            delete obj[k];
        } else if (Array.isArray(obj[k])) {
            for (let i = 0; i < obj[k].length; i++) {
                if (obj[k][i]) {
                    cleanNull(obj[k][i]);
                }
            }
        } else if (typeof obj[k] == 'object') {
            cleanNull(obj[k]);
        }
    }
}
function getSimpleObj(obj) {
    console.log("getSimpleObj", obj)
    let newObj = JSON.parse(JSON.stringify(obj));
    cleanNull(newObj);
    console.log("getSimpleObj result", newObj)
    return newObj;
}