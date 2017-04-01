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

function logError(msg) {
    console.error(
        chalk.red(
            msg
        )
    )
    
    return false;
}

module.exports = {
    isValidExtension,
    isFileExist,
    getFilePath,
    parseJson,
    isValidSchema,
    logError
};