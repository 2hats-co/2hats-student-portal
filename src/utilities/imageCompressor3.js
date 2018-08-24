
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
		return 0.99
	}else{
		return(min/val)
	}
}
export const imageCompressor=(blob,minimumDimension,callback)=>{
img.crossOrigin = "Anonymous"; //cors support
img.src = blob.preview;

console.log(blob)
img.onload = function(){
	const fromWidth = img.width
	const fromHeight = img.height
	const percentage = reductionPercentage(minimumDimension,smallest(fromWidth,fromHeight))
	//set output dimensions
	canvas.width= fromWidth*percentage
	canvas.height= fromHeight*percentage

    pica.resize(img, canvas)
  .then(result => pica.toBlob(result, blob.type))
  .then(blob => callback(blob));
};

   
}