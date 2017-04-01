'use strict';

import path from 'path';
import fs from 'fs';
import createSkeleton from './create-skeleton';
import {
    isValidExtension,
    isFileExist,
    getFilePath,
    parseJson,
    isValidSchema,
    logError
} from './utils'

module.exports = function Skelenator (argv, options) {
    console.log('Creating skeleton...');

    /**
     * Config object
     */
    const config = {
        options
    }

    /**
     * Loop through the filenames passed as arguments and validate
     */
    const jsonSource = argv.filter( (filename) => {

        // Check if the filename has .json extension
        if( isValidExtension(filename) )
            return logError(`Error: ${filename} is not a valid JSON file`);

        // Check if the file physically present
        if( !isFileExist(filename) )
            return logError(`Error: ${ getFilePath(filename) } does not exist`);

        return true;
    });

    /**
     * Loop through each valid file
     */
    jsonSource.forEach( function(filename) {

        const filepath = getFilePath(filename);

        // Read the file content
        let content = fs.readFileSync( filepath ).toString();

        // Parse the file content as JSON, log error if failed
        content = parseJson(content);
        if( !content ){
            console.error( filepath + 'NOT a Valid JSON' );
            return
        }

        // Check the JSON for valid Schema
        if( !isValidSchema(content) ){
            console.log(filepath + 'Schema validation failed!');
            return
        }

        // Generate the skeleton
        content.map(
            createSkeleton.bind(
                this,
                path.join( process.cwd() )
            )
        );

    }, config);
    
}