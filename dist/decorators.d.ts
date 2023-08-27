import { LogLevel } from './pConsole';
export declare function log(level: LogLevel): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
export declare function time(target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor;
