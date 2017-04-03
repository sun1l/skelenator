'use strict';

import path from 'path';
import fs from 'fs-extra';
import chalk from 'chalk';

export function isValidFileType(filename, filetypes) {
  return filetypes.includes(filename.split('.').pop());
}

export function getFileType(filename) {
  return filename.split('.').pop();
}

export function isFileExist(filename) {
  return fs.existsSync(getFilePath(filename));
}

export function getFilePath(filename) {
  return path.resolve(filename);
}

export function readFile(filepath) {
  return fs.readFileSync(filepath, 'utf8');
}

export function parseJson(content) {
  let parsedContent;

  try {
    parsedContent = JSON.parse(content);
  } catch (e) {
    parsedContent = false;
  }

  return parsedContent;
}

export function parseYaml(content) {
  const yaml = require('js-yaml');
  let parsedContent;

  try {
    parsedContent = yaml.safeLoad(content);
  } catch (e) {
    parsedContent = false;
  }

  return parsedContent;
}

export function isValidSchema() {
  return true;
}

export function isValidFolderName(name) {
  return (typeof name === 'string' && name.indexOf('/') >= 0)? true : false;
}

export function isValidFileName() {
  return true;
}

export function log(msg, t) {

  switch (t) {
    case 'ERROR':
      console.error(chalk.red(msg));
      return false;

    case 'INFO':
      console.error(chalk.gray(msg));
      break;

    default:
      console.log(msg)
      break;
  }
}
