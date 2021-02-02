interface AnyObject {
  [key: string]: string | number | boolean;
}

/**
 * Truncates a string with '...'
 * @param str the string to truncate
 * @param num the maximum number of characters before truncating
 */
export function truncateString(str: string, num: number): string {
  if (str.length <= num) {
    return str;
  }
  return `${str.slice(0, num)}...`;
}

/**
 * Merge to arrays of objects - uses the supplied key to check for duplicates
 * @param newArray The new array of objects
 * @param oldArray The old array of objects
 */
export const mergeArray = (
  oldArray: AnyObject[],
  newArray: AnyObject[],
  key = 'id'
): AnyObject[] => {
  const oldArrayWithUpdatedValues = oldArray.map((e) => {
    const updatedElement = newArray.find((n) => n[key] === e[key]);
    if (updatedElement) return updatedElement;
    return e;
  });

  const exsitingIds = new Set(oldArrayWithUpdatedValues.map((d) => d[key]));

  return [
    ...oldArrayWithUpdatedValues,
    ...newArray.filter((d) => !exsitingIds.has(d[key]))
  ];
};

export default truncateString;
