const _ = require('lodash');

const getSchema = require('./getSchema');
const labelUtils = require('./labelUtils');

function dedupeNameAndFirstLabelElement(labelParts) {
  // only dedupe if a result has more than a name (the first label part)
  if (labelParts.length > 1) {
    // first, dedupe the name and 1st label array elements
    //  this is used to ensure that the `name` and first admin hierarchy elements aren't repeated
    //  eg - `["Lancaster", "Lancaster", "PA", "United States"]` -> `["Lancaster", "PA", "United States"]`
    //  we take the first part because the layer should be the name and is required
    if (labelUtils.getLabel(labelParts[0]) === labelUtils.getLabel(labelParts[1])) {
      const first = labelParts.shift();
      labelParts[0] = first;
    }

  }

  return labelParts;
}

function getLanguage(language) {
  if (!_.isString(language)) { return; }

  return language.toUpperCase();
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

function isUSAOrCAN(country_a) {
  return 'USA' === country_a || 'CAN' === country_a;
}

function isGeonamesOrWhosOnFirst(source) {
  return 'geonames' === source || 'whosonfirst' === source;

}

function isInUSAOrCAN(record) {
  return record.country_a && isUSAOrCAN(record.country_a[0]);
}

// helper function that sets a default label for non-US/CA regions and countries
function buildPrefixLabelParts(schema, record) {
  if (isRegion(record.layer) &&
    isGeonamesOrWhosOnFirst(record.source) &&
    isInUSAOrCAN(record)) {
    return [];
  }

  if (isCountry(record.layer) && !_.isEmpty(record.country)) {
    return [];
  }

  const street = [];
  if (record.layer === 'venue' && record.street) {
    const label = Array.isArray(record.street) ? record.street[0] : record.street;
    street.push({ label, role: 'optional', layer: 'street' });
  }

  // support name aliases
  if (Array.isArray(record.name.default)) {
    return _.concat({ label: record.name.default[0], role: 'required', layer: 'name' }, street);
  }

  return _.concat({ label: record.name.default, role: 'required', layer: 'name' }, street);

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

// builds a complete label by combining several components
// the parts generally follow this format
// prefix parts: the venue name or address
// admin parts: administrative information like city
function defaultBuilder(schema, record) {

  // in virtually all cases, this will be the `name` field
  const prefixParts = buildPrefixLabelParts(schema, record);
  const adminParts = buildAdminLabelPart(schema, record);

  let labelParts = _.concat(prefixParts, adminParts);

  // retain only things that are truthy
  labelParts =  _.compact(labelParts);
  return dedupeNameAndFirstLabelElement(labelParts);
}

function generator( record, language ) {
  const schema = getSchema(record, language);
  const separator = _.get(schema, ['meta','separator'], ', ');
  const builder = _.get(schema, ['meta', 'builder'], defaultBuilder);

  let labelParts = builder(schema, record);

  return { labelParts, separator };
}

module.exports = function( record, language ) {
  const { labelParts, separator } = generator(record, language);
  const label = labelParts
    .filter(labelUtils.isRequired)
    .map(labelUtils.getLabel)
    .join(separator);

  return _.trim(label);
};

module.exports.partsGenerator = generator;
