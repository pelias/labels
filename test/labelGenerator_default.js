'use strict';

var generator = require('../labelGenerator');

module.exports.tests = {};

module.exports.tests.interface = function(test, common) {
  test('interface', function(t) {
    t.equal(typeof generator, 'function', 'valid function');
    t.end();
  });
};

module.exports.tests.default_country = function(test, common) {
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
      'country_a': ['country code'],
      'country': ['country name']
    };
    t.equal(generator(doc),'venue name, locality name, country name');
    t.end();
  });

  test('localadmin value should be used when locality is not available', function(t) {
    var doc = {
      'name': { 'default': 'venue name' },
      'layer': 'venue',
      'housenumber': 'house number',
      'street': 'street name',
      'neighbourhood': ['neighbourhood name'],
      'localadmin': ['localadmin name'],
      'county': ['county name'],
      'macrocounty': ['macrocounty name'],
      'region': ['region name'],
      'macroregion': ['macroregion name'],
      'country_a': ['country code'],
      'country': ['country name']
    };
    t.equal(generator(doc),'venue name, localadmin name, country name');
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
      'country_a': ['country code'],
      'country': ['country name']
    };
    t.equal(generator(doc),'house number street name, locality name, country name');
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
      'country_a': ['country code'],
      'country': ['country name']
    };
    t.equal(generator(doc),'neighbourhood name, locality name, country name');
    t.end();
  });

  test('locality', function(t) {
    var doc = {
      'name': { 'default': 'locality name' },
      'layer': 'locality',
      'locality': ['locality name'],
      'localadmin': ['localadmin name'],
      'county': ['county name'],
      'macrocounty': ['macrocounty name'],
      'region': ['region name'],
      'macroregion': ['macroregion name'],
      'country_a': ['country code'],
      'country': ['country name']
    };
    t.equal(generator(doc),'locality name, country name');
    t.end();
  });

  test('localadmin', function(t) {
    var doc = {
      'name': { 'default': 'localadmin name' },
      'layer': 'localadmin',
      'localadmin': ['localadmin name'],
      'county': ['county name'],
      'macrocounty': ['macrocounty name'],
      'region': ['region name'],
      'macroregion': ['macroregion name'],
      'country_a': ['country code'],
      'country': ['country name']
    };
    t.equal(generator(doc),'localadmin name, country name');
    t.end();
  });

  test('county', function(t) {
    var doc = {
      'name': { 'default': 'county name' },
      'layer': 'county',
      'county': ['county name'],
      'macrocounty': ['macrocounty name'],
      'region': ['region name'],
      'macroregion': ['macroregion name'],
      'country_a': ['country code'],
      'country': ['country name']
    };
    t.equal(generator(doc),'county name, country name');
    t.end();
  });

  test('macrocounty', function(t) {
    var doc = {
      'name': { 'default': 'macrocounty name' },
      'layer': 'macrocounty',
      'macrocounty': ['macrocounty name'],
      'region': ['region name'],
      'macroregion': ['macroregion name'],
      'country_a': ['country code'],
      'country': ['country name']
    };
    t.equal(generator(doc),'macrocounty name, country name');
    t.end();
  });

  test('region', function(t) {
    var doc = {
      'name': { 'default': 'region name' },
      'layer': 'region',
      'region': ['region name'],
      'macroregion': ['macroregion name'],
      'country_a': ['country code'],
      'country': ['country name']
    };
    t.equal(generator(doc),'region name, country name');
    t.end();
  });

  test('macroregion', function(t) {
    var doc = {
      'name': { 'default': 'macroregion name' },
      'layer': 'macroregion',
      'macroregion': ['macroregion name'],
      'country_a': ['country code'],
      'country': ['country name']
    };
    t.equal(generator(doc),'macroregion name, country name');
    t.end();
  });

  test('dependency', function(t) {
    var doc = {
      'name': { 'default': 'dependency name' },
      'layer': 'dependency',
      'dependency': ['dependency name'],
      'country_a': ['country code'],
      'country': ['hierarchy country name']
    };
    t.equal(generator(doc),'dependency name');
    t.end();
  });

  test('country layer labels should only use the `country` field and not the `name`', function(t) {
    var doc = {
      'name': { 'default': 'source country name' },
      'layer': 'country',
      'country_a': ['country code'],
      'country': ['hierarchy country name']
    };
    t.equal(generator(doc),'hierarchy country name');
    t.end();
  });

  test('locality with dependency should ignore country', function(t) {
    var doc = {
      'name': { 'default': 'locality name' },
      'layer': 'locality',
      'locality': ['locality name'],
      'localadmin': ['localadmin name'],
      'county': ['county name'],
      'macrocounty': ['macrocounty name'],
      'region': ['region name'],
      'macroregion': ['macroregion name'],
      'dependency': ['dependency name'],
      'country_a': ['country code'],
      'country': ['country name']
    };
    t.equal(generator(doc),'locality name, dependency name');
    t.end();
  });

  test('region with no country_a handled gracefully', function(t) {
    const doc = {
      name: { default: 'region name' },
      layer: 'region',
      source: 'whosonfirst',
      region: ['region name']
      //note no country_a
    };
    t.equal(generator(doc),'region name');
    t.end();
  });

  test('support name aliases', function(t) {
    const doc = {
      name: { default: ['name1','name2'] } // note the array
    };
    t.equal(generator(doc),'name1');
    t.end();
  });
};

module.exports.all = function (tape, common) {

  function test(name, testFunction) {
    return tape('label generator: ' + name, testFunction);
  }

  for( var testCase in module.exports.tests ){
    module.exports.tests[testCase](test, common);
  }
};
