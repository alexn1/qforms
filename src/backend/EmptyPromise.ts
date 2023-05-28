export class EmptyPromise<T> extends Promise<T> {
    resolve: any;
    reject: any;
}
