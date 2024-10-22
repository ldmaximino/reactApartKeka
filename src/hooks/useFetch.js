import { useEffect, useState } from "react";

export const useFetch = (url, objMethod) => {
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    errors: null,
  });

  const getFetch = async() => {
    try {
      const response = await fetch(url, objMethod);
      const data = await response.json();
      setState({ data, isLoading: false, errors: null });
    } catch (error) {
      setState({ data: null, isLoading: false, errors: error });
    }
  };
  
  useEffect(() => {
    if (!url) return;
    getFetch();
  }, [url]);

  const { data, isLoading, errors } = state; //des-estructuro las propiedades del objeto state para poder retornarlas como un objeto

  return {
    data,
    isLoading,
    errors,
  };
};
