import {auth,db} from '../../store/index'

export const createUserWithPassword=(user,responseHandler,errorHandler)=>{
    const { firstName, lastName, email, password } = user
    auth.createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        authUser.user.updateProfile({
          displayName: `${firstName} ${lastName}`
        })
        db.collection('users').doc(authUser.uid).set({
            emailVerified: false,
            email,
            firstName,
            lastName,
            createAt:firebase.firestore.FieldValue.serverTimestamp(),
            providers:[provider],
            stage:'pre-review',// TODO use stage and status constants
            status:'incomplete',
          })
          db.collection('xprofiles').doc(authUser.uid).set({
            education:[],
            experience:[],
            industry:'OTHER',
            bio:'',
            careerInterests:[],
            skills:[],
            resumeFile:{name:'',fullPath:'',downloadURL:''},
            isComplete:false,
            hasSubmit: false,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          })

      }).catch(error => {  
        errorHandler(error)
      });
}

export const signInWithPassword = (user) =>{
    const {email,password} = user
    auth.signInWithEmailAndPassword(email, password)
    .then(async(authUser) => {
        const userDoc = await db.collection('users').doc(authUser.uid).get();
        if(userDoc.process ==='build' || userDoc.process==='upload'){//TODO: process constants
            res.status(200).send({
                token:token,
                route:'/dashboard'//TODO: routes constants
                })
        }else{
            res.status(200).send(
                {token:token,
                    route:'/introduction'
                }
                )
        }
      })
      .catch(error => {
        
      });
}