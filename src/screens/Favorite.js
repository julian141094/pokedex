import React, { useState, useCallback } from "react";
import { Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getPokemonsFavoriteApi } from "../api/favorite";
import { getPokemonDetailsApi } from "../api/pokemon";
import useAuth from "../hooks/useAuth";
import PokemonList from "../components/PokemonList";
import NoLogged from "../components/NoLogged";

/**
 * @name Favorite()
 * @description Favorite pokemons list (of user)
 * @returns JSX.ELement
 */
export default function Favorite() {
  // Constants && useStates
  const [pokemons, setPokemons] = useState([]);
  const { auth } = useAuth();

  /* IMPORTANT
  * This is a hook that excecute anonimous function
  * (inside the useCallback), when this screen is focused
  * on React Navigation 
  */
  useFocusEffect(
    useCallback(() => {
      if (auth) {
        (async () => {
          const response = await getPokemonsFavoriteApi();
          const pokemonsArray = [];
          for await (const id of response) {
            const pokemonDetails = await getPokemonDetailsApi(id);

            pokemonsArray.push({
              id: pokemonDetails.id,
              name: pokemonDetails.name,
              type: pokemonDetails.types[0].type.name,
              order: pokemonDetails.order,
              image:
                pokemonDetails.sprites.other["official-artwork"].front_default,
            });
          }

          setPokemons(pokemonsArray);
        })();
      }
    }, [auth])
  );

  return !auth ? <NoLogged /> : <PokemonList pokemons={pokemons} />;
}
