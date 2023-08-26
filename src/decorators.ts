import { LogLevel, pConsole } from './pConsole';

export function logCall(level: LogLevel) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args: any[]) {
            pConsole[level](`${this.constructor.name}.${propertyKey}`);
            return originalMethod.apply(this, args);
        };
        return descriptor;
    };
}

export function trackTime(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
): PropertyDescriptor {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
        const start = Date.now();
        const result = originalMethod.apply(this, args);
        pConsole.debug(`${this.constructor.name}.${propertyKey} time: ${Date.now() - start} ms`);
        return result;
    };
    return descriptor;
}
