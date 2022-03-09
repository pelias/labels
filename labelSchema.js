var _ = require('lodash');
const removeAccents = require('remove-accents');

// lowercase characters and remove some punctuation
function normalizeString(str){
  if (!str) {
    return '';
  }
  return removeAccents(str.toLowerCase().split(/[ ,-]+/).join(' '));
}

// French Guiana, Guadeloupe, Martinique, Reunion, Mayotte
const FRA_OVERSEAS = ['GF', 'GP', 'MQ', 'RE', 'YT'];

// find the first field of record that has a non-empty value that's not already in labelParts
function getFirstProperty(fields) {
  return function(record) {
    for (var i = 0; i < fields.length; i++) {
      var fieldValue = record[fields[i]];

      if (!_.isEmpty(fieldValue)) {
        return fieldValue[0];
      }

    }

  };

}

// this function is exclusively used for figuring out which field to use for states/provinces
// 1.  if the record belongs to a dependency, skip the region, eg - San Juan, PR
// 2.  if a state/province is the most granular bit of info entered, the label should contain
//  the full state/province name, eg: Pennsylvania, USA and Ontario, CA
// 3.  otherwise, the state/province abbreviation should be used, eg: Lancaster, PA, USA and Bruce, ON, CA
// 4.  if the abbreviation isn't available, use the full state/province name
function getRegionalValue(record) {
  if (!_.isEmpty(record.dependency) || !_.isEmpty(record.dependency_a)) {
    return;
  }

  if ('region' === record.layer && !_.isEmpty(record.region)) {
    // return full state name when state is the most granular piece of info
    return record.region[0];

  } else if (!_.isEmpty(record.region_a)) {
    // otherwise just return the region code when available
    return record.region_a[0];

  } else if (!_.isEmpty(record.region)) {
    // return the full name when there's no region code available
    return record.region[0];
  }
}

// The same as getRegionalValue above, but only returns a region if the region name
// is distinct from the locality/localadmin/city name
// This works best for large cities in countries where the region name/abbr is not _always_ included in the label
function getUniqueRegionalValue(record) {
  if (!_.isEmpty(record.dependency) || !_.isEmpty(record.dependency_a)) {
    return;
  }

  // handle the region value where this record itself is a region
  if ('region' === record.layer) {
    if (!_.isEmpty(record.region)) {
    // return full state name when state is the most granular piece of info
    return record.region[0];
    }
  } else {
    const localityValue = getFirstProperty(['locality', 'localadmin'])(record);

    if (record.region && normalizeString(localityValue) === normalizeString(record.region[0])) {
      // skip returning anything when the region and locality name are identical
      // This handles major cities in their own region like Berlin, Tokyo, Paris, Sao Paulo, etc
      return;
    }

    // prefer the region abbreviation, fall back to the region name if no abbreviation
    if (!_.isEmpty(record.region_a)) {
      return record.region_a[0];
    } else if (!_.isEmpty(record.region)) {
      return record.region[0];
    }
  }
}

// this function generates the last field of the labels for US records
// 1.  use dependency name if layer is dependency, eg - Puerto Rico
// 2.  use country name if layer is country, eg - United States
// 3.  use dependency abbreviation if applicable, eg - San Juan, PR
// 4.  use dependency name if no abbreviation, eg - San Juan, Puerto Rico
// 5.  use country abbreviation, eg - Lancaster, PA, USA
function getUSADependencyOrCountryValue(record) {
  if ('dependency' === record.layer && !_.isEmpty(record.dependency)) {
    return record.dependency[0];
  } else if ('country' === record.layer && !_.isEmpty(record.country)) {
    return record.country[0];
  }

  if (!_.isEmpty(record.dependency_a)) {
    return record.dependency_a[0];
  } else if (!_.isEmpty(record.dependency)) {
    return record.dependency[0];
  }

  return record.country_a[0];
}

// this function generates the last field of the labels for FRA records
// 1.  use the region name if the record is a in the French overseas, eg - Saint-Denis, Reunion
// 2.  use dependency name if not null
// 3.  use country name, eg - Paris, France
function getFRACountryValue() {
  const _overseas = getFirstProperty(['region', 'dependency', 'country']);
  const _default = getFirstProperty(['dependency', 'country']);
  return (record) => {
    if (!_.isEmpty(record.region_a) && _.includes(FRA_OVERSEAS, record.region_a[0])) {
      return _overseas(record);
    }
    return _default(record);
  };
}

