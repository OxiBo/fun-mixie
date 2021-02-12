import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { searchRandomCocktail } from "../actions";

import CocktailsList from "./CocktailsList";
import SingleCocktail from "./SingleCocktail";
import IngredientInfo from "./IngredientInfo";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(searchRandomCocktail());
  }, [dispatch]);
  return (
    <main className="main">
      <CocktailsList />
      <SingleCocktail />
      <IngredientInfo />
    </main>
  );
};

export default Home;
