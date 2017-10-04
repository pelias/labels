var generator = require('../labelGenerator');

module.exports.tests = {};

module.exports.tests.interface = function(test, common) {
  test('interface', function(t) {
    t.equal(typeof generator, 'function', 'valid function');
    t.end();
  });
};

module.exports.tests.united_states = function(test, common) {
  // test('venue', function(t) {
  //   var doc = {
  //     'name': { 'default': 'venue name' },
  //     'layer': 'venue',
  //     'housenumber': 'house number',
  //     'street': 'street name',
  //     'neighbourhood': ['neighbourhood name'],
  //     'locality': ['locality name'],
  //     'localadmin': ['localadmin name'],
  //     'county': ['county name'],
  //     'macrocounty': ['macrocounty name'],
  //     'region_a': ['region abbr'],
  //     'region': ['region name'],
  //     'macroregion': ['macroregion name'],
  //     'country_a': ['KOR'],
  //     'country': ['South Korea']
  //   };
  //   t.equal(generator(doc),'venue name, South Korea region name locality name');
  //   t.end();
  // });
  //
  // test('county value should be used when there is no locality', function(t) {
  //   var doc = {
  //     'name': { 'default': 'venue name' },
  //     'layer': 'venue',
  //     'housenumber': 'house number',
  //     'street': 'street name',
  //     'neighbourhood': ['neighbourhood name'],
  //     'localadmin': ['localadmin name'],
  //     'county': ['county name'],
  //     'macrocounty': ['macrocounty name'],
  //     'region_a': ['region abbr'],
  //     'region': ['region name'],
  //     'macroregion': ['macroregion name'],
  //     'country_a': ['KOR'],
  //     'country': ['South Korea']
  //   };
  //   t.equal(generator(doc),'venue name, South Korea region name county name');
  //   t.end();
  // });

  test('address', function(t) {
    var doc = {
      'name': { 'default': '123 street name' },
      'layer': 'address',
      'housenumber': '123',
      'street': 'street name',
      'neighbourhood': ['neighbourhood name'],
      'locality': ['locality name'],
      'localadmin': ['localadmin name'],
      'county': ['county name'],
      'region': ['region name'],
      'country_a': ['KOR'],
      'country': ['South Korea']
    };
    t.equal(generator(doc),'South Korea region name locality name street name 123');
    t.end();
  });

  // test('address: county value should be used when there is no locality or localadmin', function(t) {
  //   var doc = {
  //     'name': { 'default': '123 street name' },
  //     'layer': 'address',
  //     'housenumber': '123',
  //     'street': 'street name',
  //     'county': ['county name'],
  //     'region': ['region name'],
  //     'country_a': ['KOR'],
  //     'country': ['South Korea']
  //   };
  //   t.equal(generator(doc),'South Korea region name county name street name 123');
  //   t.end();
  // });
  //
  // test('address: localadmin should be used when no locality', function(t) {
  //   var doc = {
  //     'name': { 'default': 'house number street name' },
  //     'layer': 'address',
  //     'housenumber': '123',
  //     'street': 'street name',
  //     'neighbourhood': ['neighbourhood name'],
  //     'localadmin': ['localadmin name'],
  //     'county': ['county name'],
  //     'region': ['region name'],
  //     'country_a': ['KOR'],
  //     'country': ['South Korea']
  //   };
  //   t.equal(generator(doc),'South Korea region name locality name street name 123');
  //   t.end();
  // });

  test('neighbourhood', function(t) {
    var doc = {
      'name': { 'default': 'neighbourhood name' },
      'layer': 'neighbourhood',
      'neighbourhood': ['neighbourhood name'],
      'locality': ['locality name'],
      'localadmin': ['localadmin name'],
      'county': ['county name'],
      'region': ['region name'],
      'country_a': ['KOR'],
      'country': ['South Korea']
    };
    t.equal(generator(doc),'South Korea region name locality name neighbourhood name');
    t.end();
  });

  test('locality', function(t) {
    var doc = {
      'name': { 'default': 'locality name' },
      'layer': 'locality',
      'locality': ['locality name'],
      'localadmin': ['localadmin name'],
      'county': ['county name'],
      'region': ['region name'],
      'country_a': ['KOR'],
      'country': ['South Korea']
    };
    t.equal(generator(doc),'South Korea region name locality name');
    t.end();
  });

  test('localadmin', function(t) {
    var doc = {
      'name': { 'default': 'localadmin name' },
      'layer': 'localadmin',
      'localadmin': ['localadmin name'],
      'county': ['county name'],
      'region': ['region name'],
      'country_a': ['KOR'],
      'country': ['South Korea']
    };
    t.equal(generator(doc),'South Korea region name localadmin name');
    t.end();
  });

  test('county', function(t) {
    var doc = {
      'name': { 'default': 'county name' },
      'layer': 'county',
      'county': ['county name'],
      'region': ['region name'],
      'country_a': ['KOR'],
      'country': ['South Korea']
    };
    t.equal(generator(doc),'South Korea region name county name');
    t.end();
  });

  test('region', function(t) {
    var doc = {
      'name': { 'default': 'region name' },
      'layer': 'region',
      'region': ['region name'],
      'country_a': ['KOR'],
      'country': ['South Korea']
    };
    t.equal(generator(doc),'South Korea region name');
    t.end();
  });

  test('country', function(t) {
    var doc = {
      'name': { 'default': 'South Korea' },
      'layer': 'country',
      'country_a': ['KOR'],
      'country': ['South Korea']
    };
    t.equal(generator(doc),'South Korea');
    t.end();
  });
};

module.exports.all = function (tape, common) {

  function test(name, testFunction) {
    return tape('label generator (KOR): ' + name, testFunction);
  }

  for( var testCase in module.exports.tests ){
    module.exports.tests[testCase](test, common);
  }
};
