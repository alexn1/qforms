export type Key = string;
export type Row = Object;
export type Insert = Key[];
export type Delete = Key[];

export class InsertEx {
    [key: Key]: Row;
}

export class Update {
    [oldKey: Key]: Key;
}

export class UpdateEx {
    [oldKey: Key]: Row;
}

export class TResult {
    insert?: Insert;
    insertEx?: InsertEx;
    update?: Update;
    updateEx?: UpdateEx;
    delete?: Delete;
}

export class DResult {
    [name: string]: TResult;
}

export class Result {
    [name: string]: DResult;

    static addInsertToResult(result: Result, dName: string, tName: string, key: Key): void {
        if (!result[dName]) result[dName] = new DResult();
        if (!result[dName][tName]) result[dName][tName] = new TResult();
        if (!result[dName][tName].insert) result[dName][tName].insert = [];
        result[dName][tName].insert.push(key);
    }

    static addInsertExToResult(
        result: Result,
        dName: string,
        tName: string,
        key: Key,
        row: Row,
    ): void {
        if (!result[dName]) result[dName] = new DResult();
        if (!result[dName][tName]) result[dName][tName] = new TResult();
        if (!result[dName][tName].insertEx) result[dName][tName].insertEx = new InsertEx();
        result[dName][tName].insertEx[key] = row;
    }

    static addUpdateToResult(
        result: Result,
        dName: string,
        tName: string,
        oldKey: Key,
        newKey: Key,
    ): void {
        // console.log('Result.addUpdateToResult');
        if (!result[dName]) result[dName] = new DResult();
        if (!result[dName][tName]) result[dName][tName] = new TResult();
        if (!result[dName][tName].update) result[dName][tName].update = new Update();
        result[dName][tName].update[oldKey] = newKey;
    }

    static addUpdateExToResult(
        result: Result,
        dName: string,
        tName: string,
        oldKey: Key,
        row: Row,
    ): void {
        // console.log('Result.addUpdateExToResult');
        if (!result[dName]) result[dName] = new DResult();
        if (!result[dName][tName]) result[dName][tName] = new TResult();
        if (!result[dName][tName].updateEx) result[dName][tName].updateEx = new UpdateEx();
        result[dName][tName].updateEx[oldKey] = row;
    }

    static addDeleteToResult(result: Result, dName: string, tName: string, key: Key): void {
        if (!result[dName]) result[dName] = new DResult();
        if (!result[dName][tName]) result[dName][tName] = new TResult();
        if (!result[dName][tName].delete) result[dName][tName].delete = [];
        result[dName][tName].delete.push(key);
    }

    static addTableToResult(result: Result, dName: string, tName: string, tResult: TResult): void {
        if (!result[dName]) result[dName] = {};
        if (result[dName][tName]) throw new Error(`table ${tName} already exists`);
        result[dName][tName] = tResult;
    }
}
