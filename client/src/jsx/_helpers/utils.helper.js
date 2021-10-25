export function camelCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}

export function keysToLowerCase(obj = {}) {
  var key,
    keys = Object.keys(obj);
  var n = keys.length;
  var newObj = {};
  while (n--) {
    key = keys[n];
    newObj[key.toLowerCase()] = obj[key];
  }
  return newObj;
}
