const generator = require('../labelGenerator');

module.exports.tests = {};

module.exports.tests.english_style_labels = function(test, common) {
  test('tokyo post office', function(t) {
    const doc = {
      name: { default: 'Tokyo Central Post Office' },
      layer: 'venue',
      housenumber: '2',
      borough: ['Chiyoda'],
      locality: ['Tokyo'],
      county: ['Chiyoda'],
      region: ['Tokyo'],
      region_a: ['TK'],
      postalcode: ['100-0005'],
      country_a: ['JPN'],
      country: ['Japan'],
      continent: ['Asia'],
    };
    t.equal(generator(doc),'Tokyo Central Post Office, Chiyoda, Tokyo, 100-0005, Japan');
    t.end();
  });

  test('tokyo address from OA', function(t) {
    const doc = {
      name: { default: '7-9 丸の内二丁目' },
      layer: 'address',
      housenumber: '7-9',
      neighbourhood: ['Marunochi 2 Chome'],
      borough: ['Chiyoda'],
      locality: ['Tokyo'],
      county: ['Chiyoda'],
      region: ['Tokyo'],
      region_a: ['TK'],
      country: ['Japan'],
      country_a: ['JPN'],
      continent: ['Asia'],
    };
    t.equal(generator(doc),'7-9 丸の内二丁目, Marunochi 2 Chome, Chiyoda, Tokyo, Japan');
    t.end();
  });

  test('Shizuoka (smaller city near Tokyo) example from OA', function(t) {
    const doc = {
      name: { default: '331-8 中原' },
      layer: 'address',
      housenumber: '331-8',
      street: '中原',
      // we should ideally have lower level admin info here, but we don't as of this writing
      locality: ['Shizuoka-shi'],
      county: ['Shizuoka'],
      region: ['Shizuoka Prefecture'],
      region_a: ['SZ'],
      country: ['Japan'],
      country_a: ['JPN'],
      continent: ['Asia'],
    };
    t.equal(generator(doc),'331-8 中原, Shizuoka-shi, Japan');
    t.end();
  });

  test('address in Sapporo from OA', function(t) {
    const doc = {
      name: { default: '2-12 北二十四条西四丁目' },
      layer: 'address',
      housenumber: '2-12',
      street: '北二十四条西四丁目',
      locality: ['Sapporo-shi'],
      county: ['Sapporo'],
      region: ['Hokkaido Prefecture'],
      region_a: ['HK'],
      country: ['Japan'],
      country_a: ['JPN'],
      continent: ['Asia'],
    };
    t.equal(generator(doc),'2-12 北二十四条西四丁目, Sapporo-shi, Hokkaido Prefecture, Japan');
    t.end();
  });

  test('address outside of a designated city', function(t) {
    const doc = {
      name: { default: '1059-2 大崎' },
      layer: 'address',
      housenumber: '1059-2',
      street: '大崎',
      county: ['Ogori'],
      region: ['Fukuoka Prefecture'],
      region_a: ['FO'],
      country: ['Japan'],
      country_a: ['JPN'],
      continent: ['Asia'],
    };
    t.equal(generator(doc),'1059-2 大崎, Ogori, Fukuoka Prefecture, Japan');
    t.end();
  });

  test('neighbourhood admin area', function(t) {
    const doc = {
      name: { default: '９丁目' },
      layer: 'neighbourhood',
      neighbourhood: ['９丁目'],
      locality: ['Umegaoka'],
      county: ['Setagaya'],
      region: ['Tokyo'],
      region_a: ['TK'],
      country: ['Japan'],
      country_a: ['JPN'],
      continent: ['Asia'],
    };
    t.equal(generator(doc),'９丁目, Umegaoka, Setagaya, Tokyo, Japan');
    t.end();
  });
};

module.exports.all = function (tape, common) {
  function test(name, testFunction) {
    return tape('label generator (JPN): ' + name, testFunction);
  }

  for( let testCase in module.exports.tests ){
    module.exports.tests[testCase](test, common);
  }
};
