// use join() to get rid of commas after each li - https://stackoverflow.com/questions/45812160/unexpected-comma-using-map

module.exports = ({
  name,
  alcoholic,
  glass,
  instructions,
  image,
  ingredients,
}) => {
  const date = Date.now();
  console.log(date);
  return `
  <html>
  <body>
    <div style="text-align: center;">
      <div style="display: flex; align-items: center; justify-content: space-around;">
        <img src=${image} alt="cocktail in a glass" style="width: 80px;" />
        <h3 style="padding: 10px;">Here is your cocktail ${name} details!</h3>
      </div>

      <h4>Type: <span style="color: red;">${alcoholic ? "Alcoholic" : "Non-alcoholic"}</span></h4>
      <h3>Ingredients:</h3>
      <ul style="list-style: none; line-height: 5px;">
        ${ingredients
          .map(
            (ingredient) => `<li style="display: flex; margin: 0 auto; padding: 1px;  list-style: none;">
                     <p style="font-weight: 500">${ingredient.measure || ""}&#160;</p>
                     <p style="font-weight: 600; font-style: italic;">
                       ${ingredient.ingredient || ingredient}
                     </p>
                   </li>`
          )
          .join(" ")}
      </ul>
      <p>
        <span style="font-weight: 600">DIRECTIONS: &#160;</span>${instructions}
      </p>
      <h5>
        Serve in <span style="font-weight: 600;">${glass}</span>
      </h5>
      <p style="font-weight: 700">Thank you!</p>
    </div>
  </body>
</html>;
      `;
};
