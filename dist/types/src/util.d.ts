import * as YAML from "yaml";
declare const formatErrorMessage: (reason: string, class_name: string, var1?: string, var2?: string) => string;
declare const YAML_parse: (data: string) => string;
declare const JSON_stringify: (data: string) => string;
declare const file_exists: (path: string) => boolean;
type style = {
    writing_format: (input: Map<any, any>) => string;
    reading_format: (input: Map<any, any>) => string;
};
declare const createFile: (path: string, stringify: (x: any) => any, style: style) => void;
declare const pathResolve: (filePath: string, fileExtension: string, pathOutsideTheProject?: boolean) => string;
export { createFile, pathResolve, file_exists, YAML_parse, JSON_stringify, YAML, formatErrorMessage, };
