> This repository is part of the [Pelias](https://github.com/pelias/pelias) project. Pelias is an open-source, open-data geocoder built by [Mapzen](https://www.mapzen.com/) that also powers [Mapzen Search](https://mapzen.com/projects/search). Our official user documentation is [here](https://mapzen.com/documentation/search/).

# Pelias Labels

![Travis CI Status](https://travis-ci.org/pelias/labels.svg)
[![Gitter Chat](https://badges.gitter.im/pelias/pelias.svg)](https://gitter.im/pelias/pelias?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

## Overview

Module that generates labels for Pelias search and geocoding results

## Installation

```bash
$ npm install pelias-labels
```

[![NPM](https://nodei.co/npm/pelias-labels.png?downloads=true&stars=true)](https://nodei.co/npm/pelias-labels)

## NPM Module

The `pelias-labels` npm module can be found here:

[https://npmjs.org/package/pelias-labels](https://npmjs.org/package/pelias-labels)

#### About

The Pelias Labels module is intended to be used a post-processing step that generates a rules-based label for Pelias search and geocoding results.  There are generic label assembly rules for all but the [United Kingdom](https://whosonfirst.mapzen.com/spelunker/id/85633159/#4/55.76/-5.96), the [United States](https://whosonfirst.mapzen.com/spelunker/id/85633793/#2/52.3/0.3), [Australia](https://whosonfirst.mapzen.com/spelunker/id/85632793/#3/-27.80/136.02), and [Canada](https://whosonfirst.mapzen.com/spelunker/id/85633041/#2/71.3/-96.8), which have specific rules.  

#### Examples

The first example is for an address in New York City.  

```{
  name: '30 West 26th Street',
  house_number: '30',
  street: 'West 26th Street',
  borough: 'Manhattan',
  locality: 'New York City',
  county: 'New York County',
  region: 'New York',
  region_a: 'NY',
  country: 'United States',
  country_a: 'USA'
}```

The label uses the name, borough, locality, region, and country, resulting in: `30 West 26th Street, Manhattan, New York City, NY, USA`

This next example is for a city in a dependency of the United States.

```{
  locality: 'San Juan',
  dependency: 'Puerto Rico',
  dependency_a: 'PR',
  country: 'United States',
  country_a: 'USA'
}```

Addresses and places in dependencies don't normally include the country, resulting in: `San Juan, PR`

The final example is for a neighbourhood in Paris.

```{
  neighbourhood: 'Grange aux Belles Terrage',
  locality: 'Paris',
  county: 'Paris-7E-Arrondissement',
  macrocounty: 'Paris-1Er-Arrondissement',
  region: 'Paris',
  macroregion: 'Île-De-France',
  country: 'France',
  country_a: 'FR'
}```

Regions aren't normally included in France labels, so the label for this would be: `Grange aux Belles Terrage, Paris, France`

#### Configuration

There are no configuration options at this time.  

## Contributing

This module should be a starting point for contributing to Pelias for those with specific knowledge of how addresses and places are formatted in a specific country.  `labelSchemas.js` exports a map keyed by ISO3 country code, so country-specific rules should be added there.  
