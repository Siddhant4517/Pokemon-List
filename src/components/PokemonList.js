import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "./PokemonCard";
import SearchBar from "./SearchBar";
import "../styles/pokemonList.css";

const PokemonList = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
      );
      const promises = response.data.results.map(async (pokemon) => {
        const pokemonDetails = await axios.get(pokemon.url);
        return pokemonDetails.data;
      });
      const results = await Promise.all(promises);
      setPokemonData(results);
      setFilteredData(results);
    };

    fetchData();
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = pokemonData.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div className="pokemon-list">
        {filteredData.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
