import request from 'superagent'
const API = 'https://us-central1-staging2hats.cloudfunctions.net/restApiCheckEmail';

export const checkEmail = (email,callback) =>{
    request
  .post(API)
  .send({ email: email}) // sends a JSON post body
  .set('X-API-Key', 'foobar')
  .set('accept', 'json')
  .end((err, res) => {
   // console.log(res)
    //console.log(JSON.parse(res.text))
    callback(JSON.parse(res.text))
    //this.setState({emailReport:JSON.parse(res.text)})
});
}