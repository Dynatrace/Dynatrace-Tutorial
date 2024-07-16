import { useEffect, useState } from "react";

// mock hook until official is ready
export const useAppFunction = <T = any>(
  name: string,
  payload?: any,
): { isLoading: boolean; data?: T; error?: Error } => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:3000/api/${name}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, []);

  return { isLoading, data, error };
};
