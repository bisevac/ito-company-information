import HttpsProxyAgent from 'https-proxy-agent';
import fetch from 'node-fetch';
import { getRandomProxy, getRandomUserAgent } from './util.js';

/**
 * @param {String} url
 * @param {"GET"|"POST"|"PUT"|"DELETE"} method
 * @param {String|[key:String]} body
 * @param { [key: string]: any } formData
 * @returns {Object}
 */
export default async ( url, method, body ) => new Promise( ( resolve, reject ) => {
  const fetchOptions =  {
    method,
    headers : {
      Referer        : url,
      'User-Agent'   : getRandomUserAgent(),
      Origin         : url,
      'content-type' : 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body,
  };

  const proxy = getRandomProxy();
  if ( proxy ) fetchOptions.agent = new HttpsProxyAgent( proxy );

  fetch( url, fetchOptions )
    .then( r => r.json() )
    .then( json => resolve( json ) )
    .catch( e => reject( e ) );
} );
