// src/tests/components-tests/Subscribe.test.js

import { screen, waitFor } from "@testing-library/react";

import { Subscribe } from "../../components/Subscribe";
import userEvent from "@testing-library/user-event";

import { renderWithProviders } from "../../utils/test-utils";
import { setupStore } from "../../redux/store";

const emailMock = "email@gmail.com";
const emailMockError = "forbidden@email.com";

describe("<Subscribe/> Input", () => {
  test("Input should be on screen", async () => {
    renderWithProviders(<Subscribe />);

    expect(screen.getByRole("subscribe")).toBeInTheDocument();
  });
  test("Mock Api Error Alert", async () => {
    renderWithProviders(<Subscribe />);
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
