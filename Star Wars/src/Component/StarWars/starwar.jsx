import React from "react";
import CharacterList from "./CharacterList";
import "./starwar.css";

export default function StarWars() {
  return (
    <div className="app">
      <header className="header">
        <h1>Star Wars Characters</h1>
        <p>Browse characters from the Star Wars universe</p>
      </header>

      <main>
        <CharacterList />
      </main>
    </div>
  );
}
