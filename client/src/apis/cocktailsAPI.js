import axios from "axios";

export default axios.create({
    baseURL: `https://www.thecocktaildb.com/api/json/v1/${process.env.REACT_APP_THECOCKTAILDB_API_KEY}`,
   
})