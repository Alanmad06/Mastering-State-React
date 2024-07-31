// src/tests/components-tests/Subscribe.test.js
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { Subscribe } from "../../components/Subscribe";
import userEvent from "@testing-library/user-event";
import { expect, jest, test } from "@jest/globals";




const emailMock = "email@gmail.com";
const emailMockError = "forbidden@email.com";

describe("<Subscribe/>", () => {
  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <Subscribe />
      </Provider>
    );
  };

  test("One input should be on screen", () => {
    renderComponent();
    expect(screen.getByRole("subscribe")).toBeInTheDocument();
  });

  test("Mock Api Error Alert", async () => {
    renderComponent();
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

    const input = screen.getByRole("subscribe");
    const button = screen.getByText("SUBSCRIBE");

    userEvent.type(input, emailMockError);

    userEvent.click(button);

    await waitFor(() => {
    
      expect(alertMock).toHaveBeenCalledWith('{"error":"Email is already in use"}');
      
    });

    // Restaurar la implementación original de alert
    alertMock.mockRestore();
  });

  test('Email should be on the navbar',()=>{
    renderComponent()
    const input = screen.getByRole("subscribe");
    const button = screen.getByText("SUBSCRIBE");

    userEvent.type(input, emailMock);

    userEvent.click(button);

    expect(screen.getByText(emailMock).toBeInTheDocument())

  }
  )
});
