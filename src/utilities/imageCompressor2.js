import ImageCompressor from 'image-compressor.js';
var img = new Image();
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
img.onload = function(){
    console.log(img.width,img.height)
    new ImageCompressor(blob, {
        quality: .4,
        success(result) {
          const formData = new FormData();
    
          formData.append('file', result, result.name);
          console.log(result)

          callback(result)
          
        },
        error(e) {
          console.log(e.message);
        },
      });
};

   
}