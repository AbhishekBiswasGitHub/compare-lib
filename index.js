// For any type
function any(item1, item2) {
  if (typeof item1 !== typeof item2) return false;
  switch (typeof item1) {
    case "function":
      //For "function"
      if (!fnc(item1, item2)) return false;
      return true;
    case "object":
      // For type "object" (object, array, null)
      if (item1) {
        // Not "null"
        if (item1.length === undefined) {
          // For "object"
          if (!obj(item1, item2)) return false;
          return true;
        } else {
          // For "array"
          if (!arr(item1, item2)) return false;
          return true;
        }
      } else {
        // For "null"
        if (typeof item2 === "object" && !item2) return true;
        return false;
      }
    case "undefined":
      // For "undefined"
      if (typeof item2 !== "undefined") return false;
      return true;
    default:
      if (typeof item1 === "number" && isNaN(item1)) {
        // For "NaN"
        if (isNaN(item2)) return true;
        return false;
      }
      // For rest (string, number, boolean)
      if (!rest(item1, item2)) return false;
      return true;
  }
}

// For "function"
function fnc(function1, function2) {
  if (typeof function1 !== "function" || typeof function2 !== "function")
    return undefined;
  if (function1.toString() !== function2.toString()) return false;
  return true;
}

// For "object"
function obj(object1, object2) {
  if (
    !object1 ||
    !object2 ||
    typeof object1 !== "object" ||
    typeof object2 !== "object" ||
    object1.length !== undefined ||
    object2.length !== undefined
  )
    return undefined;
  if (Object.keys(object1).length === Object.keys(object2).length) {
    for (let key in object1) {
      if (!any(object1[key], object2[key])) return false;
    }
    return true;
  }
}

// For "array"
function arr(array1, array2) {
  if (
    !array1 ||
    !array2 ||
    typeof array1 !== "object" ||
    typeof array2 !== "object" ||
    array1.length === undefined ||
    array2.length === undefined
  )
    return undefined;

  if (array1.length !== array2.length) return false;

  const arrays1 = separateArray(array1);
  const arrays2 = separateArray(array2);

  if (
    arrays1[0].length !== arrays2[0].length ||
    arrays1[1].length !== arrays2[1].length
  )
    return false;
  if (!arrays1[1].length) if (restArray(arrays1[0], arrays2[0])) return true;
  if (restArray(arrays1[0], arrays2[0]) && objectArray(arrays1[1], arrays2[1]))
    return true;
  return false;
}

// For separating objects from rest
function separateArray(input) {
  const rest = [...input];
  const objcets = [];

  for (let i = rest.length - 1; i >= 0; i--) {
    if (typeof rest[i] === "object" && rest[i]) {
      const object = rest.splice(i, 1)[0];
      let addObject = true;

      for (let j = 0; j < objcets.length; j += 2) {
        if (any(object, objcets[j])) {
          objcets[j + 1] += 1;
          addObject = false;
          break;
        }
      }
      if (addObject) objcets.push(object, 1);
    }
  }

  rest.sort();

  return [rest, objcets];
}

// For comparing the array without objects
function restArray(array1, array2) {
  if (array1.length === array2.length) {
    for (let i = 0; i < array1.length; i++) {
      if (!any(array1[i], array2[i])) return false;
    }
    return true;
  }
  return false;
}

// For comparing the array with objects
function objectArray(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i += 2) {
    let isEqual = false;
    for (let j = 0; j < arr2.length; j += 2) {
      if (any(arr1[i], arr2[j]) && arr1[i + 1] === arr2[j + 1]) {
        isEqual = true;
        break;
      }
    }
    if (!isEqual) return false;
  }

  return true;
}

//For "rest"
function rest(item1, item2) {
  if (item1 !== item2) return false;
  return true;
}

module.exports.any = any;
module.exports.fnc = fnc;
module.exports.obj = obj;
module.exports.arr = arr;
