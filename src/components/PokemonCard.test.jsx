import React from "react";
import { render } from "@testing-library/react";
import PokemonCard from "./PokemonCard";

const mockPokemon = {
  number: "001",
  name: "Bulbasaur",
  attacks: {
    fast: [
      {
        name: "Tackle",
        type: "Normal",
        damage: 12,
        __typename: "Attack",
      },
      {
        name: "Vine Whip",
        type: "Grass",
        damage: 7,
        __typename: "Attack",
      },
    ],
    special: [
      {
        name: "Power Whip",
        type: "Grass",
        damage: 70,
        __typename: "Attack",
      },
      {
        name: "Seed Bomb",
        type: "Grass",
        damage: 40,
        __typename: "Attack",
      },
      {
        name: "Sludge Bomb",
        type: "Poison",
        damage: 55,
        __typename: "Attack",
      },
    ],
    __typename: "PokemonAttack",
  },
  resistant: ["Water", "Electric", "Grass", "Fighting", "Fairy"],
  weaknesses: ["Fire", "Ice", "Flying", "Psychic"],
  image: "https://img.pokemondb.net/artwork/bulbasaur.jpg",
};

describe("PokemonCard", function () {
  it("should render pokemon details", function () {
    const { queryByText, getByAltText } = render(
      <PokemonCard pokemon={mockPokemon} />
    );
    expect(queryByText(mockPokemon.name)).toBeInTheDocument();
    expect(queryByText("No: " + mockPokemon.number)).toBeInTheDocument();
    expect(queryByText(mockPokemon.resistant.join(", "))).toBeInTheDocument();
    expect(queryByText(mockPokemon.weaknesses.join(", "))).toBeInTheDocument();
    expect(getByAltText(mockPokemon.name + " image")).toBeInTheDocument();
  });
});
