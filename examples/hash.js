var sc = require('./simple-crypto');


// defaults: sha1 algorithm on base64 encoding
console.log(sc.hash('my text'));


// the same, but with a secret key
console.log(sc.hash('my text', 'my secret key'));


// custom params
console.log(sc.hash('my text', {
  key: 'my secret key',
  algorithm: 'md5',
  input_encoding: 'utf8',
  output_encoding: 'hex'
}));


// changing a default param
sc.defaults.hash.algorithm = 'sha512';
console.log(sc.hash('my text'));
