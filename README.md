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

```py
import requests


endpoint = "city"
data = {"location": "castelia-city"}
r = requests.post(f"http://localhost:4978/{endpoint}", json=data)
if r.status_code == 200:
    response = r.json()
    print(response)
else:
    print("Something went wrong:", r.reason)

endpoint = "route"
data = {"region": "hoenn", "routeNumber": 113}
r = requests.post(f"http://localhost:4978/{endpoint}", json=data)
if r.status_code == 200:
    response = r.json()
    print(response)
else:
    print("Something went wrong:", r.reason)
```

<details>

<summary>Full Example</summary>

```py
import requests


def test_post(endpoint: str, data: dict):
    print(f"POST: /{endpoint} and {data}")
    r = requests.post(f"http://localhost:4978/{endpoint}", json=data)
    if r.status_code == 200:
        response = r.json()
        print("->", r.status_code, response)
    else:
        print("->", r.status_code, r.reason)


print("\n== Location endpoints! ==\n")

# Correct call
data = {"location": "castelia-city"}
test_post("city", data)

# Bad call: incorrect data format
data = {"test": "uhh"}
test_post("city", data)

# Bad call: nonexistent location
data = {"location": "testfalse"}
test_post("city", data)


print("\n== Region route endpoints! ==\n")

# Correct call
data = {"region": "kanto", "routeNumber": 1}
test_post("route", data)

# Another Correct call
data = {"region": "hoenn", "routeNumber": 113}
test_post("route", data)

# Bad call: incorrect data format
data = {"test": "uhh"}
test_post("route", data)

# Bad call: nonexistent region
data = {"region": "thisregionisnotreal", "routeNumber": 1}
test_post("route", data)

# Bad call: nonexistent route
data = {"region": "kanto", "routeNumber": 4000}
test_post("route", data)
```

</details>
