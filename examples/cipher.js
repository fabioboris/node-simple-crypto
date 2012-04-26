var sc = require('./simple-crypto');


// defaults: aes256 algorithm on base64 encoding
var encrypted = sc.cipher('my text', 'my password');
var decrypted = sc.decipher(encrypted, 'my password');

console.log(encrypted);
console.log(decrypted);


// custom params
var params = {
  password: 'my custom password',
  algorithm: 'rc5',
  input_encoding: 'utf8',
  output_encoding: 'hex'
};

encrypted = sc.cipher('my text', params);
decrypted = sc.decipher(encrypted, params);

console.log(encrypted);
console.log(decrypted);


// changing a default param
sc.defaults.cipher.algorithm = 'desx';

encrypted = sc.cipher('my text', 'my password');
decrypted = sc.decipher(encrypted, 'my password');

console.log(encrypted);
console.log(decrypted);
