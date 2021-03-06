// dependencies
var crypto = require('crypto');
var fs = require('fs');


// default params
var defaults = {
  input_encoding: 'utf8',
  output_encoding: 'base64',
  hash: {
    key: null,
    algorithm: 'sha1'
  },
  cipher: {
    password: '',
    algorithm: 'aes256'
  }
};


// fills the missing params with default values
function missingParams(params, defaults) {
  for (var k in defaults) {
    switch (typeof params[k]) {
      case 'object':
        break;
      default:
        switch (params[k]) {
          case undefined:
          case null:
            params[k] = defaults[k];
        }
    }
  }
}


// hash implementation
var hash = function(data, params) {
  switch (typeof params) {
    // allow key param as string
    case 'string':
      params = { key: params };
      break;
    case 'object':
      break;
    default:
      params = {};
  }

  // params properties
  missingParams(params, defaults);
  missingParams(params, defaults.hash);

  // hash or hmac object
  var h = (
    (params.key === null) ?
    crypto.createHash(params.algorithm) :
    crypto.createHmac(params.algorithm, params.key)
  );

  // updated digest
  return h.update(data, params.input_encoding).digest(params.output_encoding);
};


// cipher implementation
var cipher = function(data, params) {
  switch (typeof params) {
    // allow password param as string
    case 'string':
      params = { password: params };
      break;
    case 'object':
      break;
    default:
      params = {};
  }

  // params properties
  missingParams(params, defaults);
  missingParams(params, defaults.cipher);

  // cipher object
  var obj = crypto.createCipher(params.algorithm, params.password);
  var update = obj.update(new Buffer(data, params.input_encoding), params.input_encoding, params.output_encoding);
  var final = obj.final(params.output_encoding);
  return update + final;
};


// decipher implementation
var decipher = function(data, params) {
  switch (typeof params) {
    // allow password param as string
    case 'string':
      params = { password: params };
      break;
    case 'object':
      break;
    default:
      params = {};
  }

  // params properties
  missingParams(params, defaults);
  missingParams(params, defaults.cipher);

  // decipher object
  var obj = crypto.createDecipher(params.algorithm, params.password);

  // updated digest

  // Note: There is an inconsistency between different versions of nodeJS and Decipher object.  When specifying
  // output_encoding, it may return empty string.  Without output_encoding it will return buffer and we will do
  // the decoding.
  var update = obj.update(new Buffer(data, params.output_encoding)); // swapped input and output encoding
  var final = obj.final();
  return update.toString(params.input_encoding) + final.toString(params.input_encoding);
};


// info on package.json
var info = function() {
  var content = fs.readFileSync('./package.json');
  return JSON.parse(content);
};


// exports
module.exports.hash = hash;
module.exports.cipher = cipher;
module.exports.decipher = decipher;
module.exports.defaults = defaults;
module.exports.crypto = crypto;
module.exports.info = info;
