import { screen } from "@testing-library/react";
import { NotFound } from "../../components/NotFound";
import { BrowserRouter, Router } from "react-router-dom";
import { renderWithProviders } from "../../utils/test-utils";

describe(" <NotFound/>", () => {
  test("NotFound component should render", () => {
    renderWithProviders(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );
    screen.debug();
    expect(screen.getByText("Page Not Found 404")).toBeInTheDocument();
  });
});
