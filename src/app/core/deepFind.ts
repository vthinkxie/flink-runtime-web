export function deepFind(obj, path) {
  const paths = path.split('.');
  let current = obj;
  for (let i = 0; i < paths.length; ++i) {
    const rePath = paths[ i ].replace('$', '.');
    if (current[ rePath ] === undefined) {
      return undefined;
    } else {
      current = current[ rePath ];
    }
  }
  return current;
}
