import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

import Pokedex from "pokedex-promise-v2";
const P = new Pokedex();

const app = new Hono();

// Get a list of Pokemon from a location-area
// returns undefined if the location-area is invalid
async function getLocationAreaPokemon(locationAreaName: string): Promise<string[] | undefined> {
  const locationAreaEntry = await P.getLocationAreaByName(locationAreaName).catch(() => undefined);
  if (locationAreaEntry === undefined) return undefined;

  const pokemonNameList = locationAreaEntry.pokemon_encounters.map((entry) => entry.pokemon.name);
  return pokemonNameList;
}

// Get Pokemon by location
const locationEndpointSchema = z.object({
  location: z.string(),
});
app.post("/city", zValidator("json", locationEndpointSchema), async (c) => {
  const body = (await c.req.json()) as z.infer<typeof locationEndpointSchema>;

  const locationEntry = await P.getLocationByName(body.location).catch(() => undefined);
  if (locationEntry === undefined) return c.notFound();

  // Finds all sub-areas and combines their Pokemon lists
  const areaList = locationEntry.areas.map((entry) => entry.name);
  const pokemonList = (
    await Promise.all(areaList.map(async (area) => (await getLocationAreaPokemon(area)) ?? []))
  ).flat();

  return c.json({ pokemon: pokemonList });
});

// Get Pokemon by region and route number
const regionRouteEndpointSchema = z.object({
  region: z.string(),
  routeNumber: z.number({ coerce: true }),
});
app.post("/route", zValidator("json", regionRouteEndpointSchema), async (c) => {
  const body = (await c.req.json()) as z.infer<typeof regionRouteEndpointSchema>;

  // Convert to area
  const locationAreaName = `${body.region}-route-${body.routeNumber}-area`;

  // Get the list of Pokemon
  const pokemonList = await getLocationAreaPokemon(locationAreaName);
  if (pokemonList === undefined) return c.notFound();

  return c.json({ pokemon: pokemonList });
});

const port = 4978;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
