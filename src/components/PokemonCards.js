import React ,{useState,useEffect} from 'react';
import axios from "axios";

const PokemonCards = ({name}) => {
    const [pokemonData,setPokemonData] = useState({});
    async function fetchPokemon () {
        try{
            const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
            setPokemonData(result.data)

        }catch (e){
            console.error(e)
        }
    }
    useEffect(()=>{
        fetchPokemon()
    },[])
    return (
        <>

            {Object.keys(pokemonData).length > 0 &&
                <div className="child-content">
                    <h2>{pokemonData.name}</h2>
                    <img src= {pokemonData.sprites.front_default} alt={pokemonData.name}/>
                    <h4>Moves: {pokemonData.moves.length}</h4>
                    <h4>Weight: {pokemonData.weight}</h4>
                    <ul className="ability-list-style">   <h4>Abilities:</h4>
                        {pokemonData.abilities.map((a)=> {
                                return (
                                    <li className="ability-list" key={a.ability.name}>{a.ability.name}</li>
                                )
                            }
                        )
                        }
                    </ul>
                </div>
            }

        </>
    );
};

export default PokemonCards;