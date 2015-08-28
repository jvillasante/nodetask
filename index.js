/**
 * nodetask
 * https://github.com/jvillasante/nodetask
 *
 * Copyright (c) 2015 Julio C. Villasante
 * Licensed under the MIT license.
 */
var debug = require('debug')('worker');
var request = require('request');
var validUrl = require('valid-url');

// Validation stuff, better on their own module
// but this is quick and easy for now!
// I just pulled up valid-url, but it must be checked
// open-source can bite you!
// TODO: In production code this can be made async.
var isEmptyString = function(str) {
  return (!str || 0 === str.length);
};

var isUrl = function(suspect) {
  return validUrl.isUri(suspect);
};

var isValidUrl = function(value) {
  return !isEmptyString(value) && isUrl(value);
};

// Ok, just checking for null and undefined
// We can do better JSON validation here!!!
var isValidJson = function(suspect) {
  return (null !== suspect) && (undefined !== suspect);
};

module.exports = {
  /**
   * get request
   * TODO: How to clean debug? Hmmmmmm, nice question!
   *
   * @param {String} url
   * @param {function} callback(err, statusCode, body)
   */
  getUrl: function(url, callback) {
    debug('Entering getURL. url=' + url);
    if (!isValidUrl(url)) {
      debug('url: ' + url + " is NOT valid. Ohhhhhh!!!");
      return callback(new Error('empty string or not a valid url according to valid-url module'));
    }
    debug('url: ' + url + " is valid. Yuppy!!!");

    return request.get(url, function(err, res, body) {
      if (err) {
        debug('There is an error: ' + err);
        return callback(err);
      }

      if (res.statusCode !== 200) {
        debug('That\'s not a "200 OK" status code, you got: ' + res.statusCode);
        return callback(new Error('Can\'t follow url, statusCode=' + res.statusCode));
      }

      debug('All is good, calling the caller back. :)');
      return callback(null, res.statusCode, body);
    });
  },

  /**
   * post request
   * TODO: How to clean debug? Hmmmmmm, nice question!
   *
   * @param {String} url
   * @param {Object} post data as a json object
   * @param {function} callback(err, statusCode, body)
   */
  postUrl: function(url, jsonData, callback) {
    debug('Entering postURL. url=' + url + ' jsonData=' + jsonData);
    if (!isValidUrl(url)) {
      debug('url: ' + url + " is NOT valid. Ohhhhhh!!!");
      return callback(new Error('empty string or not a valid url according to valid-url module'));
    }
    debug('url: ' + url + " is valid. Yuppy!!!");

    if (!isValidJson(jsonData)) {
      debug('Invalid post data, got null or undefined... But this is an implementation detail ;(');
      return callback(new Error('post data doesn\'t seem to be a json object'));
    }

    return request.post({url: url, form: jsonData}, function(err, res, body) {
      if (err) {
        debug('There is an error: ' + err);
        return callback(err);
      }

      if (res.statusCode !== 200) {
        debug('That\'s not a "200 OK" status code, you got: ' + res.statusCode);
        return callback(new Error('Can\'t follow url, statusCode=' + res.statusCode));
      }

      debug('All is good, calling the caller back. :)');
      return callback(null, res.statusCode, body);
    });
  }
};
