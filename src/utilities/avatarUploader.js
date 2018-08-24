import {firebaseStorage,auth} from '../store'
const pica = require('./pica/index')();
var img = new Image();
var canvas = document.createElement('canvas');


//takes in blob, callback returns download url
export const avatarUploader=(blob,callback)=>{
img.crossOrigin = "Anonymous"; //cors support
img.src = blob.preview;
const ref = `${uid}/avatarPhotos/${Date.now()}/${blob.name}`
const documentRef = firebaseStorage.child(ref)
const uid = auth.currentUser.uid
const minimumDimension = 500
img.onload = function(){
	const fromWidth = img.width
	const fromHeight = img.height
	const percentage = reductionPercentage(minimumDimension,smallest(fromWidth,fromHeight))
	//set output dimensions
	canvas.width= fromWidth*percentage
	canvas.height= fromHeight*percentage

    pica.resize(img, canvas)
  .then(result => pica.toBlob(result, blob.type))
  .then(blob => 
	documentRef.put(blob).then((snapShot)=>{
		firebaseStorage
        .child(snapShot.metadata.fullPath)
        .getDownloadURL()
        .then(url => {
            callback(url)
        })}))
	
}; 
}


//helper
function smallest(a,b){
	if(a<b){
		return a
	}else{
		return b
	}
}
function reductionPercentage(min,val){
	if(val<min){
		return 0.99
	}else{
		return(min/val)
	}
}

