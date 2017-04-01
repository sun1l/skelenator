'use strict';

import path from 'path';
import fs from 'fs-extra';
import chalk from 'chalk';

function isValidExtension(filename) {
    return filename.split('.').pop() !== 'json';
}

function isFileExist(filename) {
    return fs.existsSync( getFilePath(filename) );
}

function getFilePath(filename) {
    return path.resolve(filename);
}

function readFile(filepath) {
    return fs.readJsonSync( filepath, { throws: false } );
}

function parseJson(content) {
    try {
        return JSON.parse(content);
    } catch (e) {
        return false;
    }
}

function isValidSchema() {
        return true;
}

function isValidFolderName() {
    return true;
}

function isValidFileName() {
    return true;
}

function log(msg, t) {

    switch (t) {
        case 'ERROR':
            console.error( chalk.red(msg) );
            return false;

        case 'INFO':
            console.error( chalk.gray(msg) );
            break;
        
        default:
            console.log(msg)
            break;
    }
}

module.exports = {
    isValidExtension,
    isFileExist,
    getFilePath,
    parseJson,
    isValidSchema,
    isValidFolderName,
    isValidFileName,
    readFile,
    log
};