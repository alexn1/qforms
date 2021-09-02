import JsonFile from './JsonFile';

export type AppInfo = {
    appFile     : JsonFile;
    name        : string;
    caption     : string;
    fullName    : string;
    envs        : string[];
    fileName    : string;
    dirName     : string;
    filePath    : string;
    fileNameExt : string;
    extName     : string;
    dirPath     : string;
};
