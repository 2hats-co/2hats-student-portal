import request from 'superagent';
const API =
  'https://us-central1-staging2hats.cloudfunctions.net/restApiResetPasswordEmail';

export const resetPasswordEmail = (email, callback) => {
  request
    .post(API)
    .send({ email: email }) // sends a JSON post body
    .set('X-API-Key', 'foobar')
    .set('accept', 'json')
    .end((err, res) => {
      console.log(res.body);
      //console.log(JSON.parse(res.text))
      // if(callback&& res){
      // callback(JSON.parse(res.text))
      // }
      if (err) {
        console.log(err);
      }
      //this.setState({emailReport:JSON.parse(res.text)})
    });
};