function isInNYC(record) {
  const _region_a = getFirstProperty(['region_a'])(record);
  const _country_a = getFirstProperty(['country_a'])(record);
  const _locality_a = getFirstProperty(['locality_a'])(record);

  return _country_a === 'USA' && _region_a === 'NY' && _locality_a === 'NYC';
}

function getUSABoroughValue(record) {
  // In NYC, the borough is used as the locality name on address lines
  // (except in Queens, see below), so don't return a borough at all
  // in NYC if there's a locality value to return
  if (isInNYC(record) && getUSALocalValue(record)) {
    // Ignore the borough, it's handled in getUSALocalValue
    return undefined;
  }

  return getFirstProperty(['borough'])(record);
}

// NYC is special for addresses
// - The borough is used for the locality in addresses
// - Except in Queens, where ideally the neighbourhood is
// - Also, 'New York' is the proper locality name for Manhattan
function getNYCLocalValue(record) {
  const _default = getFirstProperty(['locality', 'localadmin', 'county'])(record);
  const _borough = getFirstProperty(['borough'])(record);
  const _neighbourhood = getFirstProperty(['neighbourhood'])(record);
  // We still want to return "neighborhood, borough, region_a" when a user searches for a neighborhood
  // otherwise it looks incomplete, so skip to returning the borough in that case
  // Otherwise, in Queens only, use the neighborhood for the city in address labels
  if ('neighbourhood' !== record.layer &&
    _borough &&
    _borough.startsWith('Queens') &&
    _neighbourhood
  ) {
    return _neighbourhood;
  } else if (_borough &&
    _borough.startsWith('Manhattan')
  ) {
    // return 'Manhattan, New York, for Manhattan neighbourhoods
    if (record.layer === 'neighbourhood') {
      return `${_borough}, ${_default}`;
    // return only locality for Manhattan venues/addresses
    } else{
      return _default;
    }
  } else {
    return _borough || _default;
  }
}

function getUSALocalValue(record) {
  const _default = getFirstProperty(['locality', 'localadmin', 'county'])(record);

  // NYC is special for addresses
  if (isInNYC(record)) {
    return getNYCLocalValue(record);
  }

  return _default;
}

module.exports = {
  'default': {
    'valueFunctions': {
      'local': getFirstProperty(['locality', 'localadmin']),
      'regional': getUniqueRegionalValue,
      'country': getFirstProperty(['dependency', 'country'])
    }
  },
  'GBR': {
    'valueFunctions': {
      'local': getFirstProperty(['locality', 'localadmin']),
      'regional': getFirstProperty(['macroregion']),
      'country': getFirstProperty(['dependency', 'country'])
    }
  },
  'USA': {
    'valueFunctions': {
      'borough': getUSABoroughValue,
      'local': getUSALocalValue,
      'regional': getRegionalValue,
      'country': getUSADependencyOrCountryValue
    }
  },
  'AUS': {
    'valueFunctions': {
      'local': getFirstProperty(['locality', 'localadmin']),
      'regional': getRegionalValue,
      'country': getFirstProperty(['dependency', 'country'])
    }
  },
  'CAN': {
    'valueFunctions': {
      'local': getFirstProperty(['locality']), // no localadmins in CAN
      'regional': getRegionalValue,
      'country': getFirstProperty(['country'])
    }
  },
  'KOR': {
    'valueFunctions': {
      'country': getFirstProperty(['country']),
      'province': getFirstProperty(['region']),
      'city': getFirstProperty(['county'])
    },
    'meta': {
      'separator': ' ',
      'builder': require('./builders/KOR')
    }
  },
  'FRA': {
    'valueFunctions': {
      'local': getFirstProperty(['locality', 'localadmin']),
      'country': getFRACountryValue()
    }
  },
  'ITA': {
    'valueFunctions': {
      'local': getFirstProperty(['locality', 'localadmin']),
      'regional': getRegionalValue,
      'country': getFirstProperty(['country'])
    }
  },
  'SGP': {
    'valueFunctions': {
      'local': getFirstProperty(['microhood', 'neighbourhood']),
      'country': getFirstProperty(['country'])
    }
  },
};
