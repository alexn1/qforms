import { LogLevel } from './pConsole';
export declare function logCall(level: LogLevel): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
export declare function trackTime(target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor;
