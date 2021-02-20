import React, { useState, useEffect } from "react";

import { useDispatch } from "react-redux";

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

const FavoriteCocktails = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchFavoriteCocktails(page, perPageFaveCocktails));
  }, [dispatch, page]);

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
            {data.paginated.map(({ _id, name, alcoholic, image, apiId }) => (
              <li className="fave-cocktails-list-item" key={_id}>
                <figure className="fave-cocktails-list-item-figure">
                  <img
                    className="fave-cocktails-list-item-image"
                    src={image}
                    alt="cocktail"
                  />
                </figure>
                <p className="fave-cocktails-list-item-alcoholic">
                  {alcoholic ? "Alcoholic" : "Non-Alcoholic"}
                </p>
                <p className="fave-cocktails-list-item-name">{name}</p>
                <div className="fave-cocktails-list-item-liked">
                  <Liked  id={_id} apiId={apiId} />
                </div>
              </li>
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
