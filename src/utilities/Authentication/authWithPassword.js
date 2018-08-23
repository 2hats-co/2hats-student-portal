import {auth,db} from '../../store/index'
import {INTRODUCTION, DASHBOARD} from '../../constants/routes'
export const createUserWithPassword=(user,routeHandler,errorHandler)=>{
    const { firstName, lastName, email, password } = user
    
    auth.createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        authUser.user.updateProfile({
          displayName: `${firstName} ${lastName}`
        }).then(()=>{
            console.log(authUser)
            const uid = authUser.user.uid
            db.collection('users').doc(uid).set({
                emailVerified: false,
                email,
                firstName,
                lastName,
                createdAt: new Date(),
                providers:[{service:'password',id:uid}],
                signupMethod:'password',
                stage:'pre-review',// TODO use stage and status constants
                status:'incomplete',
              })
              db.collection('profiles').doc(uid).set({
                education:[],
                experience:[],
                industry:'OTHER',
                bio:'',
                careerInterests:{type:'defualt',value:[]},
                skills:[],
                resumeFile:{name:'',fullPath:'',downloadURL:''},
                isComplete:false,
                hasSubmit: false,
                createdAt: Date.now()
              })
              routeHandler(INTRODUCTION)
        })
      }).catch(error => {  
        errorHandler(error)
      });
}

export const signInWithPassword = (user,routeHandler,errorHandler) =>{
    const {email,password} = user
    auth.signInWithEmailAndPassword(email, password)
    .then(async(authUser) => {
       db.collection('users').doc(authUser.user.uid).get().then((userDoc)=>{
        const doc = userDoc.data()
        console.log(doc)
        if(doc.process ==='build' || doc.process==='upload'){
            //TODO: process constants
            routeHandler(DASHBOARD)
        }else{
            routeHandler(INTRODUCTION)
        }
       })
        
      })
      .catch(error => {
        errorHandler(error)
      });
}

export const updateUserPassword = (password, routeHandler, errorHandler) => {
  auth.currentUser.updatePassword(password).then(() => {
    // Update successful.
    routeHandler();
  }).catch((error) => {
    // An error happened.
    errorHandler(error);
  });
}