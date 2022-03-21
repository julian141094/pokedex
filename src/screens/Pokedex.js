import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { getPokemonsApi, getPokemonDetailsByUrlApi } from "../api/pokemon";
import PokemonList from "../components/PokemonList";

/**
 * @name Pokedex
 * @description Display a list of pokemons
 * @returns JSX.Element
*/
export default function Pokedex() {
  // Const && UseStates
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);

  // UseEffects
  useEffect(() => {
    // Get all pokemon info
    (async () => {
      await loadPokemons();
    })();
  }, []);

  /**
   * @name loadPokemons
   * @description get pokemons info and set data
   * @returns Nothing
   */
  const loadPokemons = async () => {
    try {
      const response = await getPokemonsApi(nextUrl);
      setNextUrl(response.next);

      const pokemonsArray = [];
      for await (const pokemon of response.results) {
        const pokemonDetails = await getPokemonDetailsByUrlApi(pokemon.url);

        pokemonsArray.push({
          id: pokemonDetails.id,
          name: pokemonDetails.name,
          type: pokemonDetails.types[0].type.name,
          order: pokemonDetails.order,
          image: pokemonDetails.sprites.other["official-artwork"].front_default,
        });
      }

      setPokemons([...pokemons, ...pokemonsArray]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView>
      <PokemonList
        pokemons={pokemons}
        loadPokemons={loadPokemons}
        isNext={nextUrl}
      />
    </SafeAreaView>
  );
}
