export function shallowCompare(left: any, right: any) {
  if (left === right) {
    return true;
  }

  const leftKeys = Object.keys(left);

  for (let lk of leftKeys) {
    if (left[lk] !== right[lk]) {
      return false;
    }
  }

  return true;
}
