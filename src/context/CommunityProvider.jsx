import { createContext, useEffect, useState } from "react";

//Creat Contexto
export const communityContext = createContext();

//Crear el Provider para que nuestra app la pueada consumir

export function CommunityProvider({ children }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3002/community")
      .then((data) => data.json())
      .catch((error) => {
        console.error(error);
      })
      .then((data) => {
        setIsLoading(false);
        setData(data.result);
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
