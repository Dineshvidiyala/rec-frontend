import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const CreateRecipe = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleAddIngredient = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "https://mern-recipe-app1-server.onrender.com/recipes",
        { ...recipe },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert("Recipe Created");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-recipe" style={containerStyle}>
      <h2 style={headingStyle}>Create Recipe</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label htmlFor="name" style={labelStyle}>Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={recipe.name}
          onChange={handleChange}
          style={inputStyle}
        />
        <label htmlFor="description" style={labelStyle}>Description</label>
        <textarea
          id="description"
          name="description"
          value={recipe.description}
          onChange={handleChange}
          style={textareaStyle}
        ></textarea>
        <label htmlFor="ingredients" style={labelStyle}>Ingredients</label>
        {recipe.ingredients.map((ingredient, index) => (
          <input
            key={index}
            type="text"
            name="ingredients"
            value={ingredient}
            onChange={(event) => handleIngredientChange(event, index)}
            style={ingredientInputStyle}
          />
        ))}
        <button type="button" onClick={handleAddIngredient} style={addButtonStyle}>
          Add Ingredient
        </button>
        <label htmlFor="instructions" style={labelStyle}>Instructions</label>
        <textarea
          id="instructions"
          name="instructions"
          value={recipe.instructions}
          onChange={handleChange}
          style={textareaStyle}
        ></textarea>
        <label htmlFor="imageUrl" style={labelStyle}>Image URL</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={recipe.imageUrl}
          onChange={handleChange}
          style={inputStyle}
        />
        <label htmlFor="cookingTime" style={labelStyle}>Cooking Time (minutes)</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          value={recipe.cookingTime}
          onChange={handleChange}
          style={numberInputStyle}
        />
        <button type="submit" style={submitButtonStyle}>Create Recipe</button>
      </form>
    </div>
  );
};

// Inline styles for the CreateRecipe component
const containerStyle = {
  maxWidth: "600px", // Constrain the form width for better readability
  margin: "80px auto 20px", // Center the form with margin (top margin accounts for fixed navbar)
  padding: "20px",
  backgroundColor: "#f9f9f9", // Light background for the form container
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
};

const headingStyle = {
  textAlign: "center",
  color: "#2c3e50", // Dark blue for the heading
  fontSize: "2rem",
  marginBottom: "20px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px", // Space between form elements
};

const labelStyle = {
  fontSize: "1.1rem",
  color: "#34495e", // Slightly lighter dark color for labels
  fontWeight: "500",
};

const inputStyle = {
  width: "100%", // Full width of the container
  padding: "10px", // Comfortable padding
  fontSize: "1rem",
  border: "1px solid #ddd",
  borderRadius: "5px",
  boxSizing: "border-box", // Ensure padding doesn’t affect width
  outline: "none",
  transition: "border-color 0.3s",
};

const textareaStyle = {
  width: "100%", // Full width
  height: "120px", // Increased height for better usability
  padding: "10px",
  fontSize: "1rem",
  border: "1px solid #ddd",
  borderRadius: "5px",
  boxSizing: "border-box",
  outline: "none",
  resize: "vertical", // Allow vertical resizing only
  transition: "border-color 0.3s",
};

const ingredientInputStyle = {
  width: "100%", // Full width for ingredient inputs
  padding: "8px", // Slightly smaller padding for ingredient inputs
  fontSize: "1rem",
  border: "1px solid #ddd",
  borderRadius: "5px",
  boxSizing: "border-box",
  outline: "none",
  marginBottom: "5px", // Small space between ingredient inputs
};

const numberInputStyle = {
  width: "100%", // Full width
  padding: "10px",
  fontSize: "1rem",
  border: "1px solid #ddd",
  borderRadius: "5px",
  boxSizing: "border-box",
  outline: "none",
};

const addButtonStyle = {
  backgroundColor: "#3498db", // Blue for the "Add Ingredient" button
  color: "#fff",
  border: "none",
  padding: "8px 15px",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "1rem",
  width: "fit-content", // Button width adjusts to content
  alignSelf: "flex-start", // Align button to the left
  transition: "background-color 0.3s",
};

const submitButtonStyle = {
  backgroundColor: "#2ecc71", // Green for the "Create Recipe" button
  color: "#fff",
  border: "none",
  padding: "12px 20px",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "1.1rem",
  fontWeight: "500",
  width: "fit-content",
  alignSelf: "center", // Center the submit button
  transition: "background-color 0.3s",
};