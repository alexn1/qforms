import { Pool } from 'pg';

export class Logger {
    constructor(logErrorUrl: string, private logPool: Pool) {}
}
