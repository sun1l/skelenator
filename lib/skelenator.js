'use strict';

import path from 'path';
import createSkeleton from './create-skeleton';
import {
  getFileType,
  isValidFileType,
  isFileExist,
  getFilePath,
  isValidSchema,
  readFile,
  parseJson,
  parseYaml,
  log
} from './utils';
import appConfig from '../lib/config';
import chalk from 'chalk';

module.exports = function Skelenator(source, options) {
  const ERROR = 'ERROR';

  log(
    chalk.blue('\nStarting Skelenator')
  );

  /**
   * Config object
   */
  const CONFIG = {
    ...appConfig,
    ...options
  }

  /**
   * Loop through the source (filename), to validate
   */
  source.forEach(function (filename) {

    let fileType = getFileType(filename);

    // Check if the filename is valid
    if (!isValidFileType(filename, this.validFileTypes))
      return log(`${filename} is not a valid JSON or YAML file.`, ERROR);

    // Check if the file physically present
    const filepath = getFilePath(filename);
    if (!isFileExist(filename))
      return log(`${filepath} does not exist.`, ERROR);

    // Read the file content and parse the content as JSON
    let content = readFile(filepath);

    switch (fileType) {
      case 'json':
        content = parseJson(content);
        break;

      case 'yml':
      case 'yaml':
        content = parseYaml(content);
        break;
    }

    if (!content)
      return log(`${filepath} does not conform to ${fileType.toUpperCase()} Schema.`, ERROR);

    // Check the JSON for valid Schema
    if (!isValidSchema(content, fileType)) {
      log(`Error: ${filepath} does not conform to Skelenator ${fileType.toUpperCase()} Schema.`, ERROR)
      log(`Please visit https://github.com/sun1l/skelenator for more information.`)
      return false;
    }

    log(`\nCreating skeleton from ${filename}:`)

    // Generate the skeleton
    content.map(
      createSkeleton.bind(
        this,
        path.join(this.path)
      )
    );

  }, CONFIG);

}
