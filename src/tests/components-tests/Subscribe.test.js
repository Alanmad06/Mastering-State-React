// src/tests/components-tests/Subscribe.test.js
import React, { act } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";

import { Subscribe } from "../../components/Subscribe";
import userEvent from "@testing-library/user-event";
import { expect, jest, test } from "@jest/globals";
import { Header } from "../../components/Header";
import { BrowserRouter as Router } from "react-router-dom";
import { clearUser } from "../../redux/slices/userSlice";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../../redux/slices/userSlice";
import subscribeReducer from "../../redux/slices/subscribeSlice";
import communityReducer from "../../redux/slices/communitySlice";
import {
  subscribeEmail,
  unsubscribeEmail,
} from "../../redux/slices/thunksSubscribeSlice";
import { addUser } from "../../redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks";
import * as redux from "react-redux";

const emailMock = "email@gmail.com";
const emailMockError = "forbidden@email.com";

const store = configureStore({
  reducer: {
    user: userReducer,
    subscribe: subscribeReducer,
    community: communityReducer,
  },
});

const renderComponentSubscribe = () => {
  return render(
    <Provider store={store}>
      <Subscribe />
    </Provider>
  );
};

const renderComponentHeader = () => {
  return render(
    <Provider store={store}>
      <Router>
        <Header />
      </Router>
    </Provider>
  );
};



describe("<Subscribe/> Input", () => {
 

  beforeEach(() => {
    
        store.dispatch({ type: "RESET_STORE" });
    store.dispatch(clearUser());
  });

  afterEach(() => {
    
    jest.clearAllMocks();
  });

  test("Input should be on screen", async () => {
    renderComponentSubscribe();
    // Esto te mostrará el contenido del DOM en la consola
    expect(screen.getByRole("subscribe")).toBeInTheDocument();
  });

  /*   test("Mock Api Error Alert", async () => {
    renderComponentSubscribe();

    /* const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {}); 

    const input = screen.getByRole("subscribe");
    const button = screen.getByText("SUBSCRIBE");

    userEvent.type(input, emailMockError);

    userEvent.click(button);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        '{"error":"Email is already in use"}'
      );
    });

    /* alertMock.mockRestore(); 
  }); */

  /* test("Email shouldn't be on the navbar", async () => {
    renderComponentSubscribe();
    renderComponentHeader();
    const input = screen.getByRole("subscribe");
    const button = screen.getByText("SUBSCRIBE");

    userEvent.type(input, emailMockError);

    /*   act(()=>{userEvent.click(button);}) 
    userEvent.click(button);

    // Usar queryByText en lugar de getByText para verificar la ausencia del elemento

    expect(screen.queryByText(emailMockError)).not.toBeInTheDocument();
  });
 */

  test("Email should be on the navbar", async () => {
    renderComponentSubscribe();
    renderComponentHeader();

    const input = screen.getByRole("subscribe");
    const button = screen.getByText("SUBSCRIBE");

    userEvent.type(input, emailMock);

    userEvent.click(button);

    await waitFor(()=>{
      expect(screen.getByText(emailMock)).toBeInTheDocument()
    })

    
  });

  test('Function dispatch should dispatch when sugmit button', async ()=>{
    const dispatchAux = store.dispatch
    store.dispatch = jest.fn()


    renderComponentSubscribe();
    
    const input = screen.getByRole("subscribe");
    const button = screen.getByText("SUBSCRIBE");

    userEvent.type(input, emailMock);

    userEvent.click(button);

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledTimes(1);
    });
    store.dispatch = dispatchAux;
  })


  /*  const dispatch = jest.fn();
  const getState = jest.fn(() => ({}));

  const thunk = subscribeEmail(emailMock)
  const result = await thunk(dispatch, getState, undefined);

  expect(dispatch).toHaveBeenCalled()
/  expect(dispatch).toHaveBeenCalledWith(addUser(emailMock)); 
  expect(result.payload).toEqual({success : true}); */

  /*   test("Button should show UNSUBSCRIBE when subscribed", async () => {
    renderComponentSubscribe();

    act(() => {
      store.dispatch({
        type: "subscribe/subscribeEmail/fulfilled",
        payload: {},
      });
    }); // Simular suscripción exitosa

    const button = screen.getByText("UNSUBSCRIBE");
    expect(button).toBeInTheDocument();
  }); */

  /*  test.skip("Should dispatch unsubscribe action and clear input on UNSUBSCRIBE click", async () => {
    renderComponentSubscribe();

     // Mockear store.dispatch
   

    act(() => {
      store.dispatch({
        type: "subscribe/subscribeEmail/fulfilled",
        payload: {},
      });
    });

    const input = screen.getByRole("subscribe");
    const button = screen.getByText("UNSUBSCRIBE");

    userEvent.type(input, emailMock);
    userEvent.click(button);

    store.dispatch = jest.fn();

    /* expect(store.dispatch).toHaveBeenCalledWith(
    expect.objectContaining({ type: "subscribe/unsubscribeEmail/pending" })
    ); */
  /*  expect(emailInput.value).toBe(""); 
    
  }); */
});

describe("<Subscribe/> Button", () => {
  let dispatch;
  beforeEach(() => {});

  afterEach(() => {});

  test("Button should be on screen", () => {
    renderComponentSubscribe();
    expect(screen.getByText("SUBSCRIBE")).toBeInTheDocument();
  });

  /*  test("Button should be disabled when submit", async () => {
    renderComponentSubscribe();

    const input = screen.getByRole("subscribe");
    const button = screen.getByText("SUBSCRIBE");

    userEvent.type(input, emailMock);
    userEvent.click(button);

 
      expect(button).toBeDisabled();
    
  }); */
  /* test("Button opacity should have class loading when loading", async () => {
    renderComponentSubscribe();

    const input = screen.getByRole("subscribe");
    const button = screen.getByText("SUBSCRIBE");

    userEvent.type(input, emailMock);
    userEvent.click(button);

  
    expect(button).toHaveClass("loading");
    await waitFor(() => {
      screen.debug();
    });
   
  }); */

  test("Button should change to UNSUBSCRIBE label when submit", async () => {
    renderComponentSubscribe();

    const input = screen.getByRole("subscribe");
    const button = screen.getByText("SUBSCRIBE");

    userEvent.type(input, emailMock);
    userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("UNSUBSCRIBE")).toBeInTheDocument();
    });

    expect(input.value).toBe("");
  });
});
