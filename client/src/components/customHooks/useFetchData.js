import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const useFetchData = (selectorData, selectorError) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = useSelector(selectorData);
  const fetchError = useSelector(selectorError);

  useEffect(() => {
    const setState = async () => {
      await setLoading(true);
      if (fetchData || fetchError) {
        await setLoading(false);
      }
      await setData(fetchData);
      await setError(fetchError);
    
    };
    setState();
  }, [fetchData, fetchError]);

  // console.log(loading)
  // console.log(error)
  // console.log(data)
  return { data, error, loading };
};

export default useFetchData;
