"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatErrorMessage = exports.YAML = exports.JSON_stringify = exports.YAML_parse = exports.file_exists = exports.pathResolve = exports.createFile = void 0;
const fs_1 = require("fs");
const path = __importStar(require("path"));
const YAML = __importStar(require("yaml"));
exports.YAML = YAML;
const formatErrorMessage = (reason, class_name, var1, var2) => {
    console.log(`\x1b[36m`);
    return `\u001b[38;5;251m> \u001b[38;5;2mydb\n    \u001b[38;5;160m${reason}\n\n    \u001b[38;5;160mClass:\n    \u001b[38;5;243m|  \u001b[38;5;34m'${class_name}' \x1b[4m\u001b[38;5;243m->\x1b[0m \u001b[38;5;243m\u001b[38;5;34m'${var1}'\u001b[38;5;243m\u001b[38;5;243m\x1b[4m->\x1b[0m \u001b[38;5;34m'${var2}'\x1b[0m`;
};
exports.formatErrorMessage = formatErrorMessage;
const YAML_parse = (data) => {
    return YAML.parse(`${data}`);
};
exports.YAML_parse = YAML_parse;
const JSON_stringify = (data) => {
    return JSON.stringify(data, null, 4);
};
exports.JSON_stringify = JSON_stringify;
const file_exists = (path) => {
    try {
        (0, fs_1.statSync)(`${path}`);
        return true;
    }
    catch (e) {
        return false;
    }
};
exports.file_exists = file_exists;
const createFile = (path, stringify, style) => {
    (0, fs_1.writeFileSync)(path, stringify(style.writing_format(new Map())));
};
exports.createFile = createFile;
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
exports.pathResolve = pathResolve;
