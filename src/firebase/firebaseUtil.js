import Firebase from 'firebase';
window.firebase = Firebase;
export function callRemoteMethod(methodName, request, callback) {
    const db = Firebase.app().database();
    const uid = Firebase.auth().getUid();
    if (!request.uid && uid) {
        request.uid = uid;
    }
    request = getSimpleObj(request)
    console.log(methodName, "request", request)
    return db.ref(`remoteMethod/request/${methodName}`).push(request).then((snapshot) => {
        const key = snapshot.key;
        var tt = setTimeout(() => {
            db.ref(`remoteMethod/response/${methodName}/${key}`).off();
            callback({ error: 'Timeout, please try again' });
        }, 30000);
        return db.ref(`remoteMethod/response/${methodName}/${key}`).on('value', (snap) => {
            let response = snap.val();
            console.log(methodName, "response", response)
            if (response) {
                clearTimeout(tt);
                callback(response);
                let promises = [];
                promises.push(db.ref(`remoteMethod/response/${methodName}/${key}`).off());
                promises.push(db.ref(`remoteMethod/response/${methodName}/${key}`).remove());
                promises.push(db.ref(`remoteMethod/request/${methodName}/${key}`).remove());
                return Promise.all(promises);
            }
        });
    });
}

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
        const receiveResponse = Promise.race([
            db.collection('remoteMethod').doc('response').collection(methodName).doc(key).onSnapshot(querySnapshot => {
                if(querySnapshot.data() === undefined){
                    console.log('querySnapshot loading ...');
                } else {
                    console.log('querySnapshot received ...', querySnapshot.data());
                    callback(querySnapshot.data());
                    let promises = [];
                    promises.push(db.collection('remoteMethod').doc('request').collection(methodName).doc(key).delete());
                    promises.push(db.collection('remoteMethod').doc('response').collection(methodName).doc(key).delete());
                    return Promise.all(promises);    
                }
            }, err => {
                throw new Error('Still waiting for fetching data ...');
            }),
            new Promise(function (resolve, reject){
                setTimeout(() => reject (new Error('Timeout, please try again')), 30000)
            })
        ]);

        receiveResponse.then((doc) => {           
        }).catch(e => {
            console.log('error ...',e)
        }).finally(() => {
            console.log('fetching data starting ...')
        });
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