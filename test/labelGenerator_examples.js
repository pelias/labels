const generator = require('../labelGenerator');
const partsGenerator = require('../labelGenerator').partsGenerator;

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
    t.deepEqual(partsGenerator(doc), {
      labelParts: [
        { label: `Tim Horton's`, role: 'required', layer: 'name' },
        { label: 'Main St', role: 'optional', layer: 'street' },
        { label: 'Thunder Bay', role: 'required', layer: 'locality' },
        { label: 'ON', role: 'required', layer: 'region' },
        { label: 'Canada', role: 'required', layer: 'country' },
      ],
      separator: ', ',
    });
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
    t.deepEqual(partsGenerator(doc), {
      labelParts: [
        { label: '1 Main St', role: 'required', layer: 'name' },
        { label: 'Main St', role: 'optional', layer: 'street' },
        { label: 'Truth or Consequences', role: 'required', layer: 'locality' },
        { label: 'NM', role: 'required', layer: 'region' },
        { label: 'USA', role: 'required', layer: 'country' },
      ],
      separator: ', ',
    });
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
    t.deepEqual(partsGenerator(doc), {
      labelParts: [
        { label: 'Tour Eiffel', role: 'required', layer: 'name' },
        { label: 'Paris', role: 'required', layer: 'locality' },
        { label: 'Paris', role: 'optional', layer: 'region' },
        { label: 'France', role: 'required', layer: 'country' },
      ],
      separator: ', ',
    });
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
    t.deepEqual(partsGenerator(doc), {
      labelParts: [
        { label: '74 rue de rivoli', role: 'required', layer: 'name' },
        { label: 'Paris', role: 'required', layer: 'locality' },
        { label: 'Paris', role: 'optional', layer: 'region' },
        { label: 'France', role: 'required', layer: 'country' },
      ],
      separator: ', ',
    });
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
    t.deepEqual(partsGenerator(doc), {
      labelParts: [
        { label: 'Grange aux Belles Terrage', role: 'required', layer: 'name' },
        { label: 'Paris', role: 'required', layer: 'locality' },
        { label: 'Paris', role: 'optional', layer: 'region' },
        { label: 'France', role: 'required', layer: 'country' },
      ],
      separator: ', ',
    });
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
    t.deepEqual(partsGenerator(doc), {
      labelParts: [
        { label: 'Luxembourg', role: 'required', layer: 'name' },
        { label: 'Luxembourg', role: 'required', layer: 'country' },
      ],
      separator: ', ',
    });
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
    t.deepEqual(partsGenerator(doc), {
      labelParts: [
        { label: 'São Paulo', role: 'required', layer: 'name' },
        { label: 'Brazil', role: 'required', layer: 'country' },
      ],
      separator: ', ',
    });
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
    t.deepEqual(partsGenerator(doc), {
      labelParts: [
        { label: 'São Paulo', role: 'required', layer: 'name' },
        { label: 'Brazil', role: 'required', layer: 'country' },
      ],
      separator: ', ',
    });
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
    t.deepEqual(partsGenerator(doc), {
      labelParts: [
        { label: 'São Paulo', role: 'required', layer: 'name' },
        { label: 'AM', role: 'required', layer: 'region' },
        { label: 'Brazil', role: 'required', layer: 'country' },
      ],
      separator: ', ',
    });
    t.end();
  });

  test('National Gallery Singapore - WOF data format as of Feb. 2021', function(t) {
    const doc = {
      'name': { 'default': 'National Gallery Singapore'},
      'layer': 'venue',
      'locality': ['Singapore'],
      'region': ['Central Singapore'],
      'region_a': ['CS'],
      'country_a': ['SGP'],
      'country': ['Singapore']
    };
    t.equal(generator(doc),'National Gallery Singapore, Singapore');
    t.deepEqual(partsGenerator(doc), {
      labelParts: [
        { label: 'National Gallery Singapore', role: 'required', layer: 'name' },
        { label: 'Singapore', role: 'required', layer: 'country' },
      ],
      separator: ', ',
    });
    t.end();
  });

  test('Universal Studios Singapore- glorious future WOF data structure', function(t) {
    const doc = {
      'name': { 'default': 'Universal Studios Singapore'},
      'layer': 'venue',
      'neighbourhood': ['Sentosa'],
      'locality': ['Singapore'],
      'region': ['Central Singapore'],
      'region_a': ['CS'],
      'country_a': ['SGP'],
      'country': ['Singapore']
    };
    t.equal(generator(doc),'Universal Studios Singapore, Sentosa, Singapore');
    t.deepEqual(partsGenerator(doc), {
      labelParts: [
        { label: 'Universal Studios Singapore', role: 'required', layer: 'name' },
        { label: 'Sentosa', role: 'required', layer: 'neighbourhood' },
        { label: 'Singapore', role: 'required', layer: 'country' },
      ],
      separator: ', ',
    });
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
    t.deepEqual(partsGenerator(doc), {
      labelParts: [
        { label: 'Corso Duca Degli Abruzzi 71', role: 'required', layer: 'name' },
        { label: 'Torino', role: 'required', layer: 'locality'  },
        { label: 'TO', role: 'required', layer: 'region' },
        { label: 'Italia', role: 'required', layer: 'country' },
      ],
      separator: ', ',
    });
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
    t.deepEqual(partsGenerator(doc), {
      labelParts: [{ label: 'Result name', role: 'required', layer: 'name' }],
      separator: ', ',
    });
    t.end();
  });
};

// Geonames Philippines record has no admin info!
// https://github.com/pelias/api/issues/720
module.exports.tests.name_only_country = function (test, common) {
  test('name-only results (no admin fields) - Geonames Philippines', function (t) {
    var doc = {
      'name': {
        'default': 'Republic of the Philippines'
      },
      'layer': 'country'
    };
    t.equal(generator(doc), 'Republic of the Philippines');
    t.deepEqual(partsGenerator(doc), {
      labelParts: [{ label: 'Republic of the Philippines', role: 'required', layer: 'name' }],
      separator: ', ',
    });
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
