/// <reference types="node" />
import fs from 'fs';
export declare function _getFilePathsSync(dirPath: string, ext: string): string[];
export declare function _getFilePaths2(dirPath: string, ext: string, filePaths: string[]): Promise<void>;
export declare function _glob(path: string): Promise<any[]>;
export declare function getFilePathsSync(publicDirPath: string, subDirPath: string, ext: string): string[];
export declare function getFilePaths(dirPath: string, ext: string): Promise<string[]>;
export declare function readTextFile(path: string): Promise<string>;
export declare function exists2(path: fs.PathLike): Promise<boolean>;
export declare function getFileContent(filePath: string): Promise<string | null>;
