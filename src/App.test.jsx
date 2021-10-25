import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";

import { MockedProvider } from "@apollo/client/testing";
import { GET_POKEMONS } from "./constants";

const mockPokemons = require("./mocks/pokemons.json");

const mocks = [
  {
    request: {
      query: GET_POKEMONS,
      variables: {
        first: 2,
      },
    },
    result: {
      data: {
        pokemons: mockPokemons,
      },
    },
  },
];

describe("App", function () {
  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("renders loading state", () => {
    const { queryByText } = render(
      <MockedProvider mocks={mocks}>
        <App pokemonsCount={2} />
      </MockedProvider>
    );
    expect(queryByText("Loading...")).toBeInTheDocument();
  });

  it("renders error state", async () => {
    const errorMock = [
      {
        request: {
          query: GET_POKEMONS,
          variables: {
            first: 2,
          },
        },
        error: new Error("An error occurred"),
      },
    ];
    const { queryByText } = render(
      <MockedProvider mocks={errorMock}>
        <App pokemonsCount={2} />
      </MockedProvider>
    );
    await new Promise((resolve) => setTimeout(resolve, 0)); // wait for response
    expect(queryByText("Error!!!")).toBeInTheDocument();
  });

  it("renders first pokemon", async () => {
    const { queryByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App pokemonsCount={2} />
      </MockedProvider>
    );
    await new Promise((resolve) => setTimeout(resolve, 0)); // wait for response
    expect(queryByText(mockPokemons[0].name)).toBeInTheDocument();
    expect(queryByText("No: " + mockPokemons[0].number)).toBeInTheDocument();
    expect(queryByText(mockPokemons[1].name)).not.toBeInTheDocument();
    expect(
      queryByText("No: " + mockPokemons[1].number)
    ).not.toBeInTheDocument();
  });

  it("renders no pokemon found if there are no pokemons", async () => {
    const mocks = [
      {
        request: {
          query: GET_POKEMONS,
          variables: {
            first: 2,
          },
        },
        result: {
          data: {
            pokemons: [],
          },
        },
      },
    ];

    const { queryByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App pokemonsCount={2} />
      </MockedProvider>
    );
    await new Promise((resolve) => setTimeout(resolve, 0)); // wait for response
    expect(queryByText("No Pokemons found")).toBeInTheDocument();
  });

  it("renders next pokemon when forward button clicked", async () => {
    const { queryByText, getByLabelText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App pokemonsCount={2} />
      </MockedProvider>
    );
    await new Promise((resolve) => setTimeout(resolve, 0)); // wait for response
    fireEvent.click(getByLabelText("forward"));
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(queryByText(mockPokemons[1].name)).toBeInTheDocument();
    expect(queryByText("No: " + mockPokemons[1].number)).toBeInTheDocument();
  });

  it("renders previous pokemon when backward button clicked", async () => {
    const { queryByText, getByLabelText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App pokemonsCount={2} />
      </MockedProvider>
    );
    await new Promise((resolve) => setTimeout(resolve, 0)); // wait for response
    fireEvent.click(getByLabelText("forward"));
    await new Promise((resolve) => setTimeout(resolve, 0)); // wait for response
    fireEvent.click(getByLabelText("backward"));
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(queryByText(mockPokemons[0].name)).toBeInTheDocument();
    expect(queryByText("No: " + mockPokemons[0].number)).toBeInTheDocument();
  });

  it("renders first pokemon with backward button disabled", async () => {
    const { queryByText, getByLabelText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App pokemonsCount={2} />
      </MockedProvider>
    );
    await new Promise((resolve) => setTimeout(resolve, 0)); // wait for response
    expect(queryByText(mockPokemons[0].name)).toBeInTheDocument();
    expect(queryByText("No: " + mockPokemons[0].number)).toBeInTheDocument();
    expect(getByLabelText("backward").closest("button")).toHaveAttribute(
      "disabled"
    );
  });

  it("renders last pokemon with forward button disabled", async () => {
    const { queryByText, getByLabelText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App pokemonsCount={2} />
      </MockedProvider>
    );
    await new Promise((resolve) => setTimeout(resolve, 0)); // wait for response

    fireEvent.click(getByLabelText("forward"));
    await new Promise((resolve) => setTimeout(resolve, 0)); // wait for response
    expect(queryByText(mockPokemons[1].name)).toBeInTheDocument();
    expect(queryByText("No: " + mockPokemons[1].number)).toBeInTheDocument();
    expect(getByLabelText("forward").closest("button")).toHaveAttribute(
      "disabled"
    );
  });
});
