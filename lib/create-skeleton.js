'use strict';

import path from 'path';
import fs from 'fs-extra';
import {
    isValidFolderName,
    isValidFileName,
    isFileExist,
    log
} from './utils'


module.exports = function createSkeleton(root, node) {
    let base;
    const INFO = 'INFO';

    if( node.folder && isValidFolderName() ){
        base = path.join(root, node.folder);

        if( create(base, this.options) )
            fs.ensureDirSync(base);
    }

    if( node.file && isValidFileName() ){
        base = path.join(root, node.file);

        if( create(base, this.options) )
            fs.outputFileSync(base, '');
    }

    if( node.folder && node.children ){
        node.children.map(
            createSkeleton.bind(this, base)
        );
    }

    function create(base, options) {

        let {overwrite, dryrun} = options;

        // If --overwrite is false but the folder/file already exist
        if( !overwrite && isFileExist(base) ) {
            log(`${base} already exist [Skipped]`, INFO);
            return false;

        // If --overwrite is true and the folder/file already exist
        } else if( overwrite && isFileExist(base) ) {
            log(`${base} already exist [Overwritten]`);
            return true

        // If --dryrun is true, just log
        } else if (dryrun) {
            log(`${base}`, INFO);
            return false;

        // Otheriwse create the new folder/file
        } else {
            log(`${base} [Created]`, INFO);
            return true;
        }
    }
}
