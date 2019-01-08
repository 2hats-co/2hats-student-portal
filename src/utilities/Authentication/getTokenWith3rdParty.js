import { auth } from "../../store";
import { CLOUD_FUNCTIONS, cloudFunction } from "../CloudFunctions";

export const getTokenWith3rdParty = async (user, callback) => {
  const request = {
    id: user.id,
    email: user.email.toLowerCase(),
    firstName: user.firstName,
    lastName: user.lastName,
    provider: user.provider,
    avatarURL: user.avatarURL || "",
    bio: user.bio || "",
    token: user.token
  };
  if (user.avatarURL) {
  }

  cloudFunction(
    CLOUD_FUNCTIONS.AUTHENTICATE_3RD_PARTY,
    request,
    result => {
      auth.signInWithCustomToken(result.data.token).then(() => {
        callback(result.data.route);
      });
      console.log("Call authenticate3rdParty success: ", result);
    },
    error => {
      console.log("Call authenticate3rdParty error: ", error);
    }
  );
};

export const getTokenWithGoogle = async (user, callback) => {
  const request = {
    jwtToken: user.jwtToken
  };
  if (user.avatarURL) {
  }
  cloudFunction(
    CLOUD_FUNCTIONS.AUTHENTICATE_GOOGLE,
    request,
    result => {
      auth.signInWithCustomToken(result.data.token).then(() => {
        callback(result.data.route);
      });
      console.log("Call authenticate3rdParty success: ", result);
    },
    error => {
      console.log("Call authenticate3rdParty error: ", error);
    }
  );
};

export const getTokenWithLinkedIn = async (authCodeObj, callback) => {
  const request = {
    authCode: authCodeObj.authCode,
    redirectUri: authCodeObj.redirectUri
  };
  cloudFunction(
    CLOUD_FUNCTIONS.AUTHENTICATE_LINKEDIN,
    request,
    result => {
      auth.signInWithCustomToken(result.data.tokens).then(() => {
        callback(result.data.route);
      });
      console.log("Call authenticate3rdParty success: ", result);
    },
    error => {
      console.log("Call authenticate3rdParty error: ", error);
    }
  );
};
