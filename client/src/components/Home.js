import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { searchRandomCocktail, searchSingleCocktail } from "../actions";

import CocktailsList from "./CocktailsList";
import SingleCocktail from "./SingleCocktail";
import IngredientInfo from "./IngredientInfo";

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    const apiId = history.location.search.split("=")[1];
    if (history.location.search) {
      dispatch(searchSingleCocktail(apiId));
      history.replace("/"); // https://stackoverflow.com/questions/61477583/remove-a-query-string-using-react-router-without-reloading-page
    } else {
      dispatch(searchRandomCocktail());
    }
  }, [dispatch]);


  return (
    <>
      <CocktailsList />
      <SingleCocktail />
      <IngredientInfo />
    </>
  );
};

export default Home;
