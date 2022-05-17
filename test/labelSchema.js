'use strict';

const schemas = require('../labelSchema');

module.exports.tests = {};

module.exports.tests.interface = function(test, common) {
  test('interface', function(t) {
    t.equal(typeof schemas, 'object', 'valid object');
    t.equal(schemas.hasOwnProperty('default'), true, 'has default defined');
    t.end();
  });
};

module.exports.tests.supported_countries = function(test, common) {
  test('supported countries', function(t) {
    const supported_countries = Object.keys(schemas);

    t.notEquals(supported_countries.indexOf('USA'), -1);
    t.notEquals(supported_countries.indexOf('CAN'), -1);
    t.notEquals(supported_countries.indexOf('GBR'), -1);
    t.notEquals(supported_countries.indexOf('AUS'), -1);
    t.notEquals(supported_countries.indexOf('KOR'), -1);
    t.notEquals(supported_countries.indexOf('FRA'), -1);
    t.notEquals(supported_countries.indexOf('ITA'), -1);
    t.notEquals(supported_countries.indexOf('default'), -1);

    t.equals(Object.keys(schemas.USA.valueFunctions).length, 4);
    t.equals(Object.keys(schemas.CAN.valueFunctions).length, 3);
    t.equals(Object.keys(schemas.GBR.valueFunctions).length, 3);
    t.equals(Object.keys(schemas.AUS.valueFunctions).length, 3);
    t.equals(Object.keys(schemas.KOR.valueFunctions).length, 3);
    t.equals(Object.keys(schemas.FRA.valueFunctions).length, 4);
    t.equals(Object.keys(schemas.ITA.valueFunctions).length, 3);

    t.equals(schemas.KOR.meta.separator, ' ');

    t.end();

  });
};

module.exports.all = function (tape, common) {

  function test(name, testFunction) {
    return tape('schemas: ' + name, testFunction);
  }

  for( const testCase in module.exports.tests ){
    module.exports.tests[testCase](test, common);
  }
};
