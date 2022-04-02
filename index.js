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

//For "function"
function fnc(function1, function2) {
  if (typeof function1 !== "function" || typeof function2 !== "function")
    return undefined;
  if (function1.toString() !== function2.toString()) return false;
  return true;
}

//For "object"
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
    for (key in object1) {
      if (!any(object1[key], object2[key])) return false;
    }
    return true;
  }
}

//For "array"
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
  if (array1.length === array2.length) {
    array1.sort();
    array2.sort();
    for (i = 0; i < array1.length; i++) {
      if (!any(array1[i], array2[i])) return false;
    }
    return true;
  }
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
