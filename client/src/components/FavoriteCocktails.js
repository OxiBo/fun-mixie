import React, { useState, useEffect } from "react";

import { useDispatch } from "react-redux";

import Pagination from "./Pagination";
import Spinner from "./Spinner";
import useFetchData from "./customHooks/useFetchData";
import { fetchFavoriteCocktails } from "../actions";
import { perPageFaveCocktails } from "../utils/variables";
import {
  selectFaveCocktails,
  selectFaveCocktailsError,
} from "./selectors/cocktails";

const FavoriteCocktails = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  //   const [faveCocktails, setFaveCocktails] = useState([]);
  //   const [faveCocktailsError, setFaveCocktailsError] = useState(false);
  //   const [total, setTotal] = useState(null);

  const { data, error, loading } = useFetchData(
    selectFaveCocktails,
    selectFaveCocktailsError
  );

  useEffect(() => {
    dispatch(fetchFavoriteCocktails(page, perPageFaveCocktails));
  }, [dispatch, fetchFavoriteCocktails, page, perPageFaveCocktails]);

  const onPageChange = (currentPage) => {
    console.log(currentPage);
    setPage(currentPage);
    // console.log(page);
  };

  //   const total = Object.keys(data).length === 0 && data.total;
  // console.log(total)
  const renderFaveCocktails = () => {
    console.log(data.total);
    console.log(page);
    return (
      <div className="fave-cocktails-list">
        {data.paginated.length === 0 ? (
          <h2 className="fave-cocktails-list-empty heading-tertiary"></h2>
        ) : (
          <div className="fave-cocktails-list">
            {data.paginated.map((item) => item.name)}
          </div>
        )}
        {data.total > perPageFaveCocktails && (
          <Pagination
            perPage={perPageFaveCocktails}
            total={data.total}
            onPageChange={onPageChange}
          />
        )}
      </div>
    );
  };

  return (
    <main className="main">
      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="fave-cocktails__error error">
          {" "}
          <p classList="error-message">{error}</p>
        </div>
      ) : (
        Object.keys(data).length > 0 && renderFaveCocktails()
      )}
    </main>
  );
};

export default FavoriteCocktails;
