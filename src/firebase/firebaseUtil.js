import Firebase from 'firebase';

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