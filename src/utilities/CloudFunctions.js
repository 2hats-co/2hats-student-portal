import { functions } from "../store";

export const CLOUD_FUNCTIONS = {
    SPEEDY_SIGNUP: "restApiSpeedySignup",
    AUTHENTICATE_3RD_PARTY: "restApiAuthenticate3rdParty",
    CHECK_EMAIL: "restApiCheckEmail",
    SMART_LINK: "restApiSmartLink",
    RESET_PASSWORD: "restApiResetPassword",
    VALIDATE_EMAIL:'restApiVaildateEmail',
    DISABLE_SMART_LINK:'restApiDisableSmartLink'
};

export const cloudFunction = (name, input ,success, fail) =>{
    const callable = functions.httpsCallable(name);

    callable(input)
        .then((result) => {
            if(success){
                success(result);
            }
        })
        .catch((error) => {
            if(fail){
                fail(error);
            }
        });
};

