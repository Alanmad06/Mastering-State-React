import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import { Footer } from "../../components/Footer";

describe("<Footer/>", () => {
  test("Footer component should render", () => {
    renderWithProviders(<Footer/>);

    expect(screen.getByText("hello@website.com")).toBeInTheDocument();
  });
});
