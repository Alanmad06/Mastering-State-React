import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import { Main } from "../../components/Main";
import { CardPage } from "../../components/CardPage";
import { BrowserRouter } from "react-router-dom";

describe("<CardPage />", () => {
  test("CardPage component should render", () => {
    renderWithProviders(
      <BrowserRouter>
        <CardPage />
      </BrowserRouter>
    );

    expect(screen.getByText("Go Back !")).toBeInTheDocument();
  });
});
