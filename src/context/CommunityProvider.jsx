import { createContext, useEffect, useState } from "react";

//Creat Contexto
export const communityContext = createContext();

//Crear el Provider para que nuestra app la pueada consumir

export function CommunityProvider({ children }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character/?page=1")
      .then((data) => data.json())
      .then((data) => {
       console.log(data)
        setIsLoading(false);
        setData(data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <communityContext.Provider value={{ data, loading: isLoading }}>
      {children}
    </communityContext.Provider>
  );
}
