const _ = require('lodash');

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

function nameOrAddressComponents(schema, record) {
  const labelParts = [];

  // add the address/venue components
  if (record.layer === 'address') {
    if (record.street) {
      labelParts.push(record.street);
    }
    else if (record.neighbourhood) {
      labelParts.push(record.neighbourhood);
    }
    labelParts.push(record.housenumber);

    return labelParts;
  }

  // support name aliases
  if (Array.isArray(record.name.default)) {
    return record.name.default.slice(0,1);
  }

  return [record.name.default];
}

function buildAdminLabelPart(schema, record) {
  let labelParts = [];

  // iterate the admin components in the schema
  // the order of the properties in the file determine
  // the order of elements in this arrayt
  // For Korea, we start with the country and work backwards
  for (const field in schema.valueFunctions) {
    const valueFunction = schema.valueFunctions[field];
    labelParts.push(valueFunction(record));
  }

  return labelParts;
}

// builds a complete label by combining several components
// admin parts: administrative information like city
// name or address parts: info on the actual record, like name or address
function koreaBuilder(schema, record) {

  const adminParts = buildAdminLabelPart(schema, record);
  const nameorAddressParts = nameOrAddressComponents(schema, record);

  let labelParts = _.concat(adminParts, nameorAddressParts);

  // retain only things that are truthy
  labelParts = _.compact(labelParts);

  return dedupeNameAndLastLabelElement(labelParts);
}

module.exports = koreaBuilder;
