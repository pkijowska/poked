import { Fragment, useEffect, useState } from "react";
import Pokemon from "./Pokemon";

const Pokemons = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [desiredPokemon, setDesiredPokemon] = useState("");
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    const filteredPokemonArr = pokemons.filter(pokemon => {
      return pokemon.name.includes(desiredPokemon.toLowerCase());
    });
    setFilteredPokemons(filteredPokemonArr);
  };

  useEffect(() => {
    const asyncFunction = async () => {
      try {
        const getPokemons = await fetch(
          "https://pokeapi.co/api/v2/pokemon/?limit=1100"
        );
        const pokemonsObj = await getPokemons.json();

        const getPokemonDetails = await Promise.all(
          pokemonsObj.results.map(async pokemon => {
            const res = await fetch(pokemon.url);
            const pokemonData = await res.json();
            return pokemonData;
          })
        );
        setPokemons(getPokemonDetails);
        setFilteredPokemons(getPokemonDetails);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    asyncFunction();
  }, []);

  return (
    <Fragment>
      {loading ? (
        "One moment, catching them all for you..."
      ) : (
        <div className="wrapper">
          <form className="wrapper__form" onSubmit={handleSubmit}>
            <label htmlFor="name">Find your favourite pokemon</label>
            <input
              onChange={e => setDesiredPokemon(e.target.value)}
              value={desiredPokemon}
              id="name"
              type="text"
              placeholder="name"
            />
            <button>Submit</button>
          </form>
          <div className="wrapper__cards">
            {filteredPokemons.map((pokemon, id) => (
              <Pokemon id={id}  pokemon={pokemon} />
            ))}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Pokemons;
