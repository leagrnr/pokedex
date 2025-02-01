import { useEffect, useState } from "react";
import axios from "axios";

export const Item = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get("https://pokeapi.co/api/v2/item?limit=50"); // Récupère 50 items

                const itemsWithImages = await Promise.all(
                    response.data.results.map(async (item) => {
                        const itemResponse = await axios.get(item.url);
                        return { name: itemResponse.data.name, image: itemResponse.data.sprites?.default || "" };
                    })
                );

                setItems(itemsWithImages);
            } catch (error) {
                console.error("Erreur lors du chargement des items :", error);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Liste des Items Pokémon</h1>
            {loading ? (
                <p>Chargement...</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {items.map((item, index) => (
                        <div key={index} className="border p-2 rounded-lg shadow-lg flex flex-col items-center">
                            {item.image ? (
                                <img src={item.image} alt={item.name} className="w-16 h-16" />
                            ) : (
                                <p className="text-gray-500">Image non disponible</p>
                            )}
                            <p className="mt-2 capitalize text-center">{item.name}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};