const _ = require('lodash');

const schemas = require('./labelSchema');

module.exports = function getSchema(record, language) {
  if (_.isEmpty(record)) { return schemas.default; }
  if (_.isEmpty(record.country_a)) { return schemas.default; }

  // handle either array or scalar country codes, normalizing to upper case
  const country_code_value = _.isArray(record.country_a) ? record.country_a[0] : record.country_a;
  const country_code = _.isString(country_code_value) ? country_code_value.toUpperCase() : undefined;

  const language_code = _.isString(language) ? language.toUpperCase() : undefined;

  const schema = _.get(schemas[country_code], `languages.${language_code}`) || schemas[country_code] || schemas.default;

  return schema;
};
