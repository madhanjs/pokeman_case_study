import './App.css';
import { GET_POKEMONS } from './api';
import { useQuery } from '@apollo/client';
import Pokemon from './components/Pokemon';
const first = 151;

export default function App() {
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: { first }
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return data.pokemons.map((pokemon) => <Pokemon pokemon={pokemon} />);
}
