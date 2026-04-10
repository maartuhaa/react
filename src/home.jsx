import { useState } from "react";
import Ingredient from "./components/ingredient";
import List from "./components/list";
import Modal from "./components/modal";

const API_KEY = "253e05730e1844eaba2345085fd4bace";

function Home() {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const searchRecipes = async (ingredients) => {
        try {
            setLoading(true);
            setError(null);

            const formattedIngredients = ingredients
                .split(",")
                .map(i => i.trim())
                .join(",");

            const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${formattedIngredients}&number=10&apiKey=${API_KEY}`;

            const response = await fetch(url);
            if (!response.ok) throw new Error();

            const data = await response.json();
            setRecipes(data);

            setTimeout(() => {
                document.querySelector(".recipes")?.scrollIntoView({ behavior: "smooth" });
            }, 100);

        } catch {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const getRecipeDetails = async (id) => {
        try {
            setLoading(true);

            const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`;

            const response = await fetch(url);
            const data = await response.json();

            setSelectedRecipe(data);

        } catch {
            setError("Failed to load recipe");
        } finally {
            setLoading(false);
        }
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

            {loading && <p style={{ marginTop: "20px" }}>Loading...</p>}
            {error && <p style={{ marginTop: "20px" }}>{error}</p>}

            {!loading && recipes.length === 0 && !error && (
                <p style={{ marginTop: "20px" }}>
                    No recipes found. Try "chicken, rice".
                </p>
            )}

            <List
                recipes={recipes}
                onSelect={getRecipeDetails}
            />

            {recipes.length > 0 && (
                <button style={{ marginTop: "20px" }} onClick={() => setRecipes([])}>
                    Clear results
                </button>
            )}

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

            <h2 className="how">How it works</h2>

            <div className="how-it-works">

                <div className="step">
                    <div className="step-icon">
                        <i className="fa-solid fa-carrot"></i>
                    </div>
                    <h3>Add ingredients</h3>
                    <p>Type what you already have in your fridge.</p>
                </div>

                <div className="step"><div className="step-icon">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                    <h3>Find recipes</h3>
                    <p>We search recipes that match your ingredients.</p>
                </div>

                <div className="step">
                    <div className="step-icon">
                        <i className="fa-solid fa-utensils"></i>
                    </div>
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
