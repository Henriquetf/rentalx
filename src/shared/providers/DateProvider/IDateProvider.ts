export interface IDateProvider {
  convertToUTC(date: Date): string;
  compareInHours(start_date: Date, end_date: Date): number;
  compareInDays(start_date: Date, end_date: Date): number;
  compareIsBefore(start_date: Date, end_date: Date): boolean;
  dateNow(): Date;
  addDays(days: number): Date;
  addHours(hours: number): Date;
}
