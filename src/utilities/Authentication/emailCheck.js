import { CLOUD_FUNCTIONS, cloudFunction } from '../CloudFunctions';

export const checkEmail = (email, success, fail) => {
    const request = { 
        email: email.toLowerCase()
    };

    cloudFunction(CLOUD_FUNCTIONS.CHECK_EMAIL, request
        ,(result) => {
            console.log("Call checkEmail success: ", result);
            success(result);
        }
        ,(error) => {
            console.log("Call checkEmail error: ", error.message);
            fail(error);
        });
};