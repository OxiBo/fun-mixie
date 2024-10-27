# Cocktail App

![GitHub](https://img.shields.io/github/license/OxiBo/fun-mixie)
![GitHub stars](https://img.shields.io/github/stars/OxiBo/fun-mixie)
![GitHub forks](https://img.shields.io/github/forks/OxiBo/fun-mixie)

## Overview

Cocktail App is a web application designed to help users find cocktail recipes, save their favorite recipes, get information about ingredients, email chosen recipes, and set up authentication via social network providers.

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
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory and add the necessary environment variables.

    ```env
    MONGO_URI=your_mongodb_uri
    SECRET_KEY=your_secret_key
    ```

4. **Run the application:**

    ```sh
    npm run dev
    ```

    The application should now be running on `http://localhost:3000`.

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

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or suggestions, feel free to contact me at [your-email@example.com](mailto:your-email@example.com).

## Acknowledgments

- Thanks to all the contributors who helped make this project better.
- Special thanks to the open-source community for their support and contributions.

---

© 2021 OxiBo. All rights reserved.
