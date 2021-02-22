import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Pagination from "./Pagination";
import Spinner from "./Spinner";
import Liked from "./Liked";
import useFetchData from "./customHooks/useFetchData";

import { fetchFavoriteCocktails } from "../actions";
import { perPageFaveCocktails } from "../utils/variables";
import {
  selectFaveCocktails,
  selectFaveCocktailsError,
} from "./selectors/cocktails";
import FaveCocktailItem from "./FaveCocktailItem";

const FavoriteCocktails = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const history = useHistory();
  const user = useSelector(({ auth }) => auth.user);

  const [faveCocktails, setFaveCocktails] = useState([]);
  useEffect(() => {
    if (user) {
      setFaveCocktails(user.cocktails);
    }
  }, [user]);

  useEffect(() => {
    dispatch(fetchFavoriteCocktails(page, perPageFaveCocktails));
  }, [dispatch, page, faveCocktails.length]);

  const { data, error, loading } = useFetchData(
    selectFaveCocktails,
    selectFaveCocktailsError
  );

  const onPageChange = (currentPage) => {
    setPage(currentPage);
  };

  const renderFaveCocktails = () => {
    return (
      <>
        {data.total === 0 ? (
          <h2 className="fave-cocktails__empty heading-tertiary">
            You do not have favorite cocktails yet
          </h2>
        ) : (
          <ul className="fave-cocktails-list">
            {data.paginated.map(cocktail => (
              <FaveCocktailItem
                key={cocktail._id}
                cocktail={cocktail}
              />
            ))}
          </ul>
        )}
      </>
    );
  };

  return (
    <main className="main">
      <div className="fave-cocktails">
        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="fave-cocktails__error error">
            <p classList="error-message">{error}</p>
          </div>
        ) : (
          data && renderFaveCocktails(data)
        )}
        {data && data.total > perPageFaveCocktails && (
          <Pagination
            perPage={perPageFaveCocktails}
            total={data && data.total} //data.total
            onPageChange={onPageChange}
          />
        )}
      </div>
    </main>
  );
};

export default FavoriteCocktails;
