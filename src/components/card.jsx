function Card({ recipe, onSelect }) {
  return (
    <div className="recipe-card">

      <div className="card-image">
        <img src={recipe.image} alt={recipe.title} />
      </div>

      <div className="card-content">

        <h3 className="card-title">
          {recipe.title}
        </h3>

        <button
          className="card-button"
          onClick={() => onSelect(recipe.id)}
        >
          View recipe
        </button>

      </div>

    </div>
  );
}

export default Card;