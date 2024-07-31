// src/tests/components-tests/Subscribe.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { Subscribe } from "../../components/Subscribe";
import userEvent from '@testing-library/user-event'


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


    test("One input should be on screen",async () => {
      renderComponent()
      expect(screen.getByRole("subscribe")).toBeInTheDocument();
    });

    test("Mock Api Error", () => {
      renderComponent()
      const input = screen.getByRole("subscribe");
      const button = screen.getByText('SUBSCRIBE')
      userEvent.type(input,emailMockError)

      userEvent.click(button)

      const alert = await screen.getByRole('alert')

      expect(alert)

     


    });

});
