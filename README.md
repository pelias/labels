<p align="center">
  <img height="100" src="https://raw.githubusercontent.com/pelias/design/master/logo/pelias_github/Github_markdown_hero.png">
</p>
<h3 align="center">A modular, open-source search engine for our world.</h3>
<p align="center">Pelias is a geocoder powered completely by open data, available freely to everyone.</p>
<p align="center">
<a href="https://github.com/pelias/labels/actions"><img src="https://github.com/pelias/labels/workflows/Continuous%20Integration/badge.svg" /></a>
<a href="https://en.wikipedia.org/wiki/MIT_License"><img src="https://img.shields.io/github/license/pelias/labels?style=flat&color=orange" /></a>
<a href="https://gitter.im/pelias/pelias"><img src="https://img.shields.io/gitter/room/pelias/pelias?style=flat&color=yellow" /></a>
</p>
<p align="center">
	<a href="https://github.com/pelias/docker">Local Installation</a> ·
        <a href="https://geocode.earth">Cloud Webservice</a> ·
	<a href="https://github.com/pelias/documentation">Documentation</a> ·
	<a href="https://gitter.im/pelias/pelias">Community Chat</a>
</p>
<details open>
<summary>What is Pelias?</summary>
<br />
Pelias is a search engine for places worldwide, powered by open data. It turns addresses and place names into geographic coordinates, and turns geographic coordinates into places and addresses. With Pelias, you're able to turn your users' place searches into actionable geodata and transform your geodata into real places.
<br /><br />
We think open data, open source, and open strategy win over proprietary solutions at any part of the stack and we want to ensure the services we offer are in line with that vision. We believe that an open geocoder improves over the long-term only if the community can incorporate truly representative local knowledge.
</details>

# Pelias Labels

![Continuous Integration](https://github.com/pelias/labels/workflows/Continuous%20Integration/badge.svg)

## Overview

Module that generates labels for Pelias search and geocoding results

## Installation

```bash
$ npm install pelias-labels
```

## NPM Module

The `pelias-labels` npm module can be found here:

[https://npmjs.org/package/pelias-labels](https://npmjs.org/package/pelias-labels)

#### About

The Pelias Labels module is intended to be used a post-processing step that generates a rules-based label for Pelias search and geocoding results.  There are generic label assembly rules for all but the [United Kingdom](https://whosonfirst.mapzen.com/spelunker/id/85633159/#4/55.76/-5.96), the [United States](https://whosonfirst.mapzen.com/spelunker/id/85633793/#2/52.3/0.3), [Australia](https://whosonfirst.mapzen.com/spelunker/id/85632793/#3/-27.80/136.02), and [Canada](https://whosonfirst.mapzen.com/spelunker/id/85633041/#2/71.3/-96.8), which have specific rules.  

#### Examples

The first example is for an address in New York City.  

```
{
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
}
```

The label uses the name, borough, locality, region, and country, resulting in: `30 West 26th Street, Manhattan, New York City, NY, USA`

This next example is for a city in a dependency of the United States.

```
{
  locality: 'San Juan',
  dependency: 'Puerto Rico',
  dependency_a: 'PR',
  country: 'United States',
  country_a: 'USA'
}
```

Addresses and places in dependencies don't normally include the country, resulting in: `San Juan, PR`

The final example is for a neighbourhood in Paris.

```
{
  neighbourhood: 'Grange aux Belles Terrage',
  locality: 'Paris',
  county: 'Paris-7E-Arrondissement',
  macrocounty: 'Paris-1Er-Arrondissement',
  region: 'Paris',
  macroregion: 'Île-De-France',
  country: 'France',
  country_a: 'FR'
}
```

Regions aren't normally included in France labels, so the label for this would be: `Grange aux Belles Terrage, Paris, France`

#### Configuration

There are no configuration options at this time.  

## Contributing

This module should be a starting point for contributing to Pelias for those with specific knowledge of how addresses and places are formatted in a specific country.  `labelSchemas.js` exports a map keyed by ISO3 country code, so country-specific rules should be added there.  
