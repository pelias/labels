const _ = require('lodash');

function isRequired(labelPart) {
  return typeof labelPart === 'string' || labelPart.role === 'required';
}

function getLabel(labelPart) {
  return typeof labelPart === 'string' ? labelPart : labelPart.label;
}

function uniq(labelParts) {
  return _.uniqWith(labelParts, (value, other) => getLabel(value) === getLabel(other));
}

module.exports = { getLabel, isRequired, uniq };
