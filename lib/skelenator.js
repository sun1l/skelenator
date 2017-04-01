'use strict';

import path from 'path';
import createSkeleton from './create-skeleton';
import {
    isValidExtension,
    isFileExist,
    getFilePath,
    isValidSchema,
    readFile,
    log
} from './utils'

module.exports = function Skelenator (source, options) {
    const ERROR = 'ERROR';

    log('Starting Skelenator');

    /**
     * Config object
     */
    const config = {
        options
    }

    /**
     * Loop through the source (filename), to validate
     */
    source.forEach( function(filename) {

        // Check if the filename has .json extension
        if( isValidExtension(filename) )
            return log(`Error: ${filename} is not a valid JSON file`, ERROR);

        // Check if the file physically present
        const filepath = getFilePath(filename);
        if( !isFileExist(filename) )
            return log(`Error: ${ filepath } does not exist`, ERROR);

        // Read the file content and parse the content as JSON
        let content = readFile(filepath);

        if( !content )
            return log(`Error: ${ filepath } does not conform to JSON Schema!`, ERROR);

        // Check the JSON for valid Schema
        if( !isValidSchema(content) ){
            log(`Error: ${ filepath } does not conform to Skelenator JSON Schema!`, ERROR)
            log(`Please visit https://github.com/sun1l/skelenator for more information`)
            return false;
        }

        log(`Creating skeleton from ${filename}...`)

        // Generate the skeleton
        content.map(
            createSkeleton.bind(
                this,
                path.join( process.cwd() )
            )
        );

    }, config);
    
}