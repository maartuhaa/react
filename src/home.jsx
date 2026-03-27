import { useState } from "react";
import Ingredient from "./components/ingredient";
import List from "./components/list";
import Modal from "./components/modal";

const API_KEY = "253e05730e1844eaba2345085fd4bace";

function Home() {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const searchRecipes = async (ingredients) => {
        const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=10&apiKey=${API_KEY}`;

        const response = await fetch(url);
        const data = await response.json();

        setRecipes(data);
    };

    const getRecipeDetails = async (id) => {
        const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`;

        const response = await fetch(url);
        const data = await response.json();

        setSelectedRecipe(data);
    };

    return (
        <div className="home">

            <div className="hero">
                <h1 className="hero-title">Fridge Recipe Finder</h1>

                <p className="hero-subtitle">
                    Turn the ingredients in your fridge into delicious meals
                </p>

                <div className="search-box">
                    <Ingredient onSearch={searchRecipes} />
                </div>
            </div>


            <List recipes={recipes} onSelect={getRecipeDetails} />

            <Modal
                recipe={selectedRecipe}
                onClose={() => setSelectedRecipe(null)}
            />

            <div className="popular">
                <h2>Popular ingredients</h2>

                <div className="ingredients">
                    <button onClick={() => searchRecipes("tomato")}>Tomato</button>
                    <button onClick={() => searchRecipes("chicken")}>Chicken</button>
                    <button onClick={() => searchRecipes("cheese")}>Cheese</button>
                    <button onClick={() => searchRecipes("egg")}>Egg</button>
                    <button onClick={() => searchRecipes("potato")}>Potato</button>
                    <button onClick={() => searchRecipes("rice")}>Rice</button>
                </div>
            </div>

            <h2 className="how" >How it works</h2>

            <div className="how-it-works">

                <div className="step">
                    <div className="step-icon">🥦</div>
                    <h3>Add ingredients</h3>
                    <p>Type what you already have in your fridge.</p>
                </div>

                <div className="step">
                    <div className="step-icon">🔎</div>
                    <h3>Find recipes</h3>
                    <p>We search recipes that match your ingredients.</p>
                </div>

                <div className="step">
                    <div className="step-icon">🍳</div>
                    <h3>Start cooking</h3>
                    <p>Open the recipe and cook something delicious.</p>
                </div>

            </div>

            <footer className="footer">
                Fridge Recipe Finder • Built with React • Spoonacular API
            </footer>

        </div>
    );
}

export default Home;