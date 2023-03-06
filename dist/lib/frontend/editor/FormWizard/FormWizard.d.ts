export declare abstract class FormWizard {
    params: any;
    model: any;
    databaseName: any;
    tableName: any;
    tableColumns: any;
    constructor(params: any);
    getDataSources(): {
        class: string;
        name: string;
        database: any;
        table: any;
        limit: string;
        countQuery: any;
        singleQuery: any;
        multipleQuery: any;
    }[];
    abstract getCountQuery(): any;
    abstract getSingleQuery(): any;
    abstract getMultipleQuery(): any;
    getFieldClass(column: any): "CheckBoxField" | "DateField" | "TextAreaField" | "TextBoxField";
    getField(column: any): any;
    getFields(): any;
    getColumns(): any;
    getFormParams(): {
        name: any;
        caption: any;
        class: any;
        dataSources: {
            class: string;
            name: string;
            database: any;
            table: any;
            limit: string;
            countQuery: any;
            singleQuery: any;
            multipleQuery: any;
        }[];
        fields: any;
    };
}
