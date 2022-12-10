import React, {useEffect, useState} from 'react';
import './App.css';
import PokemonCards from "./components/PokemonCards";
import axios from "axios";
import Pagination from "./components/Pagination";
import './assets/pokemon-23.svg'

const App = () => {
    // const navigate = useNavigate();
    const[pokemons, setPokemons] = useState([])
    const[pokemonNext, setPokemonNext] = useState("")
    const[pokemonPrevious, setPokemonPrevious] = useState("")
    const[pokemonCurrent, setPokemonCurrent] = useState("https://pokeapi.co/api/v2/pokemon/")

    // Eerst maken we met axios een abortcontroller object aan
    const controller = new AbortController();
    //De signal key die we op dit object vinden, moet bij ieder request worden meegegeven in het configuratie-object onder de naam signal:

    async function fetchEmall() {
        try {
            const result = await axios.get(pokemonCurrent)
            setPokemons(result.data)
            setPokemonNext(result.data.next)
            setPokemonPrevious(result.data.previous)
        } catch (e) {
            console.error(e)
        }
    }
    useEffect(()=>{
        // acties die uitgevoerd worden na mount
        console.log("Mounting")
                fetchEmall();

        return function cleanup() {
            // acties die uitgevoerd worden na unmount
            console.log("FetchEmAll cleanedUp - Unmounting")
            controller.abort(); // <--- request annuleren
        }
    },[pokemonCurrent])

    function  handleClickNext () {
        setPokemonCurrent(pokemonNext)
        console.log("Next")
    }
    function  handleClickPrevious () {
        setPokemonCurrent(pokemonPrevious)
        console.log("Previous")
    }


    return (
            <>
                <div className="page">
                    <img src="./assets/pokemon-23.svg" alt=""/>
                <Pagination handleClickNext={ pokemonNext ? handleClickNext : null } handleClickPrevious={pokemonPrevious ? handleClickPrevious : null } pokemonPrevious={pokemonPrevious}/>
                {Object.keys(pokemons).length > 0 &&
                    <>
                        <ul className="parent" >
                            {pokemons.results.map((pokemon) => {
                                return (
                                    <li className="child" key={pokemon.name}><PokemonCards name={pokemon.name}/></li>
                                )
                            })}
                        </ul>
                    </>
                }
                </div>
            </>

        )

}
export default App;