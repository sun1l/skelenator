#!/usr/bin/env node
'use strict';

import chalk from 'chalk';
import packageJson from '../../package.json';

/**
 * Fetch the arguments passed
 */
let argv = require('minimist')(process.argv.slice(2), {
  boolean: ['dryrun', 'safemode', 'overwrite', 'help', 'version'],
  string: ['path'],
  alias: {
    d: 'dryrun',
    s: 'safemode',
    o: 'overwrite',
    p: 'path',
    h: 'help',
    v: 'version'
  },
  default: {
    dryrun: false,
    safemode: true,
    overwrite: false,
    path: process.cwd()
  }
});

let { dryrun, safemode, overwrite, path, help, version } = argv;

if (version) {
  console.log(packageJson.version);
  process.exit();
}

if (help || argv._.length < 1) {
  console.log(
    chalk.green(
      `\n` +
      `Usage: ${packageJson.name} <JSON/YAML file> [options]\n`) +
      `\n` +
      `Options:\n` +
      `-d, --dryrun       only disply the skeleton, don't create any folder/file\n` +
      `-s, --safemode     create skeleton but don't overwrite existing files (default)\n` +
      `-o, --overwrite    overwrite any existing file, if already exist\n` +
      `-p, --path         root path for skeleton, default is current directory\n` +
      `-h, --help         output usage information\n` +
      `-v, --version      output the version number\n` +
      `\n` +
      `Please visit https://github.com/sun1l/skelenator for examples.\n`
  );
  process.exit();
}

// Set 'overwrite' to false if dryrun or safemode is true
overwrite = (dryrun || safemode) ? false : overwrite;

require('../lib/skelenator')(argv._, {
  dryrun,
  safemode,
  overwrite,
  path
});
