var generator = require('../labelGenerator');

module.exports.tests = {};

module.exports.tests.interface = function(test, common) {
  test('interface', function(t) {
    t.equal(typeof generator, 'function', 'valid function');
    t.end();
  });
};

module.exports.tests.canada = function(test, common) {
  test('venue', function(t) {
    var doc = {
      'name': { 'default': 'Tim Horton\'s'},
      'layer': 'venue',
      'housenumber': '1',
      'street': 'Main St',
      'neighbourhood': ['College Heights'],
      'locality': ['Thunder Bay'],
      'region_a': ['ON'],
      'region': ['Ontario'],
      'country_a': ['CAN'],
      'country': ['Canada']
    };
    t.equal(generator(doc),'Tim Horton\'s, Thunder Bay, ON, Canada');
    t.end();
  });

  test('address', function(t) {
    var doc = {
      'name': { 'default': '1 Main St'},
      'layer': 'venue',
      'housenumber': '1',
      'street': ['Main St'],
      'locality': ['Truth or Consequences'],
      'region_a': ['NM'],
      'region': ['New Mexico'],
      'country_a': ['USA'],
      'country': ['United States']
    };
    t.equal(generator(doc),'1 Main St, Truth or Consequences, NM, USA');
    t.end();
  });
};

module.exports.tests.france = function(test, common) {
  test('eiffel tower', function(t) {
    var doc = {
      'name': { 'default': 'Tour Eiffel'},
      'layer': 'venue',
      'neighbourhood': ['Quartier du Gros-Caillou'],
      'locality': ['Paris'],
      'region': ['Paris'],
      'country_a': ['FRA'],
      'country': ['France']
    };
    t.equal(generator(doc),'Tour Eiffel, Paris, France');
    t.end();
  });

  test('France street address', function(t) {
    var doc = {
      'name': { 'default': '74 rue de rivoli'},
      'layer': 'address',
      'housenumber': '74',
      'street': ['Rue de Rivoli'],
      'neighbourhood': ['Quartier Saint-Merri'],
      'locality': ['Paris'],
      'region': ['Paris'],
      'country_a': ['FRA'],
      'country': ['France']
    };
    t.equal(generator(doc),'74 rue de rivoli, Paris, France');
    t.end();
  });

  test('France neighbourhood', function(t) {
    var doc = {
      'name': { 'default': 'Grange aux Belles Terrage'},
      'layer': 'neighbourhood',
      'neighbourhood': ['Grange aux Belles Terrage'],
      'locality': ['Paris'],
      'region': ['Paris'],
      'country_a': ['FRA'],
      'country': ['France']
    };
    t.equal(generator(doc),'Grange aux Belles Terrage, Paris, France');
    t.end();
  });

  test('Luxembourg (the city) in Luxembourg', function(t) {
    var doc = {
      'name': { 'default': 'Luxembourg'},
      'layer': 'locality',
      'locality': ['Luxembourg'],
      'country_a': ['LUX'],
      'country': ['Luxembourg']
    };
    // console.error(generator(doc));
    t.equal(generator(doc),'Luxembourg, Luxembourg');
    t.end();
  });

  test('São Paulo, major city in Brazil', function(t) {
    const doc = {
      'name': { 'default': 'São Paulo'},
      'layer': 'locality',
      'locality': ['São Paulo'],
      'region': ['São Paulo'],
      'region_a': ['SP'],
      'country_a': ['BRA'],
      'country': ['Brazil']
    };
    t.equal(generator(doc),'São Paulo, Brazil');
    t.end();
  });

  test('São Paulo, major city in Brazil. Language set to English', function(t) {
    const doc = {
      'name': { 'default': 'São Paulo'},
      'layer': 'locality',
      'locality': ['São Paulo'],
      'region': ['Sao Paulo'],
      'region_a': ['SP'],
      'country_a': ['BRA'],
      'country': ['Brazil']
    };
    t.equal(generator(doc),'São Paulo, Brazil');
    t.end();
  });

  test('São Paulo, Amazonas - small village in Brazil', function(t) {
    const doc = {
      'name': { 'default': 'São Paulo'},
      'layer': 'locality',
      'locality': ['São Paulo'],
      'region': ['Amazonas'],
      'region_a': ['AM'],
      'country_a': ['BRA'],
      'country': ['Brazil']
    };
    t.equal(generator(doc),'São Paulo, AM, Brazil');
    t.end();
  });

};
module.exports.tests.italy = function(test, common) {
  test('Italian street address', function(t) {
    var doc = {
      'name': { 'default': 'Corso Duca Degli Abruzzi 71'},
      'layer': 'address',
      'housenumber': '71',
      'street': ['Corso Duca Degli Abruzzi'],
      'neighbourhood': ['San Paolo'],
      'locality': ['Torino'],
      'region': ['Torino'],
      'region_a': ['TO'],
      'country_a': ['ITA'],
      'country': ['Italia']
    };
    t.equal(generator(doc),'Corso Duca Degli Abruzzi 71, Torino, TO, Italia');
    t.end();
  });


};

module.exports.tests.name_only = function(test, common) {
  test('name-only results (no admin fields) should not include extraneous comma', function(t) {
    var doc = {
      'name': {
        'default': 'Result name'
      }
    };
    t.equal(generator(doc),'Result name');
    t.end();
  });

};

module.exports.all = function (tape, common) {

  function test(name, testFunction) {
    return tape('label generator (example): ' + name, testFunction);
  }

  for( var testCase in module.exports.tests ){
    module.exports.tests[testCase](test, common);
  }
};
