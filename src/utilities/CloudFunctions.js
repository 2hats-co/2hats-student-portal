import { functions } from "../store";

export const CLOUD_FUNCTIONS = {
    SPEEDY_SIGNUP: "restApiSpeedySignup",
    AUTHENTICATE_3RD_PARTY: "restApiAuthenticate3rdParty",
    CHECK_EMAIL: "restApiCheckEmail",
    SMART_LINK: "restApiSmartLink",
    RESET_PASSWORD: "restApiResetPassword",
    VALIDATE_EMAIL:'restApiVaildateEmail'
};

export const cloudFunction = (name, input ,success, fail) =>{
    const callable = functions.httpsCallable(name);

    callable(input)
        .then((result) => {
            success(result);
        })
        .catch((error) => {
            fail(error);
        });
};

