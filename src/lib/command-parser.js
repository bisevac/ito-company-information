
/**
 * @function
 * @returns {{
 *    file:String,
 *    out:String|null,
 *    proxy:String|null,
 * }}
 */
const commandParser = () => {
  const commands = process.argv.slice( 2, process.argv.length );
  const commandMap = new Map();
  let lastParam = '';

  for ( let i = 1; i < commands.length + 1; i += 1 ) {
    if ( i % 2 === 1 ) {
      lastParam = commands[ i - 1 ];
      commandMap.set( commands[ i - 1 ].replace( '-', '' ), '' );
    }

    if ( i % 2 === 0 ) {
      commandMap.set( lastParam.replace( '-', '' ), commands[ i - 1 ] );
    }
  }

  if ( commandMap.has( 'h' ) || commandMap.has( 'help' ) ) {
    console.log( 'Usage' );
    console.log(
      '   -file   \t"json input file path"\n'
      + '   -out     \t"output file path"\n'
      + '   -proxy     \t"proxy list file path"\n',
    );

    process.exit( 0 );
  }

  if ( !commandMap.has( 'file' ) ) {
    throw new Error( 'File is required' );
  }

  return Object.fromEntries( commandMap );
};

export default commandParser;
