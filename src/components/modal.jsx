function Modal({ recipe, onClose }) {
  if (!recipe) return null;

  return (
    <div className="modal-overlay">

      <div className="modal">

        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <h2 className="recipe-title">
          {recipe.title}
        </h2>

        <img
          className="recipe-image"
          src={recipe.image}
          alt={recipe.title}
        />

        {/* короткий опис */}
        <div
          className="recipe-text"
          dangerouslySetInnerHTML={{
            __html: recipe.summary.split(". ").slice(0, 2).join(". ") + "."
          }}
        />

        {/* додаткова інфа */}
        <div className="recipe-info">
          <span>⏱ {recipe.readyInMinutes} min</span>
          <span>👥 {recipe.servings} servings</span>
        </div>

        <a
          className="recipe-link"
          href={recipe.sourceUrl}
          target="_blank"
          rel="noreferrer"
        >
          View full recipe
        </a>

      </div>

    </div>
  );
}

export default Modal;