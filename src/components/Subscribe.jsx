import { useReducer, useRef, useState } from "react";
import "../styles/Subscribe.css";
import { initialState, subscribeReducer } from "../reducers/subscribe";

export function Subscribe() {
  const emailRef = useRef();

  const [state, dispatch] = useReducer(subscribeReducer, initialState);
  const { isItSubscribed, email, isLoading } = state;
  const addEmail = (email) => {
    dispatch({
      type: "ADD_EMAIL",
      payload: { email },
    });
  };

  const changeSubscription = (subscription) => {
    dispatch({
      type: "CHANGE_SUBSCRIPTION",
      payload: { isItSubscribed: subscription },
    });
  };

  const changeLoading = () => {
    dispatch({
      type: "CHANGE_LOADING",
    });
  };

  const clearEmail = () => {
    dispatch({
      type: "CLEAR_EMAIL",
    });
  };

  const subscribeEmail = (event) => {
    if (!isItSubscribed && emailRef.current.value !== "") {
      addEmail(emailRef.current.value);
      changeLoading();

      const body = {
        email: emailRef.current.value,
        id: emailRef.current.value,
      };

      const requestInit = {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(body),
      };

      fetch("http://localhost:3002/subscribe", requestInit)
        .then((data) => {
          return data.json();
        })
        .catch((error) => {
          console.error(error);
        })
        .then((data) => {
          changeLoading();

          emailRef.current.value = "";

          if (data.error) {
            alert(JSON.stringify(data));
            clearEmail();
          } else {
            changeSubscription(!isItSubscribed);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const unsubscribeEmail = (event) => {
    if (isItSubscribed) {
      changeLoading();

      const requestInit = {
        method: "DELETE",
      };

      fetch("http://localhost:3002/subscribe/" + email, requestInit)
        .then((data) => {
          console.log(data);
          return data.json();
        })
        .catch((error) => {
          console.error(error);
        })
        .then((data) => {
          changeLoading();
          changeSubscription(!isItSubscribed);
          clearEmail();
        })
        .catch((error) => {
          console.error(error);
        });
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
        {isItSubscribed ? (
          <button
            disabled={isLoading}
            className={
              !isLoading
                ? "subscribe__form-button"
                : "subscribe__form-button loading"
            }
            onClick={unsubscribeEmail}
          >
            UNSUBSCRIBE
          </button>
        ) : (
          <button
            disabled={isLoading}
            className={
              !isLoading
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
