import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://mern-recipe-app1-server.onrender.com/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, []);

  return (
    <div className="saved-recipes">
      <h1>Saved Recipes</h1>
      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            <div className="recipe-card">
              <h2>{recipe.name}</h2>
              <p className="description">{recipe.description}</p>
              <img src={recipe.imageUrl} alt={recipe.name} />
              <p className="cooking-time">Cooking Time: {recipe.cookingTime} minutes</p>
            </div>
          </li>
        ))}
      </ul>
      <style jsx>{`
        .saved-recipes {
          padding: 2rem;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          min-height: 100vh;
          margin-top: 70px; /* To avoid overlap with navbar, assuming navbar height ~60px */
        }

        h1 {
          text-align: center;
          color: #2c3e50;
          font-family: 'Arial', sans-serif;
          font-size: 2.5rem;
          margin-bottom: 2rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        ul {
          list-style: none;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 2rem;
        }

        .recipe-card {
          background: #ffffff;
          border-radius: 15px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          padding: 1.5rem;
          width: 100%;
          max-width: 350px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          text-align: center;
        }

        .recipe-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        }

        h2 {
          color: #34495e;
          font-size: 1.5rem;
          margin-bottom: 1rem;
          font-family: 'Arial', sans-serif;
        }

        .description {
          color: #7f8c8d;
          font-size: 1rem;
          margin-bottom: 1rem;
          line-height: 1.5;
        }

        img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 10px;
          margin-bottom: 1rem;
        }

        .cooking-time {
          color: #2980b9;
          font-size: 1rem;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};