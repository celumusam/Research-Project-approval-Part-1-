/**
 * Convert a Date to a string <year>-<month>-<day> format
 * @param date - The date to convert.
 */
export default date => date.toISOString().split('T')[0];
