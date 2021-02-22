import React, { useState, useEffect } from "react";

import Spinner from "./Spinner";
import useFetchData from "./customHooks/useFetchData";
import {
  selectCocktailsList,
  selectCocktailsListError,
} from "./selectors/cocktails";
import CocktailItem from "./CocktailItem";
import Pagination from "./Pagination";
import ButtonClear from "./ButtonClear";
import { clearCocktailsList } from "../actions";
import { perPage } from "../utils/variables";

const CocktailsList = () => {
  const [page, setPage] = useState(1);
  // const [cocktailsList, setCocktailsList] = useState(null);

  const { data, error, loading } = useFetchData(
    selectCocktailsList,
    selectCocktailsListError
  );

  useEffect(() => {
    if (data) {
      setPage(1);
    }
  }, [data]);

  const indexOfLastCocktail = page * perPage;
  const indexOfFirstCocktail = indexOfLastCocktail - perPage;
  const currentCocktails =
    data && data.slice(indexOfFirstCocktail, indexOfLastCocktail);

  const onPageChange = (currentPage) => {
    setPage(currentPage);

    // await setCocktailsList(paginatedCocktails);
  };

  const renderCocktailsList = () => {
    const cocktails = currentCocktails.map((cocktail) => {
    
      return (
        <CocktailItem
          key={`${cocktail.apiId}-${cocktail.name}`}
          cocktail={cocktail}
        />
      );
    });
    return cocktails;
  };

  return (
    <>
      <ul className="cocktails__list">
        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="cocktails__list-error error">
            <p classList="error-message">{error}</p>
          </div>
        ) : data.length > 0 ? (
          <>
            {renderCocktailsList()}
            {data.length > perPage && (
              <div className="cocktails__list-pagination">
                <Pagination
                  perPage={perPage}
                  total={data.length}
                  onPageChange={onPageChange}
                />
              </div>
            )}

            <ButtonClear action={clearCocktailsList} />
          </>
        ) : (
          false
        )}
      </ul>
    </>
  );
};
{
  /* <div className="cocktails__list-empty no-content">
          <p className="no-content-message">no cocktails yet</p>
        </div> */
}
export default CocktailsList;
