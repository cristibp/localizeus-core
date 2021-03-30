export default class ArrayHelper {
  // Remove and return the first occurrence

  static removeOne(array, predicate) {
    for (let i = 0; i < array.length; i++) {
      if (predicate(array[i])) {
        return array.splice(i, 1);
      }
    }
  };

  // Remove and return all occurrences

  static remove(array, predicate) {
    const removed = [];

    for (let i = 0; i < array.length;) {
      if (predicate(array[i])) {
        removed.push(array.splice(i, 1));
        continue;
      }
      i++;
    }
    return removed;
  };

  static toString(array) {
    return array.join();
  }
}
