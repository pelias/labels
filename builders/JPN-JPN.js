const _ = require('lodash');

// get the value of a scalar, or the first element of an array if an array is passed
function scalarOrFirstElement(param) {
  return _.isArray(param) ? param[0] : param;
}

function formatPostalCode(record) {
  if (record.postalcode) {
    return { label: '〒' + record.postalcode, role: 'required', layer: 'postalcode' };
  }
}

function buildAdminLabelPart(schema, record) {
  let labelParts = [];

  // iterate the admin components in the schema
  // the order of the properties in the file determine
  // the order of elements in this array
  for (const field in schema.valueFunctions) {
    const valueFunction = schema.valueFunctions[field];

    labelParts.push(valueFunction(record));
  }

  return labelParts;
}

// generally, our data from OA contains the 'chome' or district (similar to a neighbourhood)
// in the street field, even though it really is not a street at all
// detect this case and then return the street value
function formatDistrictPart(record) {
  if (scalarOrFirstElement(record.name.default).includes(record.street)) {
    return { label: record.street, role: 'required', layer: 'neighbourhood' };
  }
}

// check for records with a standard Japanese building and block number in the housenumber field
// these consist of two sets of numbers separated by a -
// for Japanese format language, reformat them with the "番号" or "bango" characters
function formatBlockPart(record) {
  const bangoRegex = new RegExp(/(\d+)-(\d+)/);

  const match = bangoRegex.exec(record.housenumber);
  if (match) {
    return { label: `${match[1]}番${match[2]}号`, role: 'required', layer: 'housenumber' };
  }

  return record.housenumber && { label: record.housenumber, role: 'required', layer: 'housenumber' };
}

function venueName(record) {
  if (record.layer !== 'venue') {
    return;
  }
  const label = scalarOrFirstElement(record.name.ja) || scalarOrFirstElement(record.name.default);

  return { label, role: 'required', layer: 'name' };
}

// builds a complete label by combining several components
// first, the postalcode if it exists, prefixed by the postal mark
// second, administrative information like city
// third, street/block level info if it exists, formatted as correctly as possible
// finally, the venue name if it exists
function japanBuilder(schema, record) {

  const postalcode = formatPostalCode(record);
  const admin = buildAdminLabelPart(schema, record);
  const distric = formatDistrictPart(record);
  const block = formatBlockPart(record);
  const venue = venueName(record);

  // combine components, inserting a space between the postalcode, admin, and name sections
  // when written on an envelope these would correspond to new lines, a space should help with some clarity
  let labelParts = _.concat(postalcode, ' ', admin, distric, block, ' ', venue);

  // retain only things that are truthy
  labelParts =  _.compact(labelParts);

  return labelParts;
}

module.exports = japanBuilder;
