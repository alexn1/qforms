import path from 'path';

import { ApplicationEditor } from '../ApplicationEditor/ApplicationEditor';
import { PageEditor } from '../PageEditor/PageEditor';
import { Editor } from '../Editor';
import {
    DataSourceAttributes,
    DataSourceItems,
    DataSourceScheme,
} from '../../../common/Scheme/DataSourceScheme';

export type DataSourceParams = Partial<DataSourceAttributes> &
    Partial<DataSourceItems> & {
        name: string;
    };

export class DataSourceEditor<T extends DataSourceScheme = DataSourceScheme> extends Editor<T> {
    static createData(params: DataSourceParams): DataSourceScheme {
        return {
            '@class': 'DataSource',
            '@attributes': {
                ...DataSourceEditor.createAttributes(params),
            },
            keyColumns: [
                ...(params.keyColumns ? params.keyColumns.map(Editor.createItemData) : []),
            ],
        };
    }

    static createAttributes(params: DataSourceParams): any {
        if (!params.name) throw new Error('no name');
        return {
            name: params.name,
            database: params.database || 'default',
            table: params.table || '',
            modelClass: params.modelClass !== undefined ? params.modelClass : '',
        };
    }

    async getCollectionDirPath() {
        const customDirPath = await this.getParent<Editor>().getCustomDirPath();
        return path.join(customDirPath, 'dataSources');
    }

    async createModelBackJs(params) {
        const filePath = path.join(await this.getCustomDirPath(), 'Model.back.ts');
        const templateFilePath = path.join(
            this.getEditorPath(),
            'Editor/DataSourceEditor/Model.back.ts.ejs',
        );
        const js = await this.createFileByParams(filePath, templateFilePath, {
            _class: this.getClassName(),
            page: params.page ? params.page : '',
            form: params.form ? params.form : '',
            dataSource: this.getName(),
        });
        return js;
    }

    getColName() {
        return 'dataSources';
    }

    async save() {
        if (this.getParent() instanceof ApplicationEditor) {
            await this.getParent<ApplicationEditor>().getAppFile().save();
        } else if (this.getParent() instanceof PageEditor) {
            await this.getParent<PageEditor>().pageFile.save();
        } else {
            await this.getParent().getParent<PageEditor>().pageFile.save();
        }
    }
}
