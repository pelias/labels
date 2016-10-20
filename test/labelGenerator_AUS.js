var generator = require('../labelGenerator');

module.exports.tests = {};

module.exports.tests.interface = function(test, common) {
  test('interface', function(t) {
    t.equal(typeof generator, 'function', 'valid function');
    t.end();
  });
};

module.exports.tests.australia = function(test, common) {
  test('venue', function(t) {
    var doc = {
      'name': { 'default': 'venue name' },
      'layer': 'venue',
      'housenumber': 'house number',
      'street': 'street name',
      'neighbourhood': 'neighbourhood name',
      'locality': 'locality name',
      'localadmin': 'localadmin name',
      'county': 'county name',
      'macrocounty': 'macrocounty name',
      'region': 'region name',
      'macroregion': 'macroregion name',
      'country_a': 'AUS',
      'country': 'Australia'
    };
    t.equal(generator(doc),'venue name, locality name, region name, Australia');
    t.end();
  });

  test('localadmin value should be used when locality is not available', function(t) {
    var doc = {
      'name': { 'default': 'venue name' },
      'layer': 'venue',
      'housenumber': 'house number',
      'street': 'street name',
      'neighbourhood': 'neighbourhood name',
      'localadmin': 'localadmin name',
      'county': 'county name',
      'macrocounty': 'macrocounty name',
      'region': 'region name',
      'macroregion': 'macroregion name',
      'country_a': 'AUS',
      'country': 'Australia'
    };
    t.equal(generator(doc),'venue name, localadmin name, region name, Australia');
    t.end();
  });

  test('street', function(t) {
    var doc = {
      'name': { 'default': 'house number street name' },
      'layer': 'address',
      'housenumber': 'house number',
      'street': 'street name',
      'neighbourhood': 'neighbourhood name',
      'locality': 'locality name',
      'localadmin': 'localadmin name',
      'county': 'county name',
      'macrocounty': 'macrocounty name',
      'region': 'region name',
      'macroregion': 'macroregion name',
      'country_a': 'AUS',
      'country': 'Australia'
    };
    t.equal(generator(doc),'house number street name, locality name, region name, Australia');
    t.end();
  });

  test('neighbourhood', function(t) {
    var doc = {
      'name': { 'default': 'neighbourhood name' },
      'layer': 'neighbourhood',
      'neighbourhood': 'neighbourhood name',
      'locality': 'locality name',
      'localadmin': 'localadmin name',
      'county': 'county name',
      'macrocounty': 'macrocounty name',
      'region': 'region name',
      'macroregion': 'macroregion name',
      'country_a': 'AUS',
      'country': 'Australia'
    };
    t.equal(generator(doc),'neighbourhood name, locality name, region name, Australia');
    t.end();
  });

  test('locality', function(t) {
    var doc = {
      'name': { 'default': 'locality name' },
      'layer': 'locality',
      'locality': 'locality name',
      'localadmin': 'localadmin name',
      'county': 'county name',
      'macrocounty': 'macrocounty name',
      'region': 'region name',
      'macroregion': 'macroregion name',
      'country_a': 'AUS',
      'country': 'Australia'
    };
    t.equal(generator(doc),'locality name, region name, Australia');
    t.end();
  });

  test('localadmin', function(t) {
    var doc = {
      'name': { 'default': 'localadmin name' },
      'layer': 'localadmin',
      'localadmin': 'localadmin name',
      'county': 'county name',
      'macrocounty': 'macrocounty name',
      'region': 'region name',
      'macroregion': 'macroregion name',
      'country_a': 'AUS',
      'country': 'Australia'
    };
    t.equal(generator(doc),'localadmin name, region name, Australia');
    t.end();
  });

  test('county', function(t) {
    var doc = {
      'name': { 'default': 'county name' },
      'layer': 'county',
      'county': 'county name',
      'macrocounty': 'macrocounty name',
      'region': 'region name',
      'macroregion': 'macroregion name',
      'country_a': 'AUS',
      'country': 'Australia'
    };
    t.equal(generator(doc),'county name, region name, Australia');
    t.end();
  });

  test('macrocounty', function(t) {
    var doc = {
      'name': { 'default': 'macrocounty name' },
      'layer': 'macrocounty',
      'macrocounty': 'macrocounty name',
      'region': 'region name',
      'macroregion': 'macroregion name',
      'country_a': 'AUS',
      'country': 'Australia'
    };
    t.equal(generator(doc),'macrocounty name, region name, Australia');
    t.end();
  });

  test('region', function(t) {
    var doc = {
      'name': { 'default': 'region name' },
      'layer': 'region',
      'region': 'region name',
      'macroregion': 'macroregion name',
      'country_a': 'AUS',
      'country': 'Australia'
    };
    t.equal(generator(doc),'region name, Australia');
    t.end();
  });

  test('macroregion', function(t) {
    var doc = {
      'name': { 'default': 'macroregion name' },
      'layer': 'macroregion',
      'macroregion': 'macroregion name',
      'country_a': 'AUS',
      'country': 'Australia'
    };
    t.equal(generator(doc),'macroregion name, Australia');
    t.end();
  });

  test('country', function(t) {
    var doc = {
      'name': { 'default': 'Australia' },
      'layer': 'country',
      'postalcode': 'postalcode',
      'country_a': 'AUS',
      'country': 'Australia'
    };
    t.equal(generator(doc),'Australia');
    t.end();
  });

};

module.exports.all = function (tape, common) {

  function test(name, testFunction) {
    return tape('label generator (AUS): ' + name, testFunction);
  }

  for( var testCase in module.exports.tests ){
    module.exports.tests[testCase](test, common);
  }
};
