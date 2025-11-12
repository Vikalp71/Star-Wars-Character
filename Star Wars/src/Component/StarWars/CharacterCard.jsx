import React, { useEffect, useState } from "react";
import { fetchSpecies, fetchWorld } from "./api";
import CharacterModal from "./CharacterModal";

const colors = ["#E0F7FA", "#FFF9C4", "#F8BBD0", "#C8E6C9", "#D1C4E9"];

export default function CharacterCard({ person }) {
  const [speciesNames, setSpeciesNames] = useState([]);
  const [homeworld, setHomeworld] = useState("");
  const [open, setOpen] = useState(false);

  const imgUrl = `https://picsum.photos/seed/${encodeURIComponent(
    person.name
  )}/300/200`;

  useEffect(() => {
    async function loadData() {
      try {
        const species =
          person.species.length > 0
            ? await Promise.all(
                person.species.map(async (u) => (await fetchSpecies(u)).name)
              )
            : ["Human"];
        setSpeciesNames(species);
        const world = await fetchWorld(person.homeworld);
        setHomeworld(world.name);
      } catch {
        setSpeciesNames(["Unknown"]);
      }
    }
    loadData();
  }, [person]);

  const color =
    colors[speciesNames[0]?.charCodeAt(0) % colors.length || 0] || colors[0];

  return (
    <>
      <div
        className="card"
        style={{ backgroundColor: color }}
        onClick={() => setOpen(true)}
      >
        <img src={imgUrl} alt={person.name} />
        <div className="card-body">
          <h3>{person.name}</h3>
          <p>Species: {speciesNames.join(", ")}</p>
          <p>Homeworld: {homeworld || "..."}</p>
        </div>
      </div>

      {open && (
        <CharacterModal
          person={person}
          speciesNames={speciesNames}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
