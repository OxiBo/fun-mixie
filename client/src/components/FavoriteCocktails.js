//TODO - fix - when the last cocktail in the list gets deleted, it shows empty last page with wrong page numbers

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Pagination from "./Pagination";
import ErrorMessage from "./ErrorMessage";
import Spinner from "./Spinner";
import useFetchData from "./customHooks/useFetchData";

import { fetchFavoriteCocktails } from "../actions";
import { perPageFaveCocktails } from "../utils/variables";
import {
  selectFaveCocktails,
  selectFaveCocktailsError,
} from "./selectors/cocktails";
import FaveCocktailItem from "./FaveCocktailItem";

import { selectUser } from "./selectors/auth";

const FavoriteCocktails = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const { user } = useSelector(selectUser);

  const [faveCocktailsTotal, setFaveCocktailsTotal] = useState([]);

  // watches the amount of user favorite cocktails. If a cocktail is removed, the page will be updated and the deleted item will be removed from the list
  useEffect(() => {
    if (user) {
      setFaveCocktailsTotal(user.cocktails.length);
    }
  }, [user]);

  useEffect(() => {
    dispatch(fetchFavoriteCocktails(page, perPageFaveCocktails));
  }, [dispatch, page, faveCocktailsTotal]);

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
            {data.paginated.map((cocktail) => (
              <FaveCocktailItem key={cocktail._id} cocktail={cocktail} />
            ))}
          </ul>
        )}
      </>
    );
  };

  return (
    <>
      <div className="fave-cocktails">
        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="fave-cocktails__error">
            <ErrorMessage error={error} />
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
    </>
  );
};

export default FavoriteCocktails;
