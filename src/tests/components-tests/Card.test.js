import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import * as router from "react-router";
import { Card } from "../../components/Card";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const cardInfo = {
  id: "2f1b6bf3-f23c-47e4-88f2-e4ce89409376",
  firstName: "Marjy",
  lastName: "Smith",
  position: "Lead Designer at Company Name",
};

const name = `${cardInfo.firstName} ${cardInfo.lastName}`;

describe("<Card/>", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Card component should render", () => {
    renderWithProviders(
      <BrowserRouter>
        <Card
          id={cardInfo.id}
          name={name}
          position={cardInfo.position}
          description="description here!"
          image="image-url.jpg"
        />
      </BrowserRouter>
    );

    expect(
      screen.getByText("Lead Designer at Company Name")
    ).toBeInTheDocument();
  });

  test("Click on card should navigate to other page", () => {
  

    renderWithProviders(
      <BrowserRouter>
        <Card
          id={cardInfo.id}
          name={name}
          position={cardInfo.position}
          description="description here!"
          image="image-url.jpg"
        />
      </BrowserRouter>
    );
    const mockedUsedNavigate = jest.spyOn(router, "useNavigate");

    const nameText = screen.getByTestId("card");

    userEvent.click(nameText);

    expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
  });
});
