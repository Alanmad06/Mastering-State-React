import { useContext } from "react";
import "../styles/Community.css";
import { Card } from "./Card";
import { communityContext } from "../context/CommunityProvider";

export function Community() {
  const communityData = useContext(communityContext);

  let communityPeople = communityData.data;
  let loading = communityData.loading;


  return (
    <>
      <input id="hide" className="hide__input" type="checkbox"></input>
      <label htmlFor="hide" className="hide__label">
        Hide
      </label>

      <article className="community">
        <div className="community__title">
          <h2 className="community__title-h2">
            Big Community of People Like You
          </h2>
          <p className="community__title-p">
            We’re proud of our products, and we’re really excited when we get
            feedback from our users.
          </p>
        </div>

        <div className="community__people">
          {!loading ? (
            communityPeople.map((person) => {
              return(
                <Card
              key={person.uuid}
                name={person.name.first + person.name.last}
                position={person.job.title}
                image={person.image}
                description={person.emails[0]}
                
              />
              )
             
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </article>
    </>
  );
}
