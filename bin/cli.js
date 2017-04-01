#!/usr/bin/env node
'use strict';

import chalk from 'chalk';
import packageJson from '../../package.json';

/**
 * Fetch the arguments passed
 */
let argv = require('minimist')(process.argv.slice(2), {
    boolean: ['overwrite', 'dryrun', 'help', 'version'],
    alias: {
        o: 'overwrite',
        d: 'dryrun',
        h: 'help',
        v: 'version'
    },
    default: {
        dryrun: false,
        overwrite: false,
        help: false,
        version: false
    },
    unknown: () => {
    }
});


let { overwrite, dryrun, help, version } = argv;

if (version) {
    console.log(packageJson.version);
    process.exit();
}

if (help || argv._.length < 1) {
    console.log(
        chalk.blue(`Usage: ${packageJson.name} <JSON file> [options]`)
    );
    process.exit();
}

// Set 'overwrite' to false if dryrun is true
overwrite = dryrun? false : overwrite;

require('../lib/skelenator')(argv._, {
    overwrite,
    dryrun,
    help,
    version
});