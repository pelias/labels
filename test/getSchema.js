const getSchema = require('../getSchema');
const schemas = require('../labelSchema');

module.exports.tests = {};

module.exports.tests.schema_and_language_selection = function(test, common) {
  test('no language and undefined record selects default schema', function(t) {
    const actual = getSchema(undefined, undefined);
    const expected = schemas['default'];

    t.equals(actual, expected, 'default schema selected');
    t.end();
  });

  test('no language and record with no country_a selects default schema', function(t) {
    const actual = getSchema({}, undefined);
    const expected = schemas['default'];

    t.equals(actual, expected, 'default schema selected');
    t.end();
  });


  test('no language and record with null country_a selects default schema', function(t) {
    const actual = getSchema({ country_a: [ null ] }, undefined);
    const expected = schemas['default'];

    t.equals(actual, expected, 'default schema selected');
    t.end();
  });

  test('no language and record with scalar country_a selects correct schema', function(t) {
    const actual = getSchema({ country_a: 'usa' }, undefined);
    const expected = schemas.USA;

    t.equals(actual, expected, 'USA schema selected');
    t.end();
  });

  test('invalid country_a selects default schema', function(t) {
    const actual = getSchema({ country_a: ['XYZ']}, undefined);
    const expected = schemas['default'];

    t.equals(actual, expected, 'default schema selected');
    t.end();
  });

  test('no language and record with array country_a selects correct schema', function(t) {
    const actual = getSchema({ country_a: ['USA']}, undefined);
    const expected = schemas.USA;

    t.equals(actual, expected, 'USA schema selected');
    t.end();
  });

  test('no language and record with lowercase country_a selects correct schema', function(t) {
    const actual = getSchema({ country_a: ['usa']}, undefined);
    const expected = schemas.USA;

    t.equals(actual, expected, 'USA schema selected');
    t.end();
  });

  test('valid but unspecified language and valid country_a selects correct schema', function(t) {
    const actual = getSchema({ country_a: ['USA']}, 'ARA'); // no arabic custom format in USA
    const expected = schemas.USA;

    t.equals(actual, expected, 'USA schema selected');
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
