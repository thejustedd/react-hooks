import { useEffect, useState } from "react"

export default function (request) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    request()
      .then(response => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then(json => setData(json))
      .catch(error => setError(error))
      .finally(() => setLoading(false))
  }, []);

  return [data, loading, error];
}
