import React, { useEffect, useState } from "react";
import { fetchPeoplePage } from "./api";
import CharacterCard from "./CharacterCard";

export default function CharacterList() {
  const [pageUrl, setPageUrl] = useState("https://swapi.dev/api/people/");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchPeoplePage(pageUrl)
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [pageUrl]);

  return (
    <section>
      <div className="pagination">
        <button
          disabled={!data?.previous}
          onClick={() => setPageUrl(data.previous)}
        >
          Prev
        </button>
        <button disabled={!data?.next} onClick={() => setPageUrl(data.next)}>
          Next
        </button>
      </div>

      {loading && <p className="center">Loading...</p>}
      {error && <p className="error">Error: {error}</p>}

      <div className="grid">
        {!loading &&
          data?.results?.map((person) => (
            <CharacterCard key={person.url} person={person} />
          ))}
      </div>
    </section>
  );
}
