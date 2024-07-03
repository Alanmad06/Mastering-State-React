import { useContext } from "react";
import "../styles/Community.css";
import { Card } from "./Card";
import { communityContext } from "../context/CommunityProvider";
import { useDispatch, useSelector } from "react-redux";
import { changeHide } from "../redux/slices/communitySlice";

export function Community() {
  const communityData = useContext(communityContext);
  const {hide} = useSelector(state => state.community)
  const dispatch = useDispatch()

  let communityPeople = communityData.data;
  let loading = communityData.loading;


  console.log(communityPeople)
  return (
    <>
      <input id="hide" className="hide__input" type="checkbox" onClick={() => dispatch(changeHide())}></input>
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

        {(!hide) ? <div className="community__people">
          {!loading ? (
            communityPeople.map((person) => {
              return(
                <Card
              key={person.id}
                name={`${person.firstName} ${person.lastName}`}
                position={person.position}
                image={person.avatar}
                
                
              />
              )
             
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
        : ''}
        
      </article>
    </>
  );
}
