import { debug } from './console';

export function logCall(target: any, propertyKey: string, descriptor: PropertyDescriptor): any {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
        debug(`- ${this.constructor.name}.${propertyKey} -`);
        return originalMethod.apply(this, args);
    };
    return descriptor;
}
