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
import { renderWithProviders } from "../../utils/test-utils";
import { setupStore } from "../../redux/store";

const emailMock = "email@gmail.com";

describe("<Subscribe/> Input", () => {
  test("Input should be on screen", async () => {
    renderWithProviders(<Subscribe />);

    expect(screen.getByRole("subscribe")).toBeInTheDocument();
  });
});

describe("<Subscribe/> Button", () => {
  test("Button should be on screen", () => {
    renderWithProviders(<Subscribe />);
    expect(screen.getByText("SUBSCRIBE")).toBeInTheDocument();
  });

  test("Function dispatch should dispatch when submit SUBSCRIBE button", async () => {
    const store = setupStore();
    const dispatch = jest.spyOn(store, "dispatch");

    renderWithProviders(<Subscribe />, { store });

    const input = screen.getByRole("subscribe");
    const button = screen.getByText("SUBSCRIBE");

    userEvent.type(input, emailMock);

    userEvent.click(button);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });

  test("Function dispatch should dispatch when submit UNSUBSCRIBE button ", async () => {
    const store = setupStore({
      subscribe: {
        subscribed: true,
        loading: false,
      },
    });
    const dispatch = jest.spyOn(store, "dispatch");

    renderWithProviders(<Subscribe />, { store });

    const button = screen.getByText("UNSUBSCRIBE");

    userEvent.click(button);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });

  test("Button should change to UNSUBSCRIBE label when submit", async () => {
    renderWithProviders(<Subscribe />);

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
