import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("https://rec-server-backend.onrender.com/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://rec-server-backend.onrender.com/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("https://rec-server-backend.onrender.com/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Recipes</h1>
      <ul style={recipeListStyle}>
        {recipes.map((recipe) => (
          <li key={recipe._id} style={recipeItemStyle}>
            <div style={recipeHeaderStyle}>
              <h2 style={recipeTitleStyle}>{recipe.name}</h2>
              <button
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
                style={{
                  ...saveButtonStyle,
                  ...(isRecipeSaved(recipe._id) ? savedButtonStyle : {}),
                }}
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
              </button>
            </div>
            <div style={instructionsStyle} className="instructions">
              <p style={instructionsTextStyle}>{recipe.instructions}</p>
            </div>
            <img
              src={recipe.imageUrl}
              alt={recipe.name}
              style={imageStyle}
            />
            <p style={cookingTimeStyle}>
              Cooking Time: <strong>{recipe.cookingTime}</strong> minutes
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Inline styles for the Home component
const containerStyle = {
  maxWidth: "1200px", // Slightly wider to accommodate 3 columns
  margin: "80px auto 20px", // Top margin for fixed navbar
  padding: "20px",
  backgroundColor: "#f5f6fa",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const headingStyle = {
  textAlign: "center",
  color: "#2c3e50",
  fontSize: "2.5rem",
  marginBottom: "30px",
  fontWeight: "700",
};

const recipeListStyle = {
  listStyle: "none",
  padding: "0",
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)", // Fixed to 3 columns
  gap: "25px",
};

const recipeItemStyle = {
  backgroundColor: "#ffffff",
  borderRadius: "10px",
  padding: "15px",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.2s",
};

const recipeHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "10px",
};

const recipeTitleStyle = {
  margin: "0",
  color: "#34495e",
  fontSize: "1.5rem",
  fontWeight: "600",
};

const saveButtonStyle = {
  backgroundColor: "#3498db",
  color: "#fff",
  border: "none",
  padding: "8px 15px",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "1rem",
  transition: "background-color 0.3s",
};

const savedButtonStyle = {
  backgroundColor: "#95a5a6", // Grey for "Saved" state
  cursor: "not-allowed",
};

const instructionsStyle = {
  marginBottom: "15px",
};

const instructionsTextStyle = {
  color: "#7f8c8d",
  fontSize: "1rem",
  lineHeight: "1.6",
  margin: "0",
};

const imageStyle = {
  width: "100%",
  height: "200px",
  objectFit: "cover",
  borderRadius: "5px",
  marginBottom: "10px",
};

const cookingTimeStyle = {
  color: "#7f8c8d",
  fontSize: "1rem",
  margin: "0",
  fontWeight: "500",
};
