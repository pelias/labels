const generator = require('../labelGenerator');
const partsGenerator = require('../labelGenerator').partsGenerator;

module.exports.tests = {};

module.exports.tests.interface = function(test, common) {
  test('interface', function(t) {
    t.equal(typeof generator, 'function', 'valid function');
    t.end();
  });
};

module.exports.tests.south_korea = function(test, common) {
  test('venue', function(t) {
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
      'country_a': ['KOR'],
      'country': ['South Korea']
    };
    t.equal(generator(doc),'South Korea region name county name venue name');
    t.deepEqual(partsGenerator(doc), {
      labelParts: [
        { label: 'South Korea', role: 'required', layer: 'country' },
        { label: 'region name', role: 'required', layer: 'region' },
        { label: 'county name', role: 'required', layer: 'county' },
        { label: 'venue name', role: 'required', layer: 'name' },
      ],
      separator: ' ',
    });
    t.end();
  });

  test('address', function(t) {
    var doc = {
      'name': { 'default': '123 street name' },
      'layer': 'address',
      'housenumber': '123',
      'street': 'street name',
      'county': ['county name'],
      'region': ['region name'],
      'country_a': ['KOR'],
      'country': ['South Korea']
    };
    t.equal(generator(doc),'South Korea region name county name street name 123');
    t.deepEqual(partsGenerator(doc), {
      labelParts: [
        { label: 'South Korea', role: 'required', layer: 'country' },
        { label: 'region name', role: 'required', layer: 'region' },
        { label: 'county name', role: 'required', layer: 'county' },
        { label: 'street name', role: 'required', layer: 'street' },
        { label: '123', role: 'required', layer: 'housenumber' },
      ],
      separator: ' ',
    });
    t.end();
  });

  test('address should always use county even if locality and localadmin are available', function(t) {
    var doc = {
      'name': { 'default': 'house number street name' },
      'layer': 'address',
      'housenumber': '123',
      'street': 'street name',
      'neighbourhood': ['neighbourhood name'],
      'localadmin': ['localadmin name'],
      'county': ['county name'],
      'region': ['region name'],
      'country_a': ['KOR'],
      'country': ['South Korea']
    };
    t.equal(generator(doc),'South Korea region name county name street name 123');
    t.deepEqual(partsGenerator(doc), {
      labelParts: [
        { label: 'South Korea', role: 'required', layer: 'country' },
        { label: 'region name', role: 'required', layer: 'region' },
        { label: 'county name', role: 'required', layer: 'county' },
        { label: 'street name', role: 'required', layer: 'street' },
        { label: '123', role: 'required', layer: 'housenumber' },
      ],
      separator: ' ',
    });
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
      'region': ['region name'],
      'country_a': ['KOR'],
      'country': ['South Korea']
    };
    t.equal(generator(doc),'South Korea region name county name neighbourhood name');
    t.deepEqual(partsGenerator(doc), {
      labelParts: [
        { label: 'South Korea', role: 'required', layer: 'country' },
        { label: 'region name', role: 'required', layer: 'region' },
        { label: 'county name', role: 'required', layer: 'county' },
        { label: 'neighbourhood name', role: 'required', layer: 'name' }
      ],
      separator: ' ',
    });
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
    t.equal(generator(doc),'South Korea region name county name locality name');
    t.deepEqual(partsGenerator(doc), {
      labelParts: [
        { label: 'South Korea', role: 'required', layer: 'country' },
        { label: 'region name', role: 'required', layer: 'region' },
        { label: 'county name', role: 'required', layer: 'county' },
        { label: 'locality name', role: 'required', layer: 'name' },
      ],
      separator: ' ',
    });
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
    t.equal(generator(doc),'South Korea region name county name localadmin name');
    t.deepEqual(partsGenerator(doc), {
      labelParts: [
        { label: 'South Korea', role: 'required', layer: 'country' },
        { label: 'region name', role: 'required', layer: 'region' },
        { label: 'county name', role: 'required', layer: 'county' },
        { label: 'localadmin name', role: 'required', layer: 'name' },
      ],
      separator: ' ',
    });
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
    t.deepEqual(partsGenerator(doc), {
      labelParts: [
        { label: 'South Korea', role: 'required', layer: 'country' },
        { label: 'region name', role: 'required', layer: 'region' },
        { label: 'county name', role: 'required', layer: 'name' },
      ],
      separator: ' ',
    });
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
    t.deepEqual(partsGenerator(doc), {
      labelParts: [
        { label: 'South Korea', role: 'required', layer: 'country' },
        { label: 'region name', role: 'required', layer: 'name' },
      ],
      separator: ' ',
    });
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
    t.deepEqual(partsGenerator(doc), {
      labelParts: [{ label: 'South Korea', role: 'required', layer: 'name' }],
      separator: ' ',
    });
    t.end();
  });

  test('full address', function (t) {
    var doc = {
      'layer': 'address',
      'name': { 'default': '27 모세로' },
      'label': ['한국 서울 모세로 27'],
      'county': ['용산구'],
      'continent': ['아시아'],
      'housenumber': '27',
      'postalcode': ['14230'],
      'region': ['서울'],
      'country_a': ['KOR'],
      'neighbourhood': ['구로본동'],
      'locality': ['서울'],
      'street': '모세로',
      'country': ['한국']
    };
    t.equal(generator(doc),'한국 서울 용산구 모세로 27');
    t.deepEqual(partsGenerator(doc), {
      labelParts: [
        { label: '한국', role: 'required', layer: 'country' },
        { label: '서울', role: 'required', layer: 'region' },
        { label: '용산구', role: 'required', layer: 'county' },
        { label: '모세로', role: 'required', layer: 'street' },
        { label: '27', role: 'required', layer: 'housenumber' },
      ],
      separator: ' ',
    });
    t.end();
  });

  test('support name aliases', function(t) {
    const doc = {
      'name': { 'default': ['name1', 'name2'] },
      'layer': 'venue',
      'country_a': ['KOR'],
      'country': ['한국']
    };
    t.equal(generator(doc), '한국 name1');
    t.deepEqual(partsGenerator(doc), {
      labelParts: [
        { label: '한국', role: 'required', layer: 'country' },
        { label: 'name1', role: 'required', layer: 'name' },
      ],
      separator: ' ',
    });
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
