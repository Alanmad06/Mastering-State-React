// src/tests/components-tests/Subscribe.test.js
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { Subscribe } from "../../components/Subscribe";
import userEvent from "@testing-library/user-event";
import { expect, jest, test } from "@jest/globals";
import { Header } from "../../components/Header";
import { BrowserRouter as Router } from "react-router-dom";
import { clearUser } from "../../redux/slices/userSlice";

const emailMock = "email@gmail.com";
const emailMockError = "forbidden@email.com";

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

  test("Input should be on screen", () => {
    renderComponentSubscribe();
    expect(screen.getByRole("subscribe")).toBeInTheDocument();
  });

  test("Mock Api Error Alert", async () => {
    renderComponentSubscribe();
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

    const input = screen.getByRole("subscribe");
    const button = screen.getByText("SUBSCRIBE");

    userEvent.type(input, emailMockError);

    userEvent.click(button);

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith(
        '{"error":"Email is already in use"}'
      );
    });

    alertMock.mockRestore();
  });

  test("Email shouldn't be on the navbar", async () => {
    renderComponentSubscribe();
    renderComponentHeader();
    const input = screen.getByRole("subscribe");
    const button = screen.getByText("SUBSCRIBE");

    userEvent.type(input, emailMockError);

    userEvent.click(button);

    await waitFor(() => {
      // Usar queryByText en lugar de getByText para verificar la ausencia del elemento
      expect(screen.queryByText(emailMockError)).not.toBeInTheDocument();
    });
  });

  test("Email should be on the navbar", async () => {
    renderComponentSubscribe();
    renderComponentHeader();
    const input = screen.getByRole("subscribe");
    const button = screen.getByText("SUBSCRIBE");

    userEvent.type(input, emailMock);

    userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(emailMock)).toBeInTheDocument();
    });
  });
});

describe("<Subscribe/> Button", () => {
  beforeEach(() => {
    store.dispatch({ type: "RESET_STORE" });
    store.dispatch(clearUser());
  });

  test("Button should be on screen", () => {
    renderComponentSubscribe();
    expect(screen.getByText("SUBSCRIBE")).toBeInTheDocument();
  });

  test("Button should be disabled when submit", async () => {
    renderComponentSubscribe();

    const input = screen.getByRole("subscribe");
    const button = screen.getByText("SUBSCRIBE");

    userEvent.type(input, emailMock);
    userEvent.click(button);

    await waitFor(() => {
      expect(button).toBeDisabled();
    });
  });
  test("Button opacity should have class loading when loading", async () => {
    renderComponentSubscribe();

    const input = screen.getByRole("subscribe");
    const button = screen.getByText("SUBSCRIBE");

    userEvent.type(input, emailMock);
    userEvent.click(button);

    await waitFor(() => {
      expect(button).toHaveClass("loading");
    });
  });

  test("Button should change to UNSUBSCRIBE label when submit", async () => {
    renderComponentSubscribe();

    const input = screen.getByRole("subscribe");
    const button = screen.getByText("SUBSCRIBE");

    userEvent.type(input, emailMock);
    userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("UNSUBSCRIBE")).toBeInTheDocument()
    });
  });
});
