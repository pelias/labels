const _ = require('lodash');
const labelUtils = require('../labelUtils');

function buildPrimaryName(schema, record) {
  if (Array.isArray(record.name.default)) {
    return [{ label: record.name.default[0], role: 'required', layer: 'name' }];
  }

  return [{ label: record.name.default, role: 'required', layer: 'name' }];
}

// create a "normalized" version of a Japanese address part
// do this by removing some portions of an admin area that should
// otherwise be ignored for deduplication, like the "prefecture" suffix
function normalizeJapaneseAdmin(input) {
  const lower = labelUtils.getLabel(input).toLowerCase();
  return lower
              .replace(/^(.*)-shi$/i, '$1')
              .replace(/^(.*)\sprefecture$/i, '$1');
}

function buildAdminLabelPart(schema, record) {
  let labelParts = [];

  // iterate the admin components in the schema
  // the order of the properties in the file determine
  // the order of elements in this array
  for (const field in schema.valueFunctions) {
    const valueFunction = schema.valueFunctions[field];
    const newName = valueFunction(record);

    //check if this new name is a duplicate of any others, accounting for normalization
    if (newName && !_.some(labelParts, (value) => normalizeJapaneseAdmin(value) === normalizeJapaneseAdmin(newName))) {
      labelParts.push(newName);
    }
  }

  return labelParts;
}

// builds a complete label by combining several components
// the parts generally follow this format
// name: the venue name or address
// admin: administrative information like city
function japanBuilder(schema, record) {

  const nameParts = buildPrimaryName(schema, record);
  const adminParts = buildAdminLabelPart(schema, record);

  let labelParts = _.concat(nameParts, adminParts);

  // retain only things that are truthy
  labelParts =  _.compact(labelParts);

  // remove exact duplicates or admin areas will have their name twice
  labelParts = labelUtils.uniq(labelParts);

  return labelParts;
}

module.exports = japanBuilder;
