import { Card } from "./Card";
import "../styles/CardPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const CardPage = () => {
  const { id } = useParams();
  
  const [person, setPerson] = useState({});
  const navigate = useNavigate()
 

  useEffect( () => {
    const urlCommunity = `http://localhost:3000/community/${id}`;
    const requestInit = {
      method: "GET",
    };

    fetch(urlCommunity, requestInit)
        .then((response) => response.json())
        .then((data) => setPerson(data))
        .catch (e =>{console.error(e);}) 
    
} 
  , []);

  return (
    <article className="cardPage">
        
      <button className="back__button" onClick={() => navigate(-1)}>
                <strong>Go Back !</strong>
      </button>
      <Card
        id={person.id}
        name={`${person.firstName} ${person.lastName}`}
        position={person.position}
        image={person.avatar}
      />
    </article>
  );
};
