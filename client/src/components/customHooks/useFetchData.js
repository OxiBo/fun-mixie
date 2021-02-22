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
      await setData(fetchData);
      await setError(fetchError);
      
      if (data || error) {
        await setLoading(false);
      }
    };
    setState();
  }, [fetchData, fetchError, data, error]);

  return { data, error, loading };
};

export default useFetchData;
