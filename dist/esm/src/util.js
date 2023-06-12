import { writeFileSync, statSync } from "fs";
import * as path from "path";
import * as YAML from "yaml";
const formatErrorMessage = (reason, class_name, var1, var2) => {
    console.log(`\x1b[36m`);
    return `\u001b[38;5;251m> \u001b[38;5;2mydb\n    \u001b[38;5;160m${reason}\n\n    \u001b[38;5;160mClass:\n    \u001b[38;5;243m|  \u001b[38;5;34m'${class_name}' \x1b[4m\u001b[38;5;243m->\x1b[0m \u001b[38;5;243m\u001b[38;5;34m'${var1}'\u001b[38;5;243m\u001b[38;5;243m\x1b[4m->\x1b[0m \u001b[38;5;34m'${var2}'\x1b[0m`;
};
const YAML_parse = (data) => {
    return YAML.parse(`${data}`);
};
const JSON_stringify = (data) => {
    return JSON.stringify(data, null, 4);
};
const file_exists = (path) => {
    try {
        statSync(`${path}`);
        return true;
    }
    catch (e) {
        return false;
    }
};
const createFile = (path, stringify, style) => {
    writeFileSync(path, stringify(style.writing_format(new Map())));
};
const pathResolve = (filePath, fileExtension, pathOutsideTheProject) => {
    if (filePath.startsWith("./"))
        filePath = filePath.slice(2);
    if (filePath.startsWith("." + path.sep))
        filePath = filePath.slice(1);
    if (!filePath.endsWith("." + fileExtension))
        filePath += `.${fileExtension}`;
    return pathOutsideTheProject != true
        ? path.resolve(`./${filePath}`)
        : filePath;
};
export { createFile, pathResolve, file_exists, YAML_parse, JSON_stringify, YAML, formatErrorMessage, };
