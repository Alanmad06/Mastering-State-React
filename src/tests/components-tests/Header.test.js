import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import { Header } from "../../components/Header";
import { BrowserRouter } from "react-router-dom";


describe("<Header />", () => {
  test("Header component should render", () => {
    renderWithProviders(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getByText("PROJECT")).toBeInTheDocument();
  });
});
