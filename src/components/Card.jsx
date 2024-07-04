import '../styles/Card.css'


export function Card({ name, position, description, image }) {

  

  return (
    <div className="card" >
      <img src={image} alt={name + " image "} className="card__image" />
      <div className="card__info">
        <p className="card__info-description"> {description}</p>
        <h4 className="card__info-name">{name}</h4>
        <p className="card__info-position">{position} </p>
      </div>
    </div>
  );
}
