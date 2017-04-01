'use strict';

import path from 'path';
import fs from 'fs-extra';

module.exports = function createSkeleton(root, node) {
    let base;

    if( node.folder && isValidFolderName() ){
        base = path.join(root, node.folder);

        if( this.options.dryrun )
            console.log(base);
        //fs.ensureDirSync(currentPath);
    }

    if( node.folder && node.children ){
        node.children.map(createSkeleton.bind(this, base));
    }

    if( node.file && isValidFileName() ){
        base = path.join(root, node.file);
        console.log(base);
        //fs.ensureFileSync(currentPath);
    }

    function isValidFolderName() {
        return true;
    }

    function isValidFileName() {
        return true;
    }
}
