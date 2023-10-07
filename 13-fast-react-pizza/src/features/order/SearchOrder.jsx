import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, seQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`order/${query}`);
    seQuery("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={query}
        onChange={(e) => seQuery(e.target.value)}
        placeholder="Search order no."
      />
    </form>
  );
}

export default SearchOrder;
