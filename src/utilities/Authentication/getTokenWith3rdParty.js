import { auth } from '../../store/index'
import { CLOUD_FUNCTIONS, cloudFunction } from '../CloudFunctions';

export const getTokenWith3rdParty = (user, callback) => {
    const request = { 
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        provider: user.provider,
        avatarURL: user.avatarURL
    };

    cloudFunction(CLOUD_FUNCTIONS.AUTHENTICATE_3RD_PARTY, request
        ,(result) => {
            auth.signInWithCustomToken(result.data.token).then(()=>{
                callback(result.data.route);
            });
            console.log("Call authenticate3rdParty success: ", result);
        }
        ,(error) => {
            console.log("Call authenticate3rdParty error: ", error);
        });
};