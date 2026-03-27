import Card from "./card";

function List({ recipes, onSelect }) {
  return (
    <div className="recipes">
      {recipes.map((recipe) => (
        <Card key={recipe.id} recipe={recipe} onSelect={onSelect} />
      ))}
    </div>
  );
}

export default List;