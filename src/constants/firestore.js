export const COLLECTIONS = {
    users:'users',
    submissions:'submissions',
    upcomingEvents:'upcomingEvents',
    profiles:'profiles',
    emailVerifications: 'emailVerifications'
}


export const LISTENER =(COLLECTION,UID)=>{
    switch (COLLECTION) {
        case COLLECTIONS.profiles:
        case COLLECTIONS.users:
        case COLLECTIONS.submissions:
            return{
                collection: COLLECTION,
                    doc: UID,
                  };
        default: return{collection:COLLECTION}
    }
}