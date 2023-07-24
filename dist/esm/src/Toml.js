//@ts-nocheck
import { readFileSync } from "fs";
export class Toml {
}
Toml.parse = parse;
Toml.read = read;
const indexOf = [].indexOf ||
    function (item) {
        for (var i = 0, l = this.length; i < l; i++) {
            if (i in this && this[i] === item)
                return i;
        }
        return -1;
    };
const isNumeric = function (n) {
    return !isNaN(parseInt(n, 10));
};
const uescape = function (str) {
    return str
        .replace("\\n", "\n")
        .replace("\\t", "\t")
        .replace(/\\(["'])/, "$1");
};
const newlines = "\n\r";
const whitespace = "\t ";
const quotes = "\"'";
const ignore = [null, "newline", "whitespace"];
const values = ["number", "string", "date"];
function read(input) {
    let content = readFileSync(input, "utf8");
    return parse(content);
}
function parse(input) {
    let char, group, i, j, k, len, len1, part, ref, ref1;
    let root = {};
    let context = root;
    let state = null;
    let skip = 0;
    let accum = "";
    let token = null;
    let key = null;
    let value = null;
    let list = null;
    let lists = {};
    let nesting = -1;
    let quote = null;
    let prev = null;
    const eat = function (char, reg, st) {
        if (!reg.test(char)) {
            state = st;
            token = accum;
            accum = "";
            return true;
        }
        else {
            accum += char;
            return false;
        }
    };
    ref = input.toString() + "\n";
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
        char = ref[i];
        if (--skip > 0) {
            continue;
        }
        if (parse.debug) {
            console.log(char, state);
        }
        if ((state != null ? state.slice(-4) : void 0) === "_end") {
            state = null;
        }
        if (!state && indexOf.call(newlines, char) >= 0) {
            state = "newline";
        }
        if (indexOf.call(ignore, state) >= 0 && char === "#") {
            state = "comment";
        }
        if (state === "comment") {
            if (indexOf.call(newlines, char) < 0) {
                continue;
            }
            else {
                state = "newline";
            }
        }
        if ((state === "whitespace" || state === "expect_value") &&
            indexOf.call(whitespace, char) >= 0) {
            continue;
        }
        if (indexOf.call(newlines, prev) >= 0 &&
            indexOf.call(whitespace, char) >= 0) {
            state = "whitespace";
            continue;
        }
        if (indexOf.call(ignore, state) >= 0 && char === "[") {
            state = "group";
            continue;
        }
        if (state === "group" && eat(char, /[^\]]/)) {
            group = token;
        }
        if (group) {
            context = root;
            ref1 = group.split(".");
            for (k = 0, len1 = ref1.length; k < len1; k++) {
                part = ref1[k];
                context = context[part] != null ? context[part] : (context[part] = {});
            }
            group = null;
        }
        if (indexOf.call(ignore, state) >= 0 && /\w/.test(char)) {
            state = "key";
        }
        if (state === "key" && eat(char, /[^=]/)) {
            key = token.trim();
        }
        if (key && char === "=") {
            state = "expect_value";
            continue;
        }
        if (state === "expect_value") {
            if (indexOf.call(quotes, char) >= 0) {
                state = "string";
                quote = char;
                continue;
            }
            if (char === "t" && input.slice(i, +(i + 3) + 1 || 9e9) === "true") {
                value = true;
                skip = 4;
                state = null;
            }
            if (char === "f" && input.slice(i, +(i + 4) + 1 || 9e9) === "false") {
                value = false;
                skip = 5;
                state = null;
            }
            if (char === "-") {
                state = "number";
                accum = "-";
                continue;
            }
            if (isNumeric(char)) {
                state = "number";
            }
            if (char === "[") {
                list = lists[++nesting] = [];
                continue;
            }
        }
        if (state === "string" && eat(char, /[^"']/, "string_end")) {
            value = uescape(token);
        }
        if (state === "number" && eat(char, /[\d.]/, "number_end")) {
            value = +token;
        }
        if (state === "date" && eat(char, /[\d-:TZ]/)) {
            value = new Date(token);
        }
        if (state === "string_end") {
            if (char !== quote || (char === quote && prev === "\\")) {
                state = "string";
                accum = value + char;
                value = null;
            }
            else {
                state = null;
                quote = null;
            }
        }
        if (state === "number_end") {
            if (char === "-") {
                state = "date";
                accum = token + char;
                value = null;
            }
            else {
                state = null;
            }
        }
        if (list != null) {
            if (value != null) {
                list.push(value);
                value = null;
                state = "expect_value";
            }
            if (char === ",") {
                continue;
            }
            if (char === "]" && indexOf.call(values, state) < 0) {
                if (nesting === 0) {
                    value = list;
                    list = null;
                    nesting = -1;
                    state = null;
                }
                if (nesting > 0) {
                    lists[--nesting].push(list);
                    list = lists[nesting];
                }
            }
        }
        if (key && value != null) {
            context[key] = value;
            key = value = null;
        }
        prev = char;
    }
    return root;
}
