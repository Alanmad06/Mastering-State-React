import '../styles/Card.css'
import { useNavigate } from 'react-router-dom';


export function Card({ id,name, position, description, image }) {

  const navigate = useNavigate()

  return (
    <div className="card" onClick={()=> navigate(`${id}`)}>
      <img src={image} alt={name + " image "} className="card__image" />
      <div className="card__info">
        <p className="card__info-description"> {description}</p>
        <h4 className="card__info-name">{name}</h4>
        <p className="card__info-position">{position} </p>
      </div>
    </div>
  );
}
