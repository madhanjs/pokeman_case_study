import React from "react";
import { useState } from "react";
import { GET_POKEMONS } from "./constants.js";
import { useQuery } from "@apollo/client";
import PokemonCard from "./components/PokemonCard";
import { ArrowButton } from "./components/ArrowButton"
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export default function App({ pokemonsCount = 151 }) {
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: { first: pokemonsCount },
  });
  const [currentPokemonNo, setCurrentPokemonNo] = useState(1);
  let currentPokemon;
  const handleBackButton = () => {
    currentPokemonNo > 1 && setCurrentPokemonNo(currentPokemonNo - 1);
  };
  const handleForwardButton = () => {
    currentPokemonNo < pokemonsCount &&
      setCurrentPokemonNo(currentPokemonNo + 1);
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!!!</p>;
  if (data && data.pokemons) {
    currentPokemon = data.pokemons.find(
      (pokemon) => Number(pokemon.number) === currentPokemonNo
    );
  }
  return (
    <Container maxWidth="100" sx={{ bgcolor: "grey.100" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Box>
          <ArrowButton
            data-testid="backward-button"
            disabled={currentPokemonNo === 1}
            handleClick={handleBackButton}
            type={"backward"}
          />
        </Box>
        <Box>
          {currentPokemon ? (
            <PokemonCard pokemon={currentPokemon} />
          ) : (
            "No Pokemons found"
          )}
        </Box>
        <Box>
          <ArrowButton
            data-testid="forward-button"
            disabled={currentPokemonNo === pokemonsCount}
            handleClick={handleForwardButton}
            type={"forward"}
          />
        </Box>
      </Box>
    </Container>
  );
}
