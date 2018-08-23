export const COLLECTIONS = {
    users:'users',
    submissions:'submissions',
    upcomingEvents:'upcomingEvents',
    profiles:'profiles',
    emailVerifications: 'emailVerifications',
    smartLinks: 'smartLinks',
    remoteLogs:'remoteLogs'
}


export const LISTENER =(COLLECTION,UID)=>{
    switch (COLLECTION) {
        case COLLECTIONS.profiles:
        case COLLECTIONS.users:
        case COLLECTIONS.submissions:
        case COLLECTIONS.smartLinks:
            return{
                collection: COLLECTION,
                    doc: UID,
                  };
        default: return{collection:COLLECTION}
    }
}