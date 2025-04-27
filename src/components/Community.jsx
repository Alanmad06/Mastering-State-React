import { useContext } from "react";
import "../styles/Community.css";
import { Card } from "./Card";
import { communityContext } from "../context/CommunityProvider";
import { useDispatch, useSelector } from "react-redux";
import { changeHide } from "../redux/slices/communitySlice";
import { useNavigate } from "react-router-dom";

export function Community() {
  const communityData = useContext(communityContext);
  const {hide} = useSelector(state => state.community)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  let communityPeople = communityData.data;
  let loading = communityData.loading;



  return (
    <>
      <input id="hide" className="hide__input" type="checkbox" onClick={() => dispatch(changeHide())}></input>
      <label htmlFor="hide" className="hide__label">
        Hide
      </label>
      
      <button className="back__button" onClick={() => navigate(-1)}>
                <strong>Go Back !</strong>
      </button>

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
              id={person.id}
                name={person.name}
                position={person.status}
                image={person.image}
                
                
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
