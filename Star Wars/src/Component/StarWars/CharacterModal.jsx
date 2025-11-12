import React, { useEffect, useState } from "react";
import { fetchWorld } from "./api";

export default function CharacterModal({ person, speciesNames, onClose }) {
  const [world, setWorld] = useState(null);

  useEffect(() => {
    fetchWorld(person.homeworld)
      .then((w) => setWorld(w))
      .catch(() => setWorld(null));
  }, [person]);

  const formatDate = (iso) => {
    const d = new Date(iso);
    return `${String(d.getDate()).padStart(2, "0")}-${String(
      d.getMonth() + 1
    ).padStart(2, "0")}-${d.getFullYear()}`;
  };

  const height =
    person.height === "unknown"
      ? "Unknown"
      : `${(person.height / 100).toFixed(2)} m`;
  const mass =
    person.mass === "unknown" ? "Unknown" : `${person.mass} kg`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
        <h2>{person.name}</h2>
        <div className="modal-content">
          <div className="col">
            <p><strong>Height:</strong> {height}</p>
            <p><strong>Mass:</strong> {mass}</p>
            <p><strong>Birth Year:</strong> {person.birth_year}</p>
            <p><strong>Films:</strong> {person.films.length}</p>
            <p><strong>Date Added:</strong> {formatDate(person.created)}</p>
            <p><strong>Species:</strong> {speciesNames.join(", ")}</p>
          </div>
          <div className="col">
            <h4>Homeworld</h4>
            {world ? (
              <>
                <p><strong>Name:</strong> {world.name}</p>
                <p><strong>Terrain:</strong> {world.terrain}</p>
                <p><strong>Climate:</strong> {world.climate}</p>
                <p><strong>Population:</strong> {world.population}</p>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
