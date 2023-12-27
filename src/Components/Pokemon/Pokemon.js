// import { Search } from '@mui/icons-material';
import React, {useState, useEffect} from 'react';
// import {Button} from '@mui/material';
// import axios from 'axios';
import './Pokemon.css';
// import InfiniteScroll from 'react-infinite-scroll-component';

function Pokemon(){

    // const limit = 4;
    const [pokemonData, setPokemonData] = useState([]);
    const [loadingPage, setLoadingPage] = useState(`https://pokeapi.co/api/v2/pokemon?limit=20`);
    const [searchTerm, setSearchTerm] = useState("");


    const getAllPokemon = async () => {
        const res = await fetch(loadingPage)
        console.log(res)
        const data = await res.json()
        console.log(data)
        setLoadingPage(data.next)
      

      function createAllPokemon(result){
            result.forEach( async (pokemon) => {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
                const data = await res.json()
                setPokemonData(curElem => [...curElem, data])
                
                }) 
            }
           createAllPokemon(data.results)
           await console.log(pokemonData);
        }

    useEffect(() => {
        getAllPokemon();
    })


    const handleChangeColor = (color) => {
        switch(color){
            case 'water': return 'lightblue';
            case 'fire' : return 'yellow';
            case 'grass' : return 'green';
            case 'normal' : return 'lightpink';
            case 'bug' : return 'brown';
            case 'poison' : return 'blue';
            case 'electric' : return 'lightgray';
            case 'ground' : return 'lightgreen';
            case 'fairy' : return 'white';
            default: return 'gray'
        }
    }

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    const debounce = (func) => {
        let timer;
        return function(...args){
            const context = this;
            if(timer) clearTimeout(timer) //shorthand property & closure
            timer = setTimeout(() => {
                timer = null
                func.apply(context, args)
            }, 500)
        }
    }

    

    const optimizeSearch = debounce(handleSearch)

  return (
    <div>
        <h1>Pokemon</h1>
        <input  
            onChange={optimizeSearch} 
            className="search" type="search" 
            placeholder="Search Pokemon">
        </input>
       
        <div>
        {/* <InfiniteScroll
            dataLength={pokemonData.length}
            next={fetchMoreData}
            hasMore={true}
            loader={<h4>Loading...</h4>}        
        > */}
         
                <ul>
                {
                    // eslint-disable-next-line array-callback-return
                    pokemonData.filter(val => {
                        if(searchTerm === ""  || val.name.toLowerCase().includes(searchTerm.toLowerCase())){
                            return val
                             }
                    }).map((a, index) => (                    
                    <li  className='card 1' key={index} 
                    style={{backgroundColor: handleChangeColor(a.types[0].type.name)}}> 
                       <div className="card_image">
                         <img src={a.sprites.front_default} alt="img" />
                        </div>
                            <div className="card_title"><p>{a.name}</p></div>
                        
                        <div className='type'><p>{a.types[0].type.name}</p></div>
                    </li>
                    ))

                    
                }
            </ul>    
            
        {/* </InfiniteScroll> */}
            </div>
        </div>

  )
}

export default Pokemon;
