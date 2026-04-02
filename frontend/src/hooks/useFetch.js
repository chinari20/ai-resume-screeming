import { useEffect, useState } from "react";

export const useFetch = (fetcher, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetcher()
      .then((response) => {
        if (mounted) setData(response.data);
      })
      .catch((err) => {
        if (mounted) setError(err.response?.data?.message || err.message);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, deps);

  return { data, loading, error, setData };
};
