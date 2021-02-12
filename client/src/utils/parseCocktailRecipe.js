export const parseCocktailInfo = ({
  idDrink,
  strDrink,
  strAlcoholic,
  strGlass,
  strInstructions,
  strDrinkThumb,
  ...data
}) => {
  let recipe = {
    id: idDrink,
    name: strDrink,
    alcoholic: strAlcoholic,
    glass: strGlass,
    instructions: strInstructions,
    image: strDrinkThumb,
  };

  let ingredients = Object.entries(data).filter(
    (i) => i[0].startsWith("strIngredient") && i[1]
  );

  const measures = Object.entries(data).filter(
    (i) => i[0].startsWith("strMeasure") && i[1]
  );

  const allIngredients = measures.map(
    (item, index) => {
      return { measure: item[1], ingredient: ingredients[index][1] };
    }

    // `${item[1]} ${ingredients[index][1]}`
  );

  ingredients = ingredients.slice(measures.length).map((item) => item[1]);

  if (ingredients.length) {
    allIngredients.push(ingredients);
  }

  return { ...recipe, ingredients: [...allIngredients.flat()] };
};

export const getCocktailsNames = ({ strDrink }) => {
  return strDrink;
};
