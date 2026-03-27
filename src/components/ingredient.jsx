import { useState } from "react";

function Ingredient({ onSearch }) {
  const [ingredients, setIngredients] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ingredients) return;
    onSearch(ingredients);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="tomato, cheese, egg"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />

      <button type="submit">
        Find recipes
      </button>
    </form>
  );
}

export default Ingredient;