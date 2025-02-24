var generator = require('../labelGenerator');

module.exports.tests = {};

module.exports.tests.interface = function(test, common) {
  test('interface', function(t) {
    t.equal(typeof generator, 'function', 'valid function');
    t.end();
  });
};

module.exports.tests.france = function(test, common) {
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
      'country_a': ['FRA'],
      'country': ['France']
    };
    t.equal(generator(doc),'venue name, locality name, France');
    t.end();
  });

  test('overseas: venue', function(t) {
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
      'region_a': ['RE'],
      'region': ['Reunion'],
      'macroregion': ['macroregion name'],
      'country_a': ['FRA'],
      'country': ['France']
    };
    t.equal(generator(doc),'venue name, locality name, Reunion');
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
      'country_a': ['FRA'],
      'country': ['France']
    };
    t.equal(generator(doc),'venue name, localadmin name, France');
    t.end();
  });

  test('overseas: localadmin value should be used when locality is not available', function(t) {
    var doc = {
      'name': { 'default': 'venue name' },
      'layer': 'venue',
      'housenumber': 'house number',
      'street': 'street name',
      'neighbourhood': ['neighbourhood name'],
      'localadmin': ['localadmin name'],
      'county': ['county name'],
      'macrocounty': ['macrocounty name'],
      'region_a': ['RE'],
      'region': ['Reunion'],
      'macroregion': ['macroregion name'],
      'country_a': ['FRA'],
      'country': ['France']
    };
    t.equal(generator(doc),'venue name, localadmin name, Reunion');
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
      'country_a': ['FRA'],
      'country': ['France']
    };
    t.equal(generator(doc),'house number street name, locality name, France');
    t.end();
  });

  test('overseas: street', function(t) {
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
      'region_a': ['MQ'],
      'region': ['Martinique'],
      'macroregion': ['macroregion name'],
      'country_a': ['FRA'],
      'country': ['France']
    };
    t.equal(generator(doc),'house number street name, locality name, Martinique');
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
      'country_a': ['FRA'],
      'country': ['France']
    };
    t.equal(generator(doc),'neighbourhood name, locality name, France');
    t.end();
  });

  test('overseas: neighbourhood', function(t) {
    var doc = {
      'name': { 'default': 'neighbourhood name' },
      'layer': 'neighbourhood',
      'neighbourhood': ['neighbourhood name'],
      'locality': ['locality name'],
      'localadmin': ['localadmin name'],
      'county': ['county name'],
      'macrocounty': ['macrocounty name'],
      'region_a': ['MQ'],
      'region': ['Martinique'],
      'macroregion': ['macroregion name'],
      'country_a': ['FRA'],
      'country': ['France']
    };
    t.equal(generator(doc),'neighbourhood name, locality name, Martinique');
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
      'country_a': ['FRA'],
      'country': ['France']
    };
    t.equal(generator(doc),'locality name, France');
    t.end();
  });

  test('overseas: locality', function(t) {
    var doc = {
      'name': { 'default': 'locality name' },
      'layer': 'locality',
      'locality': ['locality name'],
      'localadmin': ['localadmin name'],
      'county': ['county name'],
      'macrocounty': ['macrocounty name'],
      'region_a': ['GP'],
      'region': ['Guadeloupe'],
      'macroregion': ['macroregion name'],
      'country_a': ['FRA'],
      'country': ['France']
    };
    t.equal(generator(doc),'locality name, Guadeloupe');
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
      'country_a': ['FRA'],
      'country': ['France']
    };
    t.equal(generator(doc),'localadmin name, France');
    t.end();
  });

  test('overseas: localadmin', function(t) {
    var doc = {
      'name': { 'default': 'localadmin name' },
      'layer': 'localadmin',
      'localadmin': ['localadmin name'],
      'county': ['county name'],
      'macrocounty': ['macrocounty name'],
      'region_a': ['GF'],
      'region': ['French Guiana'],
      'macroregion': ['macroregion name'],
      'country_a': ['FRA'],
      'country': ['France']
    };
    t.equal(generator(doc),'localadmin name, French Guiana');
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
      'country_a': ['FRA'],
      'country': ['France']
    };
    t.equal(generator(doc),'county name, France');
    t.end();
  });

  test('overseas: county', function(t) {
    var doc = {
      'name': { 'default': 'county name' },
      'layer': 'county',
      'county': ['county name'],
      'macrocounty': ['macrocounty name'],
      'region_a': ['RE'],
      'region': ['Reunion'],
      'macroregion': ['macroregion name'],
      'country_a': ['FRA'],
      'country': ['France']
    };
    t.equal(generator(doc),'county name, Reunion');
    t.end();
  });

  test('macrocounty', function(t) {
    var doc = {
      'name': { 'default': 'macrocounty name' },
      'layer': 'macrocounty',
      'macrocounty': ['macrocounty name'],
      'region': ['region name'],
      'macroregion': ['macroregion name'],
      'country_a': ['FRA'],
      'country': ['France']
    };
    t.equal(generator(doc),'macrocounty name, France');
    t.end();
  });

  test('overseas: macrocounty', function(t) {
    var doc = {
      'name': { 'default': 'macrocounty name' },
      'layer': 'macrocounty',
      'macrocounty': ['macrocounty name'],
      'region_a': ['RE'],
      'region': ['Reunion'],
      'macroregion': ['macroregion name'],
      'country_a': ['FRA'],
      'country': ['France']
    };
    t.equal(generator(doc),'macrocounty name, Reunion');
    t.end();
  });

  test('region', function(t) {
    var doc = {
      'name': { 'default': 'region name' },
      'layer': 'region',
      'region': ['region name'],
      'macroregion': ['macroregion name'],
      'country_a': ['FRA'],
      'country': ['France']
    };
    t.equal(generator(doc),'region name, France');
    t.end();
  });

  test('overseas: region', function(t) {
    var doc = {
      'name': { 'default': 'Reunion' },
      'layer': 'region',
      'region_a': ['RE'],
      'region': ['Reunion'],
      'macroregion': ['macroregion name'],
      'country_a': ['FRA'],
      'country': ['France']
    };
    t.equal(generator(doc),'Reunion');
    t.end();
  });

  test('macroregion', function(t) {
    var doc = {
      'name': { 'default': 'macroregion name' },
      'layer': 'macroregion',
      'macroregion': ['macroregion name'],
      'country_a': ['FRA'],
      'country': ['France']
    };
    t.equal(generator(doc),'macroregion name, France');
    t.end();
  });

  test('dependency', function(t) {
    var doc = {
      'name': { 'default': 'dependency name' },
      'layer': 'dependency',
      'postalcode': 'postalcode',
      'dependency': ['dependency name'],
      'country_a': ['FRA'],
      'country': ['France']
    };
    t.equal(generator(doc),'dependency name');
    t.end();
  });

  test('country', function(t) {
    var doc = {
      'name': { 'default': 'France' },
      'layer': 'country',
      'postalcode': 'postalcode',
      'country_a': ['FRA'],
      'country': ['France']
    };
    t.equal(generator(doc),'France');
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
      'country_a': ['FRA'],
      'country': ['France']
    };
    t.equal(generator(doc),'locality name, dependency name');
    t.end();
  });

  test('postalcode with locality', function(t) {
    var doc = {
      'name': { 'default': '69001' },
      'layer': 'postalcode',
      'locality': ['Lyon'],
      'county': ['Metropolitan Lyon'],
      'macrocounty': ['Lyon'],
      'region': ['Rhône'],
      'macroregion': ['Auvergne-Rhone-Alpes'],
      'country_a': ['FRA'],
      'country': ['France']
    };
    t.equal(generator(doc),'69001, Lyon, France');
    t.end();
  });

  test('postalcode without locality or localadmin', function(t) {
    var doc = {
      'name': { 'default': '13080' },
      'layer': 'postalcode',
      'county': ['Aix-en-Provence Canton'],
      'macrocounty': ['Aix-En-Provence'],
      'region': ['Bouches-du-Rhône'],
      'macroregion': ['Provence-Alpes-Cote d\'Azur'],
      'country_a': ['FRA'],
      'country': ['France']
    };
    t.equal(generator(doc),'13080, Aix-en-Provence Canton, France');
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
