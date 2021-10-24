import React from "react";
import { useState } from "react";
import "./App.css";
import { GET_POKEMONS } from "./constants.js";
import { useQuery } from "@apollo/client";
import PokemonCard from "./components/PokemonCard";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const pokemonsCount = 151;

const ArrowButton = ({ type, disabled, handleClick }) => {
  return (
    <IconButton
      aria-label={type}
      color="primary"
      size="large"
      disabled={disabled}
      onClick={handleClick}
      disableRipple
    >
      {type === "back" ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />}
    </IconButton>
  );
};

export default function App() {
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
  if (error) return <p>Error !!!</p>;
  if (data && data.pokemons) {
    currentPokemon = data.pokemons.find(
      (pokemon) => Number(pokemon.number) === currentPokemonNo
    );
  }
  return (
    <Container maxWidth="100" sx={{bgcolor: "grey.100" }}>
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
            type={"back"}
            disabled={currentPokemonNo === 1}
            handleClick={handleBackButton}
          />
        </Box>
        <Box>
          { currentPokemon ? <PokemonCard pokemon={currentPokemon} /> : "No Pokemons found" }
        </Box>
        <Box>
          <ArrowButton
            type={"front"}
            disabled={currentPokemonNo === 151}
            handleClick={handleForwardButton}
          />
        </Box>
      </Box>
    </Container>
  );
}
