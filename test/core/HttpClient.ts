import { Server } from 'http';
import supertest, { Response } from 'supertest';

export class HttpClient {
    constructor(private httpServer: Server) {}

    async get(url: string, headers?: object): Promise<Response> {
        let req = supertest(this.httpServer).get(url);
        if (headers) {
            req = req.set(headers);
        }
        return await req;
    }

    async post(url: string, body: any, headers?: object): Promise<Response> {
        let req = supertest(this.httpServer).post(url).send(body);
        if (headers) {
            req = req.set(headers);
        }
        return await req;
    }
}
