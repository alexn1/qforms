import { Key, RawRow } from './types';

export type InsertResult = Key[];
export type DeleteResult = Key[];

export class InsertExResult {
    [key: Key]: RawRow;
}

export class UpdateResult {
    [oldKey: Key]: Key;
}

export class UpdateEx {
    [oldKey: Key]: RawRow;
}

export class TableResult {
    insert?: InsertResult;
    insertEx?: InsertExResult;
    update?: UpdateResult;
    updateEx?: UpdateEx;
    delete?: DeleteResult;
    refresh?: boolean;
}

export class DatabaseResult {
    [table: string]: TableResult;
}

export class Result {
    [database: string]: DatabaseResult;

    static addInsertToResult(result: Result, dName: string, tName: string, key: Key): void {
        if (!result[dName]) result[dName] = new DatabaseResult();
        if (!result[dName][tName]) result[dName][tName] = new TableResult();
        if (!result[dName][tName].insert) result[dName][tName].insert = [];
        result[dName][tName].insert!.push(key);
    }

    static addInsertExToResult(
        result: Result,
        dName: string,
        tName: string,
        key: Key,
        row: RawRow,
    ): void {
        if (!result[dName]) result[dName] = new DatabaseResult();
        if (!result[dName][tName]) result[dName][tName] = new TableResult();
        if (!result[dName][tName].insertEx) result[dName][tName].insertEx = new InsertExResult();
        result[dName][tName].insertEx![key] = row;
    }

    static addUpdateToResult(
        result: Result,
        dName: string,
        tName: string,
        oldKey: Key,
        newKey: Key,
    ): void {
        // console.log('Result.addUpdateToResult');
        if (!result[dName]) result[dName] = new DatabaseResult();
        if (!result[dName][tName]) result[dName][tName] = new TableResult();
        if (!result[dName][tName].update) result[dName][tName].update = new UpdateResult();
        result[dName][tName].update![oldKey] = newKey;
    }

    static addUpdateExToResult(
        result: Result,
        dName: string,
        tName: string,
        oldKey: Key,
        row: RawRow,
    ): void {
        // console.log('Result.addUpdateExToResult');
        if (!result[dName]) result[dName] = new DatabaseResult();
        if (!result[dName][tName]) result[dName][tName] = new TableResult();
        if (!result[dName][tName].updateEx) result[dName][tName].updateEx = new UpdateEx();
        result[dName][tName].updateEx![oldKey] = row;
    }

    static addDeleteToResult(result: Result, dName: string, tName: string, key: Key): void {
        if (!result[dName]) result[dName] = new DatabaseResult();
        if (!result[dName][tName]) result[dName][tName] = new TableResult();
        if (!result[dName][tName].delete) result[dName][tName].delete = [];
        result[dName][tName].delete!.push(key);
    }

    static addTableToResult(
        result: Result,
        dName: string,
        tName: string,
        tResult: TableResult,
    ): void {
        if (!result[dName]) result[dName] = {};
        if (result[dName][tName]) throw new Error(`table ${tName} already exists`);
        result[dName][tName] = tResult;
    }
}
