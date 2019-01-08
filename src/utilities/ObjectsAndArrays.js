export function forEach(object, action) {
  const profile = object;
  for (const field in profile) {
    if (profile.hasOwnProperty(field)) {
      const value = profile[field];
      action(field, value);
    }
  }
}

export function orderByInt(objectsArray, field, asc) {
  let clonedArray = objectsArray.slice(0);
  let fieldValues = clonedArray.map(x => x[field]);
  if (asc) {
    fieldValues.sort(function(a, b) {
      return a - b;
    });
  } else {
    fieldValues.sort(function(a, b) {
      return b - a;
    });
  }

  // console.log('fieldValues', fieldValues);
  let sortedObjects = [];
  // clonedArray.forEach(x => {
  //   console.log(fieldValues.indexOf(x[field]));
  // });

  return sortedObjects;
}

// function isBigger(a, b) {
//   if (a < b) {
//     return false;
//   } else {
//     return true;
//   }
// }
