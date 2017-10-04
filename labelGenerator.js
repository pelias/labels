'use strict';

const _ = require('lodash');
const schemas = require('./labelSchema');

function dedupeNameAndFirstLabelElement(labelParts) {
  // only dedupe if a result has more than a name (the first label part)
  if (labelParts.length > 1) {
    // first, dedupe the name and 1st label array elements
    //  this is used to ensure that the `name` and first admin hierarchy elements aren't repeated
    //  eg - `["Lancaster", "Lancaster", "PA", "United States"]` -> `["Lancaster", "PA", "United States"]`
    const deduped = _.uniq([labelParts.shift(), labelParts.shift()]);
    // second, unshift the deduped parts back onto the labelParts
    labelParts.unshift.apply(labelParts, deduped);

  }

  return labelParts;

}

function dedupeNameAndLastLabelElement(labelParts) {
  // only dedupe if a result has more than a name (the first label part)
  if (labelParts.length > 1) {
    // first, dedupe the name and second to last label array elements
    //  this is used to ensure that the `name` and most granular admin hierarchy elements aren't repeated
    //  eg - `["South Korea", "Seoul", "Seoul"]` -> `["South Korea", "Seoul"]`
    const deduped = _.uniq([labelParts.pop(), labelParts.pop()]).reverse();

    // second, unshift the deduped parts back onto the labelParts
    labelParts.push.apply(labelParts, deduped);

  }

  return labelParts;

}

function getSchema(country_a) {
  if (!_.isEmpty(schemas[country_a])) {
    return schemas[country_a[0]];
  }

  return schemas.default;

}

// this can go away once geonames is no longer supported
// https://github.com/pelias/wof-admin-lookup/issues/49
function isCountry(layer) {
  return 'country' === layer;
}

function isRegion(layer) {
  return 'region' === layer;
}

function isAddress(layer) {
  return 'address' === layer;
}

function isKOR(country_a) {
  return 'KOR' === country_a;
}

function isUSAOrCAN(country_a) {
  return 'USA' === country_a || 'CAN' === country_a;
}

function isGeonamesOrWhosOnFirst(source) {
  return 'geonames' === source || 'whosonfirst' === source;

}

function isInUSAOrCAN(record) {
  return record.country_a && isUSAOrCAN(record.country_a[0]);
}

function isInKOR(record) {
  return record.country_a && isKOR(record.country_a[0]);
}

// helper function that sets a default label for non-US/CA regions and countries
function buildPrefixLabelParts(schema, record) {
  if (isRegion(record.layer) &&
    isGeonamesOrWhosOnFirst(record.source) &&
    isInUSAOrCAN(record)) {
    return [];
  }

  if (isCountry(record.layer)) {
    return [];
  }

  if (isInKOR(record)) {
    return [];
  }

  return [record.name.default];

}

function buildAdminLabelPart(schema, record) {
  let labelParts = [];

  // iterate the schema
  for (const field in schema.valueFunctions) {
    const valueFunction = schema.valueFunctions[field];
    labelParts.push(valueFunction(record));
  }

  return labelParts;
}

function buildPostfixLabelParts(schema, record) {
  if (!isInKOR(record)) {
    return [];
  }

  let labelParts = [];

  if (isAddress(record.layer)) {
    if (record.street) {
      labelParts.push(record.street);
    }
    else if (record.neighbourhood) {
      labelParts.push(record.neighbourhood);
    }
    labelParts.push(record.housenumber);

    return labelParts;
  }

  return [record.name.default];
}

module.exports = function( record ){
  const schema = getSchema(record.country_a);
  const separator = _.get(schema, ['meta','separator'], ', ');

  // in virtually all cases, this will be the `name` field
  const prefixParts = buildPrefixLabelParts(schema, record);
  const adminParts = buildAdminLabelPart(schema, record);
  const postfixParts = buildPostfixLabelParts(schema, record);

  let labelParts = _.concat(prefixParts, adminParts, postfixParts);

  // retain only things that are truthy
  labelParts = _.compact(labelParts);

  // third, dedupe and join with a comma and return
  if (isInKOR(record)) {
    labelParts = dedupeNameAndLastLabelElement(labelParts);
  }
  else {
    labelParts = dedupeNameAndFirstLabelElement(labelParts);
  }

  return labelParts.join(separator);

};
