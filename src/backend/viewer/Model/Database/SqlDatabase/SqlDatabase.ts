import { BkDatabase } from '../Database';

export abstract class SqlDatabase<TConnection = any> extends BkDatabase<TConnection> {
    getUpdateQuery(tableName, values, where): string {
        console.log('SqlDatabase.getUpdateQuery', tableName);
        const valueKeys = Object.keys(values);
        const whereKeys = Object.keys(where);
        if (valueKeys.length === 0) throw new Error('getUpdateQuery: no values');
        if (whereKeys.length === 0) throw new Error('getUpdateQuery: no where');
        const valuesString = valueKeys.map((name) => `${name} = {val_${name}}`).join(', ');
        const whereString = whereKeys.map((name) => `${name} = {key_${name}}`).join(' and ');
        return `update ${tableName} set ${valuesString} where ${whereString}`;
    }

    getInsertQuery(tableName, values): string {
        console.log('SqlDatabase.getInsertQuery');
        const columns = Object.keys(values);
        const columnsString = columns.join(', ');
        const valuesString = columns.map((column) => `{${column}}`).join(', ');
        const query = `insert into ${tableName}(${columnsString}) values (${valuesString})`;
        // console.log('query:', query);
        return query;
    }

    getDeleteQuery(tableName, rowKeyValues): string {
        console.log('SqlDatabase.getDeleteQuery');
        const keyColumns = Object.keys(rowKeyValues);
        const whereString = keyColumns
            .map((keyColumn) => `${keyColumn} = {${keyColumn}}`)
            .join(' and ');
        const query = `delete from ${tableName} where ${whereString}`;
        // console.log('query:', query);
        return query;
    }

    static getUsedParams(query) {
        const items = query.match(/\{([\w\.@]+)\}/g);
        if (!items) return [];
        return items.map((str) => str.substr(1, str.length - 2));
    }

    static checkParams(query, params) {
        const usedParams = SqlDatabase.getUsedParams(query);
        const paramNames = params ? Object.keys(params) : [];
        const notPassedParams = usedParams.filter((name) => paramNames.indexOf(name) === -1);
        // console.log('notPassedParams:', notPassedParams);
        if (notPassedParams.length > 0) {
            throw new Error(
                `not passed params: ${notPassedParams.join(',')}, passed: ${paramNames.join(
                    ',',
                )}, query: ${query}`,
            );
        }
    }
}
