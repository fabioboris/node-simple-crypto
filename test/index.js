/*jshint expr:true*/
/*globals describe, it*/

(function () {
  'use strict';

  var sc = require('../simple-crypto'),
    should = require('should'),
    options = {
      algorithm: 'aes256',
      password: 'icanhazsekretz'
    },
    possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  function stringOfLength(len) {
    var s = '';
    for (var i = 0; i < len; i++) {
      s += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return s
  }

  function verifyCipherDecipher(subject, options) {
    var encrypted, decrypted;

    encrypted = sc.cipher(subject, options);
    encrypted.should.be.ok;

    decrypted = sc.decipher(encrypted, options);
    decrypted.should.be.ok;
    decrypted.should.equal(subject);
  }

  describe('simple-crypto', function () {
    it('should encrypt string AES256 UTF8 to HEX', function () {
      var encrypted = sc.cipher('sekret', {
        password: options.password,
        algorithm: 'aes256',
        input_encoding: 'utf8',
        output_encoding: 'hex'
      });

      encrypted.should.be.ok;
      encrypted.should.equal('ca081a92dc785f2e6b946ca9679c3cb4');
    });

    it('should decrypt string AES256 UTF8 to HEX', function () {
      var decrypted = sc.decipher('ca081a92dc785f2e6b946ca9679c3cb4', {
        password: options.password,
        algorithm: 'aes256',
        input_encoding: 'utf8',
        output_encoding: 'hex'
      });

      decrypted.should.be.ok;
      decrypted.should.equal('sekret');
    });


    it('should encrypt & decrypt string (LEN=15) AES256 UTF8 to HEX', function () {
      verifyCipherDecipher(stringOfLength(15), {
        password: options.password,
        algorithm: 'aes256',
        input_encoding: 'utf8',
        output_encoding: 'hex'
      });
    });

    it('should encrypt & decrypt string (LEN=16) AES256 UTF8 to HEX', function () {
      verifyCipherDecipher(stringOfLength(16), {
        password: options.password,
        algorithm: 'aes256',
        input_encoding: 'utf8',
        output_encoding: 'hex'
      });
    });

    var str = stringOfLength(Math.floor(100 + Math.random() * 1000000));

    it('should encrypt & decrypt string (LEN=' + str.length + ') AES256 UTF8 to HEX', function () {
      verifyCipherDecipher(str, {
        password: options.password,
        algorithm: 'aes256',
        input_encoding: 'utf8',
        output_encoding: 'hex'
      });
    });
  });

}());

