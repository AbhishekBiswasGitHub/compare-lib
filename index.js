function compare(item1, item2) {
  if (typeof item1 !== typeof item2) return false;
  switch (typeof item1) {
    case "function":
      if (!compareFn(item1, item2)) return false;
      return true;
    case "object":
      if (item1) {
        if (item1.length === undefined) {
          if (!compareObj(item1, item2)) return false;
          return true;
        } else {
          if (!compareArr(item1, item2)) return false;
          return true;
        }
      } else {
        if (typeof item2 === "object" && !item2) return true;
        return false;
      }
    case "undefined":
      if (typeof item2 !== "undefined") return false;
      return true;
    default:
      if (typeof item1 === "number" && isNaN(item1)) {
        if (isNaN(item2)) return true;
        return false;
      }
      if (!compareRest(item1, item2)) return false;
      return true;
  }
}

function compareFn(function1, function2) {
  if (function1.toString() !== function2.toString()) return false;
  return true;
}

function compareObj(object1, object2) {
  if (Object.keys(object1).length === Object.keys(object2).length) {
    for (key in object1) {
      if (!compare(object1[key], object2[key])) return false;
    }
    return true;
  }
}

function compareArr(array1, array2) {
  if (array1.length === array2.length) {
    array1.sort();
    array2.sort();
    for (i = 0; i < array1.length; i++) {
      if (!compare(array1[i], array2[i])) return false;
    }
    return true;
  }
}

function compareRest(item1, item2) {
  if (item1 !== item2) return false;
  return true;
}

module.exports.compare = compare;
module.exports.compareFn = compareFn;
module.exports.compareObj = compareObj;
module.exports.compareArr = compareArr;
