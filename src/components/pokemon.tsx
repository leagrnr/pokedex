import { useEffect, useState } from "react";
import axios from "axios";

export function Pokemon() {
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=10000");
                const pokemonData = await Promise.all(
                    response.data.results.map(async (pokemon) => {
                        const details = await axios.get(pokemon.url);
                        const species = await axios.get(details.data.species.url);

                        // Trouver le nom en français
                        const frenchName = species.data.names.find((n) => n.language.name === "fr")?.name || pokemon.name;

                        return { name: frenchName, image: details.data.sprites.front_default };
                    })
                );
                setPokemonList(pokemonData);
                setLoading(false);
            } catch (error) {
                console.error("Erreur:", error);
            }
        };

        fetchPokemons();
    }, []);


    if (loading) return <p>Chargement...</p>;

    return (
        <div className="container">
            <h1 className="title">Liste des Pokémon</h1>
            <div className="grid">
                {pokemonList.map((pokemon) => {
                    return (
                        <div key={pokemon.name} className="pokemon-card">
                            <img src={pokemon.image} alt={pokemon.name}/>
                            <p>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
