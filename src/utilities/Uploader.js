import { firebaseStorage } from '../firebase/storage';
import { auth } from '../store';
import Pica from 'pica';
const pica = Pica();
var img = new Image();
var canvas = document.createElement('canvas');
//takes in blob, callback returns download url

export const blobAvatarUploader = (intialBlob, callback) => {
  img.crossOrigin = 'Anonymous'; //cors support
  img.src = intialBlob.preview || intialBlob;
  const uid = auth.currentUser.uid;
  const ref = `candidates/${uid}/avatarPhotos/${Date.now()}/${intialBlob.name ||
    'avatarPhoto'}`;
  const minimumDimension = 500;
  img.onload = function() {
    const intialSize = { width: img.width, height: img.height };
    compressor(intialBlob.type, minimumDimension, intialSize, blob => {
      uploader(ref, blob, callback);
    });
  };
};
//compresses blob image
function compressor(fileType, minimumDimension, intialSize, callback) {
  const percentage = reductionPercentage(
    minimumDimension,
    smallest(intialSize.width, intialSize.height)
  );
  //set output dimensions
  canvas.width = intialSize.width * percentage;
  canvas.height = intialSize.height * percentage;
  pica
    .resize(img, canvas)
    .then(result => pica.toBlob(result, fileType))
    .then(blob => callback(blob));
}

//uploads to storagebucket
export function uploader(ref, blob, callback) {
  const documentRef = firebaseStorage.child(ref);
  documentRef.put(blob).then(snapShot => {
    firebaseStorage
      .child(snapShot.metadata.fullPath)
      .getDownloadURL()
      .then(url => {
        callback(url);
      });
  });
}

//helpers
function smallest(a, b) {
  if (a < b) {
    return a;
  } else {
    return b;
  }
}
function reductionPercentage(min, val) {
  if (val < min) {
    return 0.99;
  } else {
    return min / val;
  }
}
