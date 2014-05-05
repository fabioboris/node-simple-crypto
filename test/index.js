/*jshint expr:true*/
/*globals describe, it*/
(function () {
  'use strict';

  var sc = require('../simple-crypto'),
    options = { algorithm: 'aes256', password: 'icanhazsekretz' };

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
      var encrypted = sc.decipher('ca081a92dc785f2e6b946ca9679c3cb4', {
        password: options.password,
        algorithm: 'aes256',
        input_encoding: 'utf8',
        output_encoding: 'hex'
      });

      encrypted.should.be.ok;
      encrypted.should.equal('sekret');
    });
  });
}());
