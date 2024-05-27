import { useRef, useState } from "react";
import "../styles/Subscribe.css";

export function Subscribe() {
  const emailRef = useRef();

  const [email, setEmail] = useState(null);
  const [isItSubscribed, setIsItSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const subscribeEmail = (event) => {
    event.preventDefault();


    if (!isItSubscribed && emailRef.current.value !== "") {
      setEmail(emailRef.current.value);
      setIsLoading(true);

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
          setIsLoading(false);

          emailRef.current.value = "";

          if (data.error) {
            alert(JSON.stringify(data));
            setEmail(null);
          } else {
            console.log(data);
            setIsItSubscribed(!isItSubscribed);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }  
  };

  const unsubscribeEmail = (event) =>{
    event.preventDefault()

    if (isItSubscribed) {
      setIsLoading(true);

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
          setIsLoading(false);
          setIsItSubscribed(!isItSubscribed);
          setEmail(null);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

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
