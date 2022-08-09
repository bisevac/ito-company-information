/* eslint-disable max-len */
import constant from './constant.js';

export const getRandomUserAgent = () => constant.UserAgentList[ Math.floor( Math.random() * constant.UserAgentList.length ) ];
export const getRandomProxy = () => ( global.$proxyList ? global.$proxyList[ Math.floor( Math.random() * global.$proxyList.length ) ] : null );
