import { useEffect, useState, CSSProperties } from "react";
import axios from "axios";

const typeColors = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
};

interface Pokemon {
    name: string;
    image: string;
    type: keyof typeof typeColors;
    bgColor: string;
}

export function Pokemon() {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=10000");
                const pokemonData = await Promise.all(
                    response.data.results.map(async (pokemon: { url: string; name: string; }) => {
                        const details = await axios.get(pokemon.url);
                        const species = await axios.get(details.data.species.url);

                        const frenchName = species.data.names.find((n: { language: { name: string; }; }) => n.language.name === "fr")?.name || pokemon.name;

                        const type = details.data.types.length > 0 ? details.data.types[0].type.name as keyof typeof typeColors : "normal";

                        const bgColor = typeColors[type] || "#fff";

                        return { name: frenchName, image: details.data.sprites.front_default, type, bgColor };
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
                {pokemonList.map((pokemon) => (
                    <div
                        key={pokemon.name}
                        className="pokemon-card"
                        style={{ "--bg-color": pokemon.bgColor } as CSSProperties}
                    >
                        <img src={pokemon.image} alt={pokemon.name} />
                        <p>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}