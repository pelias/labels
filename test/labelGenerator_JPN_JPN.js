const generator = require('../labelGenerator');

module.exports.tests = {};

module.exports.tests.english_style_labels = function(test, common) {
  test('tokyo post office', function(t) {
    const doc = {
      name: { default: '東京中央郵便局' },
      layer: 'venue',
      housenumber: '2', // this is incorrect but it's what we currently pull from OSM
      locality: ['東京'],
      county: ['千代田'],
      region: ['東京'],
      region_a: ['TK'], // should not be used
      postalcode: ['100-0005'],
      country_a: ['JPN'], // should not be used
      country: ['日本'], // should not be used (though this is up for debate)
      continent: ['アジア'], // should not be used
    };

    const expected = '〒100-0005 ' + // postalcode with postal mark, plus a space (would be a newline on an envelope)
      '東京' + // region, tokyo-to
      '千代田' + // county, chyoda ward
      '東京' + // locality, tokyo
      '2 ' + // housenumber plus space to separate venue name
      '東京中央郵便局'; // venue name: 'Tokyo Central Post Office'
    t.equal(generator(doc, 'JPN'), expected);
    t.end();
  });

  test('tokyo address from OA', function(t) {
    const doc = {
      name: { default: '7-9 丸の内二丁目' },
      layer: 'address',
      housenumber: '7-9',
      street: '丸の内二丁目', // Marunouchi 2-chome
      borough: ['千代田区'], // Chiyoda Ward
      locality: ['東京'], // Tokyo
      county: ['千代田'], // Chiyoda
      region: ['東京'], // Tokyo (should really be 東京都 for Tokyo-to)
      region_a: ['TK'],
      country: ['日本'], // Japan
      country_a: ['JPN'],
      continent: ['アジア'], // Asia
    };

    const expected = '' + // no postalcode for this record
      '東京' + // prefecture (region), tokyo
      '千代田' + // county, chyoda
      '東京' + // designated city (locality), tokyo
      '千代田区' + // ward (borough), chiyoda ward
      '丸の内二丁目' + // district (street), Marunouchi 2-chome
      '7番9号'; // "bango" (block and building number)
    t.equal(generator(doc, 'JPN'), expected);
    t.end();
  });

  test('Shizuoka (smaller city near Tokyo) example from OA', function(t) {
    const doc = {
      name: { default: '331-8 中原' },
      layer: 'address',
      housenumber: '331-8',
      street: '中原',
      // we should ideally have lower level admin info here, but we don't as of this writing
      locality: ['静岡市'],
      county: ['静岡'],
      region: ['東京'], // Tokyo (should really be 東京都 for Tokyo-to)
      region_a: ['SZ'],
      country: ['日本'],
      country_a: ['JPN'],
      continent: ['アジア'],
    };

    const expected = '' + // no postalcode for this record
      '東京' + // prefecture (region), tokyo
      '静岡' + // city (county), Shizuoka
      '静岡市' + // designated city (locality), Shizuoka-shi
      '中原' + // chome/ward (street), Nakahara
      '331番8号'; // "bango" (block and building number)
    t.equal(generator(doc, 'JPN'), expected);
    t.end();
  });

  test('address in Sapporo from OA', function(t) {
    const doc = {
      name: { default: '2-12 北二十四条西四丁目' },
      layer: 'address',
      housenumber: '2-12',
      street: '北二十四条西四丁目',
      locality: ['札幌市'],
      county: ['札幌'],
      region: ['北海'],
      region_a: ['HK'],
      country: ['日本'],
      country_a: ['JPN'],
      continent: ['アジア'],
    };
    const expected = '' + // no postalcode for this record
      '北海' + // prefecture (region), Hokkaido Prefecture
      '札幌' + // city (county), Sapporo
      '札幌市' + // designated city (locality), Sapporo-shi
      '北二十四条西四丁目' + // chome/ward (street)
      '2番12号'; // "bango" (block and building number)

    t.equal(generator(doc, 'JPN'), expected);
    t.end();
  });

  test('address outside of a designated city', function(t) {
    const doc = {
      name: { default: '1059-2 大崎' },
      layer: 'address',
      housenumber: '1059-2',
      street: '大崎',
      county: ['小郡市'],
      region: ['福岡'],
      region_a: ['FO'],
      country: ['日本'],
      country_a: ['JPN'],
      continent: ['アジア'],
    };

    const expected = '' + // no postalcode for this record
      '福岡' + // prefecture (region), Fukuoka Prefecture
      '小郡市' + // city (county), Ogori
      '大崎' + // chome/ward (street), Osaki
      '1059番2号'; // "bango" (block and building number)
    t.equal(generator(doc, 'JPN'), expected);
    t.end();
  });

  test('neighbourhood admin area', function(t) {
    const doc = {
      name: { default: '９丁目' },
      layer: 'neighbourhood',
      neighbourhood: ['９丁目'],
      locality: ['世田谷区'],
      county: ['世田谷区'],
      region: ['東京'],
      region_a: ['TK'],
      country: ['日本'],
      country_a: ['JPN'],
      continent: ['アジア'],
    };

    const expected = '東京' + // prefecture (region), Tokyo
      '世田谷区' + // city (county), Setagaya
      '世田谷区' + // designated city (locality), Setagaya
      '９丁目';  // ward (neighbourhoood)

    t.equal(generator(doc, 'JPN'), expected);
    t.end();
  });
};

module.exports.all = function (tape, common) {
  function test(name, testFunction) {
    return tape('label generator (JPN, 日本ese language): ' + name, testFunction);
  }

  for( let testCase in module.exports.tests ){
    module.exports.tests[testCase](test, common);
  }
};
