import { promises as fsPromises } from 'fs';
import { parallelLimit } from 'async';
import commandParser from './lib/command-parser.js';
import ITO from './lib/ito.js';

const ito = new ITO();

const init = async () => {
  try {
    const { file, out, proxy } = commandParser();

    if ( proxy ) global.$proxyList = JSON.parse( await fsPromises.readFile( proxy, 'UTF-8' ) );
    const sicNumbers = JSON.parse( await fsPromises.readFile( file, 'UTF-8' ) );

    /* Concurrency max 5 task! */
    const companyList = await parallelLimit( sicNumbers.map( n => ito.getCompanyWithSicNumber.bind( ito, n ) ), 5 );
    const filteredCompanyList = companyList.filter( c => !!c );

    const outPath = out || `./out-${Date.now()}.json`;
    await fsPromises.writeFile( outPath, JSON.stringify( filteredCompanyList, null, 2, 2 ), 'UTF-8' );

    console.info( `Script finished successfully, you can the find your out file at ${outPath}` );
  } catch ( e ) {
    console.error( e );
    process.exit( 1 );
  }
};

init();
