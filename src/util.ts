import { access, writeFileSync, constants, statSync } from "fs";
import * as path from "path";
import * as YAML from "yaml";

const formatErrorMessage = (
  reason: string,
  class_name: string,
  var1?: string,
  var2?: string
): string => {
  console.log(`\x1b[36m`);
  return `\u001b[38;5;251m> \u001b[38;5;2mydb\n    \u001b[38;5;160m${reason}\n\n    \u001b[38;5;160mClass:\n    \u001b[38;5;243m|  \u001b[38;5;34m'${class_name}' \x1b[4m\u001b[38;5;243m->\x1b[0m \u001b[38;5;243m\u001b[38;5;34m'${var1}'\u001b[38;5;243m\u001b[38;5;243m\x1b[4m->\x1b[0m \u001b[38;5;34m'${var2}'\x1b[0m`;
};

const YAML_parse = (data: string): string => {
  return YAML.parse(`${data}`);
};

const JSON_stringify = (data: string): string => {
  return JSON.stringify(data, null, 4);
};
const file_exists = (path: string): boolean => {
  try {
    statSync(`${path}`);
    return true;
  } catch (e) {
    return false;
  }
};

type style = {
  writing_format: (input: Map<any, any>) => string;
  reading_format: (input: Map<any, any>) => string;
};

const createFile = (
  path: string,
  stringify: (x: any) => any,
  style: style
): void => {
  writeFileSync(path, stringify(style.writing_format(new Map())));
};

const pathResolve = (
  filePath: string,
  fileExtension: string,
  pathOutsideTheProject?: boolean
): string => {
  if (filePath.startsWith("./")) filePath = filePath.slice(2);
  if (filePath.startsWith("." + path.sep)) filePath = filePath.slice(1);
  if (!filePath.endsWith("." + fileExtension)) filePath += `.${fileExtension}`;
  return pathOutsideTheProject != true
    ? path.resolve(`./${filePath}`)
    : filePath;
};

export {
  createFile,
  pathResolve,
  file_exists,
  YAML_parse,
  JSON_stringify,
  YAML,
  formatErrorMessage,
};
