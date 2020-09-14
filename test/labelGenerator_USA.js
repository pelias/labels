var generator = require('../labelGenerator');

module.exports.tests = {};

module.exports.tests.interface = function(test, common) {
  test('interface', function(t) {
    t.equal(typeof generator, 'function', 'valid function');
    t.end();
  });
};

module.exports.tests.united_states = function(test, common) {
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
      'region_a': ['region abbr'],
      'region': ['region name'],
      'macroregion': ['macroregion name'],
      'country_a': ['USA'],
      'country': ['United States']
    };
    t.equal(generator(doc),'venue name, locality name, region abbr, USA');
    t.end();
  });

  test('localadmin value should be used when there is no locality', function(t) {
    var doc = {
      'name': { 'default': 'venue name' },
      'layer': 'venue',
      'housenumber': 'house number',
      'street': 'street name',
      'neighbourhood': ['neighbourhood name'],
      'localadmin': ['localadmin name'],
      'county': ['county name'],
      'macrocounty': ['macrocounty name'],
      'region_a': ['region abbr'],
      'region': ['region name'],
      'macroregion': ['macroregion name'],
      'country_a': ['USA'],
      'country': ['United States']
    };
    t.equal(generator(doc),'venue name, localadmin name, region abbr, USA');
    t.end();
  });

  test('county value should be used when there is no localadmin', function(t) {
    var doc = {
      'name': { 'default': 'venue name' },
      'layer': 'venue',
      'housenumber': 'house number',
      'street': 'street name',
      'neighbourhood': ['neighbourhood name'],
      'county': ['county name'],
      'macrocounty': ['macrocounty name'],
      'region_a': ['region abbr'],
      'region': ['region name'],
      'macroregion': ['macroregion name'],
      'country_a': ['USA'],
      'country': ['United States']
    };
    t.equal(generator(doc),'venue name, county name, region abbr, USA');
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
      'region_a': ['region abbr'],
      'region': ['region name'],
      'macroregion': ['macroregion name'],
      'country_a': ['USA'],
      'country': ['United States']
    };
    t.equal(generator(doc),'house number street name, locality name, region abbr, USA');
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
      'region_a': ['region abbr'],
      'region': ['region name'],
      'macroregion': ['macroregion name'],
      'country_a': ['USA'],
      'country': ['United States']
    };
    t.equal(generator(doc),'neighbourhood name, locality name, region abbr, USA');
    t.end();
  });

  test('venue in borough', function(t) {
    var doc = {
      'name': { 'default': 'venue name' },
      'layer': 'venue',
      'neighbourhood': ['neighbourhood name'],
      'borough': ['borough name'],
      'locality': ['locality name'],
      'localadmin': ['localadmin name'],
      'county': ['county name'],
      'macrocounty': ['macrocounty name'],
      'region_a': ['region abbr'],
      'region': ['region name'],
      'macroregion': ['macroregion name'],
      'country_a': ['USA'],
      'country': ['United States']
    };
    t.equal(generator(doc),'venue name, borough name, locality name, region abbr, USA');
    t.end();
  });

  test('venue in queens', function(t) {
    var doc = {
      'name': { 'default': 'venue name' },
      'layer': 'venue',
      'neighbourhood': ['Woodside'],
      'borough': ['Queens'],
      'locality': ['New York'],
      'locality_a': ['NYC'],
      'localadmin': ['localadmin name'],
      'county': ['county name'],
      'macrocounty': ['macrocounty name'],
      'region_a': ['NY'],
      'region': ['New York'],
      'macroregion': ['macroregion name'],
      'country_a': ['USA'],
      'country': ['United States']
    };
    t.equal(generator(doc),'venue name, Woodside, NY, USA');
    t.end();
  });

  test('neighbourhood in queens', function(t) {
    var doc = {
      'name': { 'default': 'Astoria' },
      'layer': 'neighbourhood',
      'neighbourhood': ['Astoria'],
      'borough': ['Queens'],
      'locality': ['New York'],
      'locality_a': ['NYC'],
      'localadmin': ['New York'],
      'county': ['Queens'],
      'region_a': ['NY'],
      'region': ['New York'],
      'country_a': ['USA'],
      'country': ['United States']
    };
    t.equal(generator(doc),'Astoria, Queens, NY, USA');
    t.end();
  });

  test('venue in Brooklyn', function(t) {
    var doc = {
      'name': { 'default': 'venue name' },
      'layer': 'venue',
      'neighbourhood': ['Williamsburg'],
      'borough': ['Brooklyn'],
      'locality': ['New York'],
      'locality_a': ['NYC'],
      'localadmin': ['localadmin name'],
      'county': ['county name'],
      'macrocounty': ['macrocounty name'],
      'region_a': ['NY'],
      'region': ['New York'],
      'macroregion': ['macroregion name'],
      'country_a': ['USA'],
      'country': ['United States']
    };
    t.equal(generator(doc),'venue name, Brooklyn, NY, USA');
    t.end();
  });

  test('venue in Bronx', function(t) {
    var doc = {
      'name': { 'default': 'venue name' },
      'layer': 'venue',
      'neighbourhood': ['Mott Haven'],
      'borough': ['Bronx'],
      'locality': ['New York'],
      'locality_a': ['NYC'],
      'localadmin': ['localadmin name'],
      'county': ['county name'],
      'macrocounty': ['macrocounty name'],
      'region_a': ['NY'],
      'region': ['New York'],
      'macroregion': ['macroregion name'],
      'country_a': ['USA'],
      'country': ['United States']
    };
    t.equal(generator(doc),'venue name, Bronx, NY, USA');
    t.end();
  });

  test('venue in Manhattan', function(t) {
    var doc = {
      'name': { 'default': 'New York Bakery' },
      'layer': 'venue',
      'neighbourhood': ['Midtown'],
      'borough': ['Manhattan'],
      'locality': ['New York'],
      'locality_a': ['NYC'],
      'localadmin': ['New York'],
      'county': ['New York'],
      'region_a': ['NY'],
      'region': ['New York'],
      'country_a': ['USA'],
      'country': ['United States']
    };
    t.equal(generator(doc),'New York Bakery, New York, NY, USA');
    t.end();
  });

  test('neighbourhood in Manhattan', function(t) {
    var doc = {
      'name': { 'default': 'Washington Heights' },
      'layer': 'neighbourhood',
      'neighbourhood': ['Washington Heights'],
      'borough': ['Manhattan'],
      'locality': ['New York'],
      'locality_a': ['NYC'],
      'localadmin': ['New York'],
      'county': ['New York'],
      'region_a': ['NY'],
      'region': ['New York'],
      'country_a': ['USA'],
      'country': ['United States']
    };
    t.equal(generator(doc),'Washington Heights, Manhattan, New York, NY, USA');
    t.end();
  });

  test('neighbourhood', function(t) {
    var doc = {
      'name': { 'default': 'neighbourhood name' },
      'layer': 'neighbourhood',
      'locality': ['locality name'],
      'localadmin': ['localadmin name'],
      'county': ['county name'],
      'macrocounty': ['macrocounty name'],
      'region_a': ['region abbr'],
      'region': ['region name'],
      'macroregion': ['macroregion name'],
      'country_a': ['USA'],
      'country': ['United States']
    };
    t.equal(generator(doc),'neighbourhood name, locality name, region abbr, USA');
    t.end();
  });


  test('neighbourhood in Queens', function(t) {
    var doc = {
      'name': { 'default': 'Rego Park' },
      'layer': 'neighbourhood',
      'neighbourhood': ['Rego Park'],
      'borough': ['Queens'],
      'locality': ['locality name'],
      'locality_a': ['NYC'],
      'localadmin': ['localadmin name'],
      'county': ['county name'],
      'macrocounty': ['macrocounty name'],
      'region_a': ['NY'],
      'region': ['region name'],
      'macroregion': ['macroregion name'],
      'country_a': ['USA'],
      'country': ['United States']
    };
    t.equal(generator(doc),'Rego Park, Queens, NY, USA');
    t.end();
  });


  test('neighbourhood in Brooklyn', function(t) {
    var doc = {
      'name': { 'default': 'Williamsburg' },
      'layer': 'neighbourhood',
      'neighbourhood': ['Williamsburg'],
      'borough': ['Brooklyn'],
      'locality': ['locality name'],
      'locality_a': ['NYC'],
      'localadmin': ['localadmin name'],
      'county': ['county name'],
      'macrocounty': ['macrocounty name'],
      'region_a': ['NY'],
      'region': ['region name'],
      'macroregion': ['macroregion name'],
      'country_a': ['USA'],
      'country': ['United States']
    };
    t.equal(generator(doc),'Williamsburg, Brooklyn, NY, USA');
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
      'region_a': ['region abbr'],
      'region': ['region name'],
      'macroregion': ['macroregion name'],
      'country_a': ['USA'],
      'country': ['United States']
    };
    t.equal(generator(doc),'locality name, region abbr, USA');
    t.end();
  });

  test('localadmin', function(t) {
    var doc = {
      'name': { 'default': 'localadmin name' },
      'layer': 'localadmin',
      'localadmin': ['localadmin name'],
      'county': ['county name'],
      'macrocounty': ['macrocounty name'],
      'region_a': ['region abbr'],
      'region': ['region name'],
      'macroregion': ['macroregion name'],
      'country_a': ['USA'],
      'country': ['United States']
    };
    t.equal(generator(doc),'localadmin name, region abbr, USA');
    t.end();
  });

  test('county', function(t) {
    var doc = {
      'name': { 'default': 'county name' },
      'layer': 'county',
      'county': ['county name'],
      'macrocounty': ['macrocounty name'],
      'region_a': ['region abbr'],
      'region': ['region name'],
      'macroregion': ['macroregion name'],
      'country_a': ['USA'],
      'country': ['United States']
    };
    t.equal(generator(doc),'county name, region abbr, USA');
    t.end();
  });

  test('macrocounty', function(t) {
    var doc = {
      'name': { 'default': 'macrocounty name' },
      'layer': 'macrocounty',
      'macrocounty': ['macrocounty name'],
      'region_a': ['region abbr'],
      'region': ['region name'],
      'macroregion': ['macroregion name'],
      'country_a': ['USA'],
      'country': ['United States']
    };
    t.equal(generator(doc),'macrocounty name, region abbr, USA');
    t.end();
  });

  test('region', function(t) {
    var doc = {
      'name': { 'default': 'region name' },
      'layer': 'region',
      'region_a': ['region abbr'],
      'region': ['region name'],
      'macroregion': ['macroregion name'],
      'country_a': ['USA'],
      'country': ['United States']
    };
    t.equal(generator(doc),'region name, USA');
    t.end();
  });

  test('macroregion', function(t) {
    var doc = {
      'name': { 'default': 'macroregion name' },
      'layer': 'macroregion',
      'macroregion': ['macroregion name'],
      'country_a': ['USA'],
      'country': ['United States']
    };
    t.equal(generator(doc),'macroregion name, USA');
    t.end();
  });

  test('country', function(t) {
    var doc = {
      'name': { 'default': 'United States' },
      'layer': 'country',
      'country_a': ['USA'],
      'country': ['United States']
    };
    t.equal(generator(doc),'United States');
    t.end();
  });

  test('region should be used when region_a is not available', function(t) {
    var doc = {
      'name': { 'default': 'locality name' },
      'locality': ['locality name'],
      'localadmin': ['localadmin name'],
      'county': ['county name'],
      'macrocounty': ['macrocounty name'],
      'region': ['region name'],
      'macroregion': ['macroregion name'],
      'country_a': ['USA'],
      'country': ['United States']
    };
    t.equal(generator(doc),'locality name, region name, USA', 'region should be used');
    t.end();
  });

  test('dependency layer should use full name instead of abbreviation', function(t) {
    var doc = {
      'name': { 'default': 'dependency name' },
      'layer': 'dependency',
      'dependency_a': ['dependency abbr'],
      'dependency': ['dependency name'],
      'country_a': ['USA'],
      'country': ['United States']
    };
    t.equal(generator(doc),'dependency name', 'dependency should be used');
    t.end();

  });

  test('dependency abbreviation should be used instead of dependency name or country and skip region', function(t) {
    var doc = {
      'name': { 'default': 'locality name' },
      'locality': ['locality name'],
      'localadmin': ['localadmin name'],
      'county': ['county name'],
      'macrocounty': ['macrocounty name'],
      'region': ['region name'],
      'macroregion': ['macroregion name'],
      'dependency_a': ['dependency abbr'],
      'dependency': ['dependency name'],
      'country_a': ['USA'],
      'country': ['United States']
    };
    t.equal(generator(doc),'locality name, dependency abbr', 'dependency_a should be used');
    t.end();

  });

  test('dependency name should be used instead of country when dep abbr is unavailable and skip region', function(t) {
    var doc = {
      'name': { 'default': 'locality name' },
      'locality': ['locality name'],
      'localadmin': ['localadmin name'],
      'county': ['county name'],
      'macrocounty': ['macrocounty name'],
      'region': ['region name'],
      'macroregion': ['macroregion name'],
      'dependency': ['dependency name'],
      'country_a': ['USA'],
      'country': ['United States']
    };
    t.equal(generator(doc),'locality name, dependency name', 'dependency should be used');
    t.end();

  });

};

module.exports.all = function (tape, common) {

  function test(name, testFunction) {
    return tape('label generator (USA): ' + name, testFunction);
  }

  for( var testCase in module.exports.tests ){
    module.exports.tests[testCase](test, common);
  }
};
