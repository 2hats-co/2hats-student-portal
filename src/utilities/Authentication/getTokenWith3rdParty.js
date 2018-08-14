import request from 'superagent'
import {auth} from '../../store/index'
import { withRouter } from "react-router-dom";

const API = 'https://us-central1-staging2hats.cloudfunctions.net/restApiAuthenticate3rdParty';

export const getTokenWith3rdParty = (user,callback) =>{
    //console.log(this)
    request
  .post(API)
  .send({ 
    provider:user.provider,
    email:user.email,
    id:user.id,
    firstName:user.firstName,
    lastName:user.lastName,
    avatarURL:user.avatarURL

  }) // sends a JSON post body
  .set('X-API-Key', 'foobar')
  .set('accept', 'json')
  .end((err, res) => {
   console.log(res.body)
    //console.log(JSON.parse(res.text))
    if(res){
       
        auth.signInWithCustomToken(res.body.token).then(()=>{
            callback(res.body.route)
        })
    }
    if(err){
        console.log(err)
    }
   
});
}


//const { providerId,email,id,firstName,lastName,avatarURL} = req;