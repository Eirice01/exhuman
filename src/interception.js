/*
 * Created on Tue Aug 20 2019
 * Authored by zonebond
 * @github - github.com/zonebond
 * @e-mail - zonebond@126.com
 */

import axios from 'axios';

const USE_MOCK_SERVICE = process.env.USE_MOCK_SERVICE;

axios.interceptors.request.use(function(config) {
  config.url = config.url.replace(/<[\w-_.\\]+>/,  process.env.API || '');

  if(USE_MOCK_SERVICE && config.headers && 'use-mock-service' in config.headers === false) {
    config.headers['use-mock-service'] = true;
  }

  return config;
}, function (error) {
  return Promise.reject(error);
});
