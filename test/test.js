var tape = require('tape');
var diff = require('difflet')({ indent : 2, comment : true });

var common = {
  // a visual deep diff rendered using console.error()
  diff: function( actual, expected ){
    console.error( diff.compare( actual, expected ) );
  }
};

var tests = [
  require ('./labelGenerator_AUS'),
  require ('./labelGenerator_CAN'),
  require ('./labelGenerator_default'),
  require ('./labelGenerator_examples'),
  require ('./labelGenerator_GBR'),
  require ('./labelGenerator_USA'),
  require ('./labelGenerator_KOR'),
  require ('./labelGenerator_JPN'),
  require ('./labelGenerator_FRA'),
  require ('./getSchema'),
  require ('./labelSchema')
];

tests.map(function(t) {
  t.all(tape, common);
});
