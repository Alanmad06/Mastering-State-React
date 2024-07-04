import { Card } from "./Card"
import '../styles/CardPage.csss'

export const CardPage = () =>{
    return (
        <article className="cardPage">
              <Card
              key={person.id}
                name={`${person.firstName} ${person.lastName}`}
                position={person.position}
                image={person.avatar}
                
                
              />


        </article>
    )
}