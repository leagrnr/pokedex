import { useEffect, useState } from "react";
import axios from "axios";

export function Pokemon() {
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0") // Change le limit selon tes besoins
            .then((res) => {
                setPokemonList(res.data.results); // Récupère juste les noms + URLs
                setLoading(false);
            })
            .catch((error) => console.error("Erreur:", error));
    }, []);

    if (loading) return <p>Chargement...</p>;

    return (
        <div>
            <h1>Liste des Pokémon</h1>
            <ul>
                {pokemonList.map((pokemon, index) => (
                    <li key={index}>
                        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                    </li>
                ))}
            </ul>
        </div>
    );
}
