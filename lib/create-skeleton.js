'use strict';

import path from 'path';
import fs from 'fs-extra';
import {
  isValidFolderName,
  isValidFileName,
  isFileExist,
  log
} from './utils';
import chalk from 'chalk';


module.exports = function createSkeleton(root, node) {
  let base,
    name;
  const INFO = 'INFO',
    ERROR = 'ERROR';

  if (typeof node === 'object') {
    name = Object.keys(node)[0];
    base = path.join(root, name);

    if (!isValidFolderName(name))
      return log(`${name} is not a valid folder name.`, ERROR);

    if (create(base, this))
      fs.ensureDirSync(base);
  }

  if (typeof node === 'string' && isValidFolderName(node)) {
    base = path.join(root, node);

    if (create(base, this))
      fs.ensureDirSync(base);

    return true;
  }

  if (typeof node === 'string') {
    base = path.join(root, node);

    if (!isValidFileName(name))
      return log(`${name} is not a valid file name.`, ERROR);

    if (create(base, this))
      fs.outputFileSync(base, '');
  }

  if (typeof node === 'object' && Array.isArray(node[Object.keys(node)[0]])) {
    node[Object.keys(node)[0]].map(
      createSkeleton.bind(
        this,
        base
      )
    );
  }

  function create(base, options) {

    let { overwrite, dryrun } = options;

    // If --overwrite is false but the folder/file already exist
    if (!overwrite && isFileExist(base)) {
      log(
        `${base} ` +
        chalk.yellow(`[Skipped]`),
        INFO);
      return false;

      // If --overwrite is true and the folder/file already exist
    } else if (overwrite && isFileExist(base)) {
      log(
        `${base} `+
        chalk.red(`[Overwritten]`), INFO);
      return true

      // If --dryrun is true, just log
    } else if (dryrun) {
      log(`${base}`, INFO);
      return false;

      // Otheriwse create the new folder/file
    } else {
      log(
        `${base} `+
        chalk.green(`[Created]`),
        INFO);
      return true;
    }
  }
}
