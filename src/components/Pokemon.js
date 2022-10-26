import { Fragment } from 'react';

const Pokemon = ({pokemon, id}) => {
  return(
    <Fragment>
      <div key={id} className="card">
        <h3>{pokemon.name.toUpperCase()}</h3>
        <img src={pokemon.sprites.front_shiny} alt={`an image of ${pokemon.name}`}/>
        <h5>Type: {pokemon.types[0].type.name.toUpperCase()}</h5>
      </div>
    </Fragment>
  )
}
export default Pokemon;
