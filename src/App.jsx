import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import TeamList from "./pages/TeamList";
import Detail from "./pages/Detail";
import PokemonList from "./pages/PokemonList";
import PokemonDetail from "./pages/PokemonDetail";

import "./App.css";

function App() {
  // pokemon die de gebruiker uit de API heeft gekozen
  const [pokemons, setPokemons] = useState([]);

  // teams bewaren alleen de namen van pokemon
  const [teams, setTeams] = useState([
    {
      id: 1,
      name: "Team 1",
      pokemonNames: [],
    },
  ]);

  function addPokemon(pokemon) {
    // pokemon niet dubbel toevoegen
    const exists = pokemons.some(
      (item) => item.name === pokemon.name
    );

    if (exists) {
      return;
    }

    setPokemons([
      ...pokemons,
      pokemon,
    ]);
  }

  function deletePokemon(name) {
    // pokemon verwijderen uit pokemon lijst
    setPokemons(
      pokemons.filter(
        (pokemon) => pokemon.name !== name
      )
    );

    // pokemon ook uit alle teams halen
    setTeams(
      teams.map((team) => ({
        ...team,
        pokemonNames: team.pokemonNames.filter(
          (pokemonName) => pokemonName !== name
        ),
      }))
    );
  }

  function addTeam(name) {
    const newTeam = {
      id: Date.now(),
      name: name,
      pokemonNames: [],
    };

    setTeams([
      ...teams,
      newTeam,
    ]);
  }

  function deleteTeam(id) {
    setTeams(
      teams.filter(
        (team) => team.id !== id
      )
    );
  }

  function addPokemonToTeam(teamId, pokemonName) {
    setTeams(
      teams.map((team) => {
        if (team.id !== teamId) {
          return team;
        }

        // pokemon niet dubbel in zelfde team
        if (team.pokemonNames.includes(pokemonName)) {
          return team;
        }

        return {
          ...team,
          pokemonNames: [
            ...team.pokemonNames,
            pokemonName,
          ],
        };
      })
    );
  }

  function removePokemonFromTeam(teamId, pokemonName) {
    setTeams(
      teams.map((team) => {
        if (team.id !== teamId) {
          return team;
        }

        return {
          ...team,
          pokemonNames: team.pokemonNames.filter(
            (name) => name !== pokemonName
          ),
        };
      })
    );
  }

  return (
    <BrowserRouter>
      <div className="app">
        <Header />

        <Navigation />

        <main className="main">
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/teams"
              element={
                <TeamList
                  teams={teams}
                  addTeam={addTeam}
                  deleteTeam={deleteTeam}
                />
              }
            />

            <Route
              path="/teams/:teamId"
              element={
                <Detail
                  teams={teams}
                  pokemons={pokemons}
                  addPokemonToTeam={addPokemonToTeam}
                  removePokemonFromTeam={removePokemonFromTeam}
                />
              }
            />

            <Route
              path="/pokemon"
              element={
                <PokemonList
                  pokemons={pokemons}
                  addPokemon={addPokemon}
                  deletePokemon={deletePokemon}
                />
              }
            />

            <Route
              path="/pokemon/:pokemonName"
              element={
                <PokemonDetail
                  pokemons={pokemons}
                />
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;