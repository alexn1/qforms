export declare class DateTimeHelper {
    static today(timeOffset: number): Date;
    static today2(): Date;
    static getStartOfDay(date: Date): Date;
    static SECOND(): number;
    static MINUTE(): number;
    static HOUR(): number;
    static DAY(): number;
    static WEEK(): number;
    static addMinutes(date: Date, minutes: number): void;
    static removeTimezoneOffset(date: Date): void;
    static addTimezoneOffset(date: Date): void;
    static cloneDate(date: Date): Date;
    static currentTime(): string;
}
