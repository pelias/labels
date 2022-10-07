var generator = require('../labelGenerator');

module.exports.tests = {};

module.exports.tests.interface = function(test, common) {
  test('interface', function(t) {
    t.equal(typeof generator, 'function', 'valid function');
    t.end();
  });
};

module.exports.tests.monaco = function(test, common) {
  test('venue', function(t) {
    var doc = {
      'name': { 'default': 'venue name' },
      'layer': 'venue',
      'housenumber': 'house number',
      'street': 'street name',
      'neighbourhood': ['neighbourhood name'],
      'locality': ['locality name'],
      'localadmin': ['localadmin name'],
      'county': ['county name'],
      'macrocounty': ['macrocounty name'],
      'region': ['region name'],
      'macroregion': ['macroregion name'],
      'country_a': ['MCO'],
      'country': ['Monaco']
    };
    t.equal(generator(doc),'venue name, neighbourhood name, Monaco');
    t.end();
  });

  test('street', function(t) {
    var doc = {
      'name': { 'default': 'house number street name' },
      'layer': 'address',
      'housenumber': 'house number',
      'street': 'street name',
      'neighbourhood': ['neighbourhood name'],
      'locality': ['locality name'],
      'localadmin': ['localadmin name'],
      'county': ['county name'],
      'macrocounty': ['macrocounty name'],
      'region': ['region name'],
      'macroregion': ['macroregion name'],
      'country_a': ['MCO'],
      'country': ['Monaco']
    };
    t.equal(generator(doc),'house number street name, neighbourhood name, Monaco');
    t.end();
  });

  test('neighbourhood', function(t) {
    var doc = {
      'name': { 'default': 'neighbourhood name' },
      'layer': 'neighbourhood',
      'neighbourhood': ['neighbourhood name'],
      'locality': ['locality name'],
      'localadmin': ['localadmin name'],
      'county': ['county name'],
      'macrocounty': ['macrocounty name'],
      'region': ['region name'],
      'macroregion': ['macroregion name'],
      'country_a': ['MCO'],
      'country': ['Monaco']
    };
    t.equal(generator(doc),'neighbourhood name, Monaco');
    t.end();
  });

  test('region', function(t) {
    var doc = {
      'name': { 'default': 'Monaco' },
      'layer': 'region',
      'region': ['Monaco'],
      'macroregion': ['macroregion name'],
      'country_a': ['MCO'],
      'country': ['Monaco']
    };
    t.equal(generator(doc),'Monaco');
    t.end();
  });

  test('country', function(t) {
    var doc = {
      'name': { 'default': 'Monaco' },
      'layer': 'country',
      'postalcode': 'postalcode',
      'country_a': ['MCO'],
      'country': ['Monaco']
    };
    t.equal(generator(doc),'Monaco');
    t.end();
  });

};

module.exports.all = function (tape, common) {

  function test(name, testFunction) {
    return tape('label generator (FRA): ' + name, testFunction);
  }

  for( var testCase in module.exports.tests ){
    module.exports.tests[testCase](test, common);
  }
};
