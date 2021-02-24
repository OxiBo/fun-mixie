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
                  <h3>Here is your cocktail ${name} details!</h3>
                  <p>Type: ${alcoholic} </p>
                  <ul style="list-style: none">${ingredients
                    .map(
                      ({ measure, ingredient }) =>
                        `<li style="display: flex; margin: 0 auto; padding: 1px;  list-style: none;">
                      <p style="font-weight: 600">${measure} &nbsp </p>
                      <p style="font-weight: 500; font-style: italic;">
    
                        ${ingredient}
                      </p>
                    </li>`
                    )
                    .join(" ")}</ul>
<p>${instructions}</p>
<p>Serve in ${glass}</p>
                <p style="font-weight: 700">Thank you!</p>
              </div>
          </body>
          </html>
      `;
};
