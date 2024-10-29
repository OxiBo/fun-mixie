# Cocktail App

![GitHub](https://img.shields.io/github/license/OxiBo/fun-mixie)
![GitHub stars](https://img.shields.io/github/stars/OxiBo/fun-mixie)
![GitHub forks](https://img.shields.io/github/forks/OxiBo/fun-mixie)

## Overview

Cocktail App is a web application designed to help users find and explore cocktail recipes. With this app, users can:

- **Search for Recipes:** Easily find a wide variety of cocktail recipes.
- **Save Favorites:** Save their favorite recipes to a personalized list.
- **Get Ingredient Information:** Access detailed information about ingredients used in the recipes.
- **Email Recipes:** Share their favorite recipes with friends via email.
- **Sign In with Social Media:** Securely log in using Facebook, Instagram, or Twitter for a seamless experience.

## Technologies Used

- **Backend:** Node.js, Express, Passport.js, MongoDB
- **Frontend:** React, Redux, REST, HTML, SASS

## Features

- **Find Cocktail Recipes:** Search for various cocktail recipes.
- **Save Favorites:** Save your favorite recipes to a list.
- **Ingredient Information:** Get detailed information about ingredients.
- **Email Recipes:** Share recipes via email.
- **Authentication:** Set up authentication via social network providers.

## Installation

To get started with the Cocktail App, follow these steps:

1. **Clone the repository:**

    ```sh
    git clone https://github.com/OxiBo/fun-mixie.git
    cd fun-mixie
    ```

2. **Install dependencies:**

    ```sh
    npm install 
    cd client
    npm install
    cd ..
    ```
    

3. **Set up environment variables:**

   Create two files in the `/config` folder: `dev.js` and `prod.js`. These files should contain the necessary environment variables for development and production environments, respectively.

    Example `dev.js`:
    ```js
    // dev.js - Don't commit this
    module.exports = {
      facebookAPIId: 'your_facebook_api_id',
      facebookAPISecret: 'your_facebook_api_secret',
      facebookCallBackURL: 'http://localhost:4070/auth/facebook/callback',
      twitterConsumerKey: 'your_twitter_consumer_key',
      twitterConsumerSecret: 'your_twitter_consumer_secret',
      instagramClientID: 'your_instagram_client_id',
      instagramClientSecret: 'your_instagram_client_secret',
      instagramCallBackURL: 'http://localhost:4070/auth/instagram/callback',
      mongoURI: 'your_development_mongodb_uri',
      cookieKey: 'your_development_cookie_key',
      nodemailerUser: 'your_nodemailer_user',
      nodemailerPass: 'your_nodemailer_pass',
      redirectDomain: 'http://localhost:4007',
    };
    ```

    Additionally, create a `keys.js` file in the `/config` folder to determine which set of credentials to use based on the environment:

    ```js
    if (process.env.NODE_ENV === "production") {
      // we are in production
      module.exports = require("./prod");
    } else {
      // we are in development
      module.exports = require("./dev");
    }
    ```

4. **Run the application:**

    ```sh
    npm run dev
    ```

    The application should now be running on `http://localhost:4007`.

## Scripts

- **Start the server:** `npm start`
- **Start the server with nodemon:** `npm run server`
- **Start the client:** `npm run client`
- **Start both server and client concurrently:** `npm run dev`

## Dependencies

- **body-parser:** ^1.19.0
- **concurrently:** ^5.3.0
- **cookie-session:** ^1.4.0
- **cors:** ^2.8.5
- **express:** ^4.17.1
- **mongoose:** ^5.11.10
- **nodemailer:** ^6.8.0
- **nodemailer-smtp-transport:** ^2.7.4
- **passport:** ^0.4.1
- **passport-facebook:** ^3.0.0
- **passport-instagram:** ^1.0.0
- **passport-twitter:** ^1.0.4

## Dev Dependencies

- **http-proxy-middleware:** ^0.21.0

## Usage

1. **Search for Recipes:** Use the search bar to find cocktail recipes.
2. **Save Favorites:** Click the heart icon to save recipes to your favorites list.
3. **Ingredient Information:** Click on an ingredient to get more information.
4. **Email Recipes:** Use the email feature to share recipes with others.
5. **Authentication:** Sign up or log in using your social network accounts.


---

© 2021 OxiBo. All rights reserved.
