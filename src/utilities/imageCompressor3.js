
const pica = require('./pica/index')();
var img = new Image();
var canvas = document.createElement('canvas');

function smallest(a,b){
	if(a<b){
		return a
	}else{
		return b
	}
}
function reductionPercentage(min,val){
	if(val<min){
		return 99
	}else{
		return(min/val)*100
	}
}
export const imageCompressor=(blob,minimumDimension,callback)=>{
img.crossOrigin = "Anonymous"; //cors support
img.src = blob.preview;
canvas.style.width= 500
canvas.style.height= 500
console.log(blob)
img.onload = function(){
    console.log(img.width,img.height)
    pica.resize(img, canvas)
  .then(result => pica.toBlob(result, blob.type))
  .then(blob => callback(blob));
};

   
}