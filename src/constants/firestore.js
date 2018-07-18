

export const COLLECTIONS = {
    users:'users',
    candidates:'candidates',
    submissions:'submissions',
    events:'events',
    profiles:'profiles',
    education:'education',
    experience:'experience'
}
export const LISTENER =(COLLECTION,UID)=>{
    switch (COLLECTION) {
        case COLLECTIONS.profiles:
        case COLLECTIONS.users:
        case COLLECTIONS.events:
        case COLLECTIONS.submissions:
            return{
                collection: COLLECTION,
                    doc: UID,
                  };
        case COLLECTIONS.education:
        case COLLECTIONS.experience:
            return{
                collection: COLLECTIONS.profiles,
                     doc: UID,
                    subcollections: [{ collection: COLLECTION }],
                    storeAs:COLLECTION
                        };
        default:
            break;
    }
}