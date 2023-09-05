import { format } from "date-fns";
import { getApiCollectionItem, listApiCollection } from "./apiHelpers";



interface HumanReadableDate {
  day: number;
  weekday: string;
  monthAbbreviation: string;
}

export function getHumanReadableDate(date: Date): HumanReadableDate {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthAbbreviations = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const day = date.getDate();
  const weekday = daysOfWeek[date.getDay()];
  const monthAbbreviation = monthAbbreviations[date.getMonth()];

  return {
    day,
    weekday,
    monthAbbreviation
  };
}
/**
 * 
 * @param date1 
 * @param date2 
 * @returns the difference between date1 and date2 in number of days 
 */
export function getDateDiffInDays(date1: Date, date2: Date): number {
  const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day

  const diffInMilliseconds = Math.abs(date1.getTime() - date2.getTime()); // Get the absolute difference in milliseconds
  const diffInDays = Math.floor(diffInMilliseconds / oneDay); // Convert milliseconds to days

  return diffInDays;
}

/**
 * 
 * @param length 
 * @returns 
 */
export function getRandomString(length: number) {
  return (Math.random() + 1).toString(36).substring(length);
}

/**
 * 
 * @param date 
 * @description returns formated date in this format <Month> <Day of the Month> E.g Aug 02 
 * @returns 
 */
export function formatDate(date: string) {
  const formatedDated = format(new Date(date), 'LLL dd') // Month 01
  return formatedDated
}

/**
 * 
 * @param datetimeString: string
 * @param getTime: string
 * @param getDate: string
 * @description returns time string by default except getDate parameter is set to true
 * @returns 
 */
export function getTimeOrDateFromDateTimeString(datetimeString: string, getDate?: boolean): string {
  const splitedDateTime = datetimeString.split('T')
  const date = splitedDateTime[0]
  const time = splitedDateTime[1]

  if (getDate) return date;
  return time
}



export function isNullish(value: unknown){
  if (value === null){
    return true
  }
  return false
}