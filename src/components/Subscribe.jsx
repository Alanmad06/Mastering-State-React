import {  useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/Subscribe.css";

import { subscribeEmail as subscribeEmailRedux, unsubscribeEmail as  unsubscribeEmailRedux  } from "../redux/slices/subscribeSlice";

export function Subscribe() {

  const emailRef = useRef();
  const dispatch = useDispatch()
  const { loading , subscribed}  = useSelector(state => state.subscribe)

  
  const subscribeEmail = (event) => {
    event.preventDefault()
    console.log('ola');
    if (!subscribed && emailRef.current.value !== "") {
      
       dispatch(subscribeEmailRedux(emailRef.current.value))
       emailRef.current.value = ''
    }
  };

  const unsubscribeEmail = (event) => {
    event.preventDefault()
    if (subscribed) {
      dispatch(unsubscribeEmailRedux())
      emailRef.current.value = ''
    }
  };

  return (
    <article className="subscribe">
      <div className="subscribe__title">
        <h2 className="subscribe__title-h2"> Join Our Program </h2>
        <p className="subscribe__title-p">
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <form className="subscribe__form">
        <input
          ref={emailRef}
          className="subscribe__form-input"
          id="email"
          type="text"
          placeholder="Email"
        />
        {subscribed ? (
          <button
            disabled={loading}
            className={
              !loading
                ? "subscribe__form-button"
                : "subscribe__form-button loading"
            }
            onClick={unsubscribeEmail}
          >
            UNSUBSCRIBE
          </button>
        ) : (
          <button
            disabled={loading}
            className={
              !loading
                ? "subscribe__form-button "
                : "subscribe__form-button loading "
            }
            onClick={subscribeEmail}
          >
            SUBSCRIBE
          </button>
        )}
      </form>
    </article>
  );
}
