# Pokemon Location Pokemon API

Wrapper around the [PokeAPI](https://pokeapi.co) location API to get Pokemon from a city or route in a region.

## API Overview

The API has two separate routes:

- `/city` takes a city name via post request
- `/route` takes a region and route number via post request

### `/city` endpoint

- Get Pokemon from location
  - `location` (string): Location name (e.g. `castelia-city`)
- Returns
  - `pokemon` (array of strings): All catchable Pokemon in the area.

```json
{
  "location": "castelia-city"
}
```

Output:

```json
{
  "pokemon": [
    "rattata",
    "eevee",
    "skitty",
    "delcatty",
    "buneary",
    "lopunny",
    "pidove",
    "audino",
    "cottonee",
    "whimsicott",
    "petilil",
    "lilligant",
    "zorua"
  ]
}
```

### `/route` endpoint

- Get Pokemon from region's route
  - `region` (string): Region name (e.g. `hoenn`)
  - `routeNumber` (int): Route number (e.g. `113`)
- Returns
  - `pokemon` (array of strings): All catchable Pokemon in the route

```json
{
  "region": "hoenn",
  "routeNumber": "113"
}
```

Output:

```json
{
  "pokemon": ["sandshrew", "slugma", "skarmory", "spinda"]
}
```

### Errors

Errors are returned as 400 level status codes.

- `400`: You messed up the input data shape
- `404`: You messed up the region name or something else caused the PokeAPI to explode

## Installation

This project uses npm, you can check if it is installed via:

```bash
npm -v
```

After you clone the repo, install the npm packages:

```bash
npm install
```

You can then run the program via the provided npm script:

```bash
npm run dev
```

You should get a response telling you where the server is running:

```shell
$ npm run dev

  > dev
  > tsx watch src/index.ts

  Server is running on http://localhost:4978
```

### Usage

Access the API via post requests to the API endpoints. Here is a simple python example using the
[requests library](https://requests.readthedocs.io/en/latest/):

**NOTE TO SELF** this is not done yet please update this later!

```py
import requests
```
