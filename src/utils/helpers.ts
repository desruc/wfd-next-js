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

export default truncateString;
